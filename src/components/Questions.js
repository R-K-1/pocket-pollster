import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question, { QUESTION_ROLE_ANSWERED, QUESTION_ROLE_UNANSWERED } from './Question'

class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOnlyAnswered: false
        }
        this.toggleShowedList = this.toggleShowedList.bind(this)
    }
    toggleShowedList () {
        this.setState({
            showOnlyAnswered: !this.state.showOnlyAnswered
        })
    }
    handleShowQuestionsList() {
        return this.state.showOnlyAnswered ?
                                <Fragment>
                                    <h3 className='center'>Answered Questions</h3>
                                    <ul className='dashboard-list'>
                                        {this.props.answeredQuestionIds.map((id) => (
                                            <li key={id}>
                                                <Question
                                                    id={id}
                                                    questionRole={QUESTION_ROLE_ANSWERED} />
                                            </li>
                                        ))}
                                    </ul>
                                </Fragment>
                                :
                                <Fragment>
                                    <h3 className='center'>Unanswered Questions</h3>
                                    <ul className='dashboard-list'>
                                        {this.props.unansweredQuestionIds.map((id) => (
                                            <li key={id}>
                                                <Question
                                                    id={id}
                                                    questionRole={QUESTION_ROLE_UNANSWERED} />
                                            </li>
                                        ))}
                                    </ul>
                                </Fragment>;

    }
    render() {
        return (
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={this.props.showOnlyAnswered}
                    onChange={this.toggleShowedList}
                    />
                    Show answered questions only
                </label>
                {this.handleShowQuestionsList()}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions  }) {

    return {
        questionIds: Object.keys(questions),
        answeredQuestionIds: Object.keys(questions)
            .filter((questionId) => questions[questionId].optionOne.votes.includes(authedUser)
                                        || questions[questionId].optionTwo.votes.includes(authedUser))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIds: Object.keys(questions)
        .filter((questionId) => !questions[questionId].optionOne.votes.includes(authedUser)
                                    && !questions[questionId].optionTwo.votes.includes(authedUser))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    }
}

export default connect(mapStateToProps)(Questions)