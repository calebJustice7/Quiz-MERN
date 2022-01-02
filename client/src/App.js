import axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import MyQuizzes from './components/MyQuizzes/MyQuizzes';
import CommunityQuizzes from './components/CommunityQuizzes/CommunityQuizzes';
import ViewQuiz from './components/ViewQuiz/ViewQuiz';
import TakeQuiz from './components/TakeQuiz/TakeQuiz';

import store from './store';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er);
      })
    }
  }

  render() {
    return (
      <div className="app">

        <Router>
          <Switch>
            <Route exact path="/" component={Auth}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-quiz" component={CreateQuiz} />
            <Route path="/my-quizzes" component={MyQuizzes} />
            <Route path="/community-quizzes" component={CommunityQuizzes} />
            <Route path="/view-quiz" component={ViewQuiz} />
            <Route path="/take-quiz" component={TakeQuiz} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
