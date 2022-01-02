import React from 'react';
import './TakeQuiz.css';

import $ from 'jquery';
import ProgressBar from '../ProgressBar/ProgressBar';
import axios from 'axios';

export default class TakeQuiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: {},
            authorized: false,
            answers: [],
            activeQuestionIdx: 0,
            percentage: 0
        }
    }

    componentDidMount() {
        $('#modal-wrapper-quiz').hide();
        if (this.props.location.state != undefined) {
            this.setState({authorized: true});
            this.setState({quiz: this.props.location.state.quiz, answers: Array(this.props.location.state.quiz.questions.length).fill(0)});
        }
    }

    prevQuestion = () => {
        let newIdx = this.state.activeQuestionIdx;
        newIdx--;
        if (newIdx < 0) return;
        this.setState({activeQuestionIdx: newIdx});
    }

    nextQuestion = () => {
        let newIdx = this.state.activeQuestionIdx;
        newIdx++;
        if (newIdx === this.state.quiz.questions.length) return;
        this.setState({activeQuestionIdx: newIdx});
    }

    getPercentage = (ans) => {
        let total = 0;
        ans.forEach(answer => {
            if (answer !== 0) {
                total += (1 / this.state.answers.length);
            }
        });
        this.setState({percentage: total});
    }

    selectAnswer = (ans, idx) => {
        let questions = this.state.quiz;
        questions.questions[this.state.activeQuestionIdx].answers.forEach(ans => {
            ans.selected = false;
        });
        questions.questions[this.state.activeQuestionIdx].answers[idx].selected = true;
        let answers = this.state.answers;
        if (ans.name === this.state.quiz.questions[this.state.activeQuestionIdx].correctAnswer) {
            answers[this.state.activeQuestionIdx] = true;
        } else {
            answers[this.state.activeQuestionIdx] = false;
        }
        this.setState({quiz: questions, answers: answers});
        this.getPercentage(answers);
    }

    showModal = () => {
        $('#modal-wrapper-quiz').fadeIn(300);
    }

    hideModal = () => {
        $('#modal-wrapper-quiz').fadeOut(300);
    }

    finishQuiz = () => {
        axios.post("/api/quizzes/save-results", {
            currentUser: localStorage.getItem('_ID'),
            answers: this.state.answers,
            quizId: this.state.quiz._id
        }).then(res => {
            if (res.data) {
                console.log(res.data);
            }
        })
    }

    render() {
        let {quiz, activeQuestionIdx} = this.state;
        return (
              <>
                    <div id="modal-wrapper-quiz" className="modal-wrapper-quiz">
                        <div className="content">
                            <div className="header">Are you sure you wish to submit your answers</div>
                            <div className="buttons-wrapper">
                                <button onClick={this.hideModal}>Cancel</button>
                                <button onClick={this.finishQuiz}>Yes</button>
                            </div>
                        </div>
                    </div>
                    <div className="take-quiz-wrapper">
                        {this.state.authorized ?

                            <div className="content">
                                <div className="header">
                                    <div className="left">
                                        {this.state.quiz.quizName}
                                    </div>
                                    <ProgressBar
                                        className="center"
                                        progress={Number((this.state.percentage * 100).toFixed(0))}
                                        size={160}
                                        strokeWidth={15}
                                        circleOneStroke='#dadfea'
                                        circleTwoStroke={'#00aaf1'}
                                    />
                                </div>

                                <div className="body">
                                    <div className="left">
                                        <div className="question-name">{quiz.questions[activeQuestionIdx].questionName}</div>
                                        <div className="question-bubble-wrapper">
                                            {this.state.quiz.questions.map((ans, idx) => (
                                                <span onClick={() => this.setState({ activeQuestionIdx: idx })} key={idx} className={this.state.activeQuestionIdx === idx ? 'question-bubble selected-bubble' : this.state.answers[idx] === 0 ? "question-bubble" : 'question-bubble bubble-correct'}>
                                                    {idx + 1}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="answers-wrapper">
                                            {quiz.questions[activeQuestionIdx].answers.map((ans, idx) => (
                                                <div key={idx} onClick={() => this.selectAnswer(ans, idx)} className={ans.selected === true ? 'selected' : 'answer'}>
                                                    {ans.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <div className="buttons-wrapper">
                                        <button onClick={this.prevQuestion}>Previous</button>
                                        {this.state.activeQuestionIdx + 1 < this.state.quiz.questions.length ? <button onClick={this.nextQuestion}>Next</button> : <button onClick={this.showModal}>Submit Quiz</button>}
                                    </div>
                                </div>
                            </div>

                            : <div>Not authorized</div>}
                    </div>
                </>
        )
    }
}