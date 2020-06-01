import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

export const QUESTION_ROLE_UNANSWERED = 'QUESTION_ROLE_UNANSWERED'
export const QUESTION_ROLE_ANSWERED = 'QUESTION_ROLE_ANSWERED'
export const QUESTION_ROLE_TO_ANSWER = 'QUESTION_ROLE_TO_ANSWER'
export const QUESTION_OPTION_ONE = 'optionOne'
export const QUESTION_OPTION_TWO = 'optionTwo'

class Question extends Component {
    handleLike = (e) => {
        e.preventDefault()

        // todo: Handle Like Tweet
    }
    radioButtonMaker(value, checked, disabled, stats) {
        let text = value === 'optionOne' ?
                                this.props.question.optionOne.text
                                :
                                this.props.question.optionTwo.text
        return (
            <label>
                <input
                type="radio"
                checked={checked}
                disabled={disabled}
                />
                {text}
            </label>
        )

    }
    handleOptionsContent() {
        let optionsContent;
        switch (this.props.question.questionRole) {
            case QUESTION_ROLE_UNANSWERED:
                optionsContent = (  <div>
                                        {this.radioButtonMaker(QUESTION_OPTION_ONE, false, true, false)}
                                        {this.radioButtonMaker(QUESTION_OPTION_TWO, false, true, false)}
                                    </div>)
                break
            case QUESTION_ROLE_ANSWERED:
                optionsContent = ''
                break
            case QUESTION_ROLE_TO_ANSWER:
                optionsContent = ''
                break
            default:
                break

        }
        return optionsContent
    }
    handleGoToQuestion() {

    }
    handleSubmitAnswer() {

    }
    formButtonMaker(text, handler) {
        return (<button onClick={handler}>
                    {text}
                </button>)
    }
    handleButtonContent() {
        let buttonContent;
        switch (this.props.question.questionRole) {
            case QUESTION_ROLE_UNANSWERED:
                buttonContent = this.formButtonMaker("Go to question", this.handleGoToQuestion)
                break
            case QUESTION_ROLE_ANSWERED:
                buttonContent = ''
                break
            case QUESTION_ROLE_TO_ANSWER:
                buttonContent = ''
                break
            default:
                break

        }
        return buttonContent
    }
    render() {
        const  question  = this.props.question;

        return (
            <div className='question'>
                <img
                    src={question.authorAvatarURL}
                    alt={`Avatar of ${question.authorName}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>Would you rather?</span>
                        <div>{this.handleOptionsContent()}</div>
                    </div>
                    <div className='question-icons'>
                        {this.handleButtonContent()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id, questionRole }) {
    const question = { 
        ...questions[id],
        authorAvatarURL : users[questions[id].author].avatarURL,
        authorName: users[questions[id].author].name,
        questionRole : questionRole,
    }

    /*return {
        authedUser,
        questions: question
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }*/
    return {
        question: question
            ? question
            : null
    }
}

export default connect(mapStateToProps)(Question)