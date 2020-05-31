import React, { Component, Fragment } from 'react'
import { Link, Route} from 'react-router'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AuthedUser  from './AuthedUser'
import Questions  from './Questions'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Leaderboard from './Leaderboard'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        let home;
        let nav = '';
        if (this.props.authedUser === "") {
            home = <AuthedUser />;
        } else {
            home = <Questions />;
            nav = <Nav />;
        }
        // const home =  ? <AuthedUser /> : <Questions />;
             
        return (
            <Fragment>
                <LoadingBar />
                <div className='container'>
                    {this.props.loading === true ?
                        null
                        :
                        <div>
                            {nav}
                            <Route exact path='/'>
                                {home}
                            </Route>
                            <Route path='/leaderboard'>
                                <Leaderboard />
                            </Route>
                        </div>
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
