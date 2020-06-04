import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { formatQuestion } from '../utils/_DATA.js'
import { handleAddQuestion } from '../actions/shared.js'

class NewQuestion extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const author = this.props.author.id;
        const optionOneText = document.getElementById('optionOne').value
        const optionTwoText = document.getElementById('optionTwo').value
        if (optionOneText !== "" && optionTwoText !== "" && author !== undefined) {
            const newQuestion = formatQuestion( {
                optionOneText,
                optionTwoText,
                author
            })
            this.props.dispatch(handleAddQuestion(this.props.questions, newQuestion))
        } else {
            alert('Please enter valid options')
        }

    }
    render() {
        const author = this.props.author
        const render404 = (author === undefined)
        
        if (render404) return <div>Unable to create question because of missing information</div>

        return (
            <div className='question'>
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    className='avatar'
                />
                <form className='question-info' onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <span>Would you rather?</span>
                        <div>
                            <label>
                                <input
                                type="text"
                                id='optionOne'
                                placeholder='please type option one'
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                type="text"
                                id='optionTwo'
                                placeholder='please type option two'
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

function mapStateToProps({ authedUser, users, questions }) {
    return {
        author: users[authedUser],
        questions
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))