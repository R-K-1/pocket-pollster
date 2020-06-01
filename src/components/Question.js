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
        let text = value === QUESTION_OPTION_ONE ?
                                this.props.question.optionOne.text
                                :
                                this.props.question.optionTwo.text

        if (stats) {
            const totalVoters = this.props.question.optionOne.votes.length +
                                    this.props.question.optionTwo.votes.length
            let optionVoters;
            let percentageOfVoters;
            if (stats && value === QUESTION_OPTION_ONE) {
                optionVoters = this.props.question.optionOne.votes.length;
                percentageOfVoters = ((optionVoters / totalVoters) * 100)
            } else if (stats && value === QUESTION_OPTION_TWO) {
                optionVoters = this.props.question.optionTwo.votes.length;
                percentageOfVoters = ((optionVoters / totalVoters) * 100)
            }

            text += `|#:${optionVoters}|%:${percentageOfVoters}`

            if (checked) text += "|My Choice"
        }

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
                const isOptionOneChosen = this.props.question.optionOne.votes.includes(this.props.question.author)
                const isOptionTwoChosen = !isOptionOneChosen
                optionsContent = (  <div>
                                        {this.radioButtonMaker(QUESTION_OPTION_ONE, isOptionOneChosen, true, true)}
                                        <br></br>
                                        {this.radioButtonMaker(QUESTION_OPTION_TWO, isOptionTwoChosen, true, true)}
                                    </div>)
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

    return {
        question: question
            ? question
            : null
    }
}

export default connect(mapStateToProps)(Question)