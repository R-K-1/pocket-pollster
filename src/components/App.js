import React, { Component, Fragment } from 'react'
import { Route} from 'react-router'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AuthedUser  from './AuthedUser'
import Questions  from './Questions'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import AuthedUserBar from './AuthedUserBar'
import Leaderboard from './Leaderboard'
import Question from './Question'
import NewQuestion from './NewQuestion'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    handleAppContent() {
        return this.props.authedUser === "" ?
            <AuthedUser />
            :
            (<div>
                <AuthedUserBar />
                <Nav />
                <Route exact path='/' component={Questions} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:question_id' component={Question} />
                <Route path='/add' component={NewQuestion} />
            </div>);

    }
    render() {            
        return (
            <Fragment>
                <LoadingBar />
                <div className='container'>
                    {this.props.loading === true ?
                        null
                        :
                        this.handleAppContent()
                    }
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser : authedUser
    }
}

export default connect(mapStateToProps)(App);
