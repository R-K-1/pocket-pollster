import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { render } from '@testing-library/react';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <div>
                Hello world
            </div>
        );
    }
}

export default connect()(App);
