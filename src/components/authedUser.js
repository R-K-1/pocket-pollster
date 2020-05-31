import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/shared'

const authedUserSelectId = "authed-user-options"

class AuthedUser extends Component {
    state = {
        authedUser : ''
    }
    componentDidMount () {
        this.setState({
            authedUser: document.getElementById(authedUserSelectId).value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const authedUser = this.state.authedUser !== '' ? this.state.authedUser : document.getElementById(authedUserSelectId).value;
        this.props.dispatch(handleSetAuthedUser(authedUser));
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            authedUser : e.target.value
        })
    }
    render() {
        return (
            <div>
            <h3 className='center'>Login</h3>
            <form className='new-question' onSubmit={this.handleSubmit}>
                <select id={authedUserSelectId}
                    onChange={this.handleChange}>
                    {this.props.users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button
                    className='btn'
                    type='submit'>
                        Submit
                </button>
            </form>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users : Object.values(users)
    }
}

export default connect(mapStateToProps)(AuthedUser)