import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
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
    handleSelectOption (e) {
        e.preventDefault();
        if (this.state) console.log(e.target);
    }
    radioButtonMaker(value, checked, disabled, stats, question) {
        let text = value === QUESTION_OPTION_ONE ?
                                question.optionOne.text
                                :
                                question.optionTwo.text

        if (stats) {
            const totalVoters = question.optionOne.votes.length +
                                    question.optionTwo.votes.length
            let optionVoters;
            let percentageOfVoters;
            if (stats && value === QUESTION_OPTION_ONE) {
                optionVoters = question.optionOne.votes.length;
                percentageOfVoters = ((optionVoters / totalVoters) * 100)
            } else if (stats && value === QUESTION_OPTION_TWO) {
                optionVoters = question.optionTwo.votes.length;
                percentageOfVoters = ((optionVoters / totalVoters) * 100)
            }

            text += `|#:${optionVoters}|%:${percentageOfVoters}`

            if (checked) text += "|My Choice"
        }

        return (
            <label>
                <input
                type="radio"
                name='question-options'
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={(e) => this.handleSelectOption(e, question)}
                />
                {text}
            </label>
        )

    }
    handleOptionsContent(question) {
        let optionsContent;
        switch (question.questionRole) {
            case QUESTION_ROLE_UNANSWERED:
                optionsContent = (  <div>
                                        {this.radioButtonMaker(QUESTION_OPTION_ONE, false, true, false, question)}
                                        <br />
                                        {this.radioButtonMaker(QUESTION_OPTION_TWO, false, true, false, question)}
                                    </div>)
                break
            case QUESTION_ROLE_ANSWERED:
                const isOptionOneChosen = question.optionOne.votes.includes(question.author)
                const isOptionTwoChosen = !isOptionOneChosen
                optionsContent = (  <div>
                                        {this.radioButtonMaker(QUESTION_OPTION_ONE, isOptionOneChosen, true, true, question)}
                                        <br />
                                        {this.radioButtonMaker(QUESTION_OPTION_TWO, isOptionTwoChosen, true, true, question)}
                                    </div>)
                break
            case QUESTION_ROLE_TO_ANSWER:
                optionsContent =  (  <div>
                                        {this.radioButtonMaker(QUESTION_OPTION_ONE, false, false, false, question)}
                                        <br />
                                        {this.radioButtonMaker(QUESTION_OPTION_TWO, false, false, false, question)}
                                    </div>)
                break
            default:
                break

        }
        return optionsContent
    }
    handleGoToQuestion(e, props) {
        e.preventDefault();
        props.history.push(`questions/${props.question.id}`)
    }
    handleSubmitAnswer() {

    }
    formButtonMaker(text, handler) {
        return (<button onClick={(e) => handler(e, this.props)}>
                    {text}
                </button>)
    }
    handleButtonContent(question) {
        let buttonContent;
        switch (question.questionRole) {
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
        let render404 = true;
        let question;
        if (this.props.isQuestionDefined) {
            render404 = false;
            question = this.props.question
        } else  if (Object.keys(this.props.questions).length > 0) {
            const pathName = this.props.location.pathname
            const questionId = pathName.substring(pathName.lastIndexOf('/') + 1)
            if (this.props.questions[questionId]) {
                render404 = false
                question =  { 
                        ...this.props.questions[questionId],
                        authorAvatarURL : this.props.users[this.props.questions[questionId].author].avatarURL,
                        authorName: this.props.users[this.props.questions[questionId].author].name,
                        questionRole : QUESTION_ROLE_TO_ANSWER,
                    }
            }
        }
        
        if (render404) return <div>404 Question not found</div>

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
                        <div>{this.handleOptionsContent(question)}</div>
                    </div>
                    <div className='question-icons'>
                        {this.handleButtonContent(question)}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id, questionRole }) {
    let addToProps;
    if (id) {
        const question = { 
            ...questions[id],
            authorAvatarURL : users[questions[id].author].avatarURL,
            authorName: users[questions[id].author].name,
            questionRole : questionRole,
        }

        addToProps = {question: question? 
                                question 
                                : 
                                null,
                        isQuestionDefined: true}
    } else {
        addToProps = {isQuestionDefined: false,
                        users,
                        questions}
    }
    return addToProps;
}

export default withRouter(connect(mapStateToProps)(Question))