import React, { Component } from 'react'
import { connect } from 'react-redux'

class AuthedUserBar extends Component {
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
                    <li><button>Log out</button></li>
                </ul>
            </nav>);
    }
    render () {
        // const user = this.props.user;
        console.log('bars', this.props);
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

                            /*src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                            className='avatar'*/