import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Sidebar from '../Sidebar/Sidebar';
import './ViewResults.css';

export default class ViewResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            quiz: null
        }
    }

    componentDidMount() {
        if (!localStorage.getItem("_ID")) {
            this.props.history.push('/');
            localStorage.clear();
        } else {
            let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
            if (!id) {
                this.props.history.push('/');
            } else {
                axios.get('/api/quizzes/results/' + id).then(res => {
                    this.setState({ result: res.data.score, quiz: res.data.quiz})
                })
            }
        }
    }

    getBorderLeft = idx => {
        if (this.state.result.answers[idx]) {
            return '5px solid green';
        } else {
            return '5px solid red';
        }
    }

    getScore = () => {
        let len = this.state.result.answers.length;
        let right = this.state.result.answers.filter(ans => ans === true);
        return (100 * (right.length / len)) + '%';
    }
    
    render() {
        return (
            <div className="view-results-wrapper">
                <div>
                    <Sidebar />
                </div>
                {(this.state.quiz && this.state.result) && 
                    <div className="body">
                        <div className="header">
                            Quiz Results 
                        </div>
                        <div className="quiz-data">
                            <div className="left">
                                <div className="header">{this.state.quiz.name}</div>
                                <div className="category">{this.state.quiz.category}</div>
                                <div className="comments">{this.state.quiz.comments.length} Comments</div>
                            </div>
                            <div className="right">
                                <div className="likes">{this.state.quiz.likes} Likes</div>
                                <div className="others">{this.state.quiz.scores.length} Other people have taken this quiz</div>
                            </div>
                        </div>

                        <div className="score">
                           Score: {this.getScore()}
                        </div>

                        <div className="answers"> 
                            {this.state.quiz.questions.map((q, idx) => (
                                <div key={idx} className="answer" style={{borderLeft: this.getBorderLeft(idx)}}>
                                    <div>{q.questionName}</div>
                                </div> 
                            ))}
                        </div>

                        <div className="img">
                            <img src={this.state.quiz.imgUrl ? this.state.quiz.imgUrl : 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}