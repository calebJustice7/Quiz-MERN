import React from 'react';
import store from '../../store/index';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (store.getState().user) {
            return (
                <div className="sidebar-wrapper">
                    <div className="header">Quiz Itt</div>
    
                    <div className="user">
                        <div className="avatar" style={{backgroundImage: store.getState().user.avatar || `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`}}></div>
                        <div className="name">{store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                    </div>

                    <div className="links">
                        <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink>
                        <NavLink to="/account"><div className="link">Account</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My Quizzes</div></NavLink>
                        <NavLink to="/create-quiz"><div className="link">Create Quiz</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My quizzes</div></NavLink>
                        <NavLink to="/community-quizzes"><div className="link">Community quizzes</div></NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}