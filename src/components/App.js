import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AuthedUser  from './authedUser';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <div>
                <AuthedUser />
            </div>
        );
    }
}

export default connect()(App);
