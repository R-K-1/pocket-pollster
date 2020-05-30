
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleauthedUser } from '../actions/shared'

class AuthedUser extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handleauthedUser(document.getElementById("authed-user-options").value));
    }
    render() {
        return (
            <div>
            <h3 className='center'>Login</h3>
            <form className='new-question' onSubmit={this.handleSubmit}>
                <select id='authed-user-options'>
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