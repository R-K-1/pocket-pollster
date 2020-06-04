import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { formatTweet, formatDate } from '../utils/helpers'

class NewQuestion extends Component {
    handleSubmit() {

    }

    render() {
        const user = this.props.user
        const render404 = (user !== undefined && user.avatarURL !== undefined && user.name !== undefined)
        
        if (render404) return <div>Unable to create question because of missing information</div>

        return (
            <div className='question'>
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                />
                <form className='question-info' onSubmit={this.handleSubmit}>
                    <div>
                        <span>Would you rather?</span>
                        <div>
                            <label>
                                <input
                                type="text"
                                id='optionOne'
                                />
                            </label>
                            <label>
                                <input
                                type="text"
                                id='optionTwo'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='question-icons'>
                        <button>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {author: users[authedUser]}
}

export default withRouter(connect(mapStateToProps)(NewQuestion))