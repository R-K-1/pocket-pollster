import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleClearAuthedUser } from '../actions/shared'

class AuthedUserBar extends Component {
    handleLogout = () => {
        this.props.dispatch(handleClearAuthedUser());
    }
    AuthedUserBarContent = () => {
        return this.props.user === undefined?
            ''
            :
            (<nav className='nav'>
                <ul>
                    <li>
                        <img
                            src={this.props.user.avatarURL}
                            alt={`Avatar of ${this.props.user.name}`}
                            className='avatar'
                        />
                    </li>
                    <li>
                        <button onClick={() => this.handleLogout()}>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>);
    }
    render () {
        return (
            <nav className='nav'>
                {this.AuthedUserBarContent()}
            </nav>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        user : users[authedUser]
    }
}

export default connect(mapStateToProps)(AuthedUserBar);