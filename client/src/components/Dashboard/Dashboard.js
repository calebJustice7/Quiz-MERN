import React from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="main">
                    <div className="top">
                        <div className="left">
                            <div className="header">Statistics</div>
                        </div>
                        <div className="right">
                            <div className="header">My Quizzes</div>
                        </div>
                    </div>

                    <div className="bottom">
                        
                    </div>
                </div>
            </div>
        )
    }
}