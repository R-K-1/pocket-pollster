import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question, { QUESTION_ROLE_ANSWERED, QUESTION_ROLE_UNANSWERED, QUESTION_ROLE_TO_ANSWER } from './Question'

class Questions extends Component {
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions  }) {

    return {
        questionIds: Object.keys(questions),
        answeredQuestionIds: Object.keys(questions)
            .filter((questionId) => questions[questionId].optionOne.votes.includes(authedUser)
                                        || questions[questionId].optionTwo.votes.includes(authedUser)),
        unansweredQuestionIds: Object.keys(questions)
        .filter((questionId) => !questions[questionId].optionOne.votes.includes(authedUser)
                                    && !questions[questionId].optionTwo.votes.includes(authedUser))
    }
}

export default connect(mapStateToProps)(Questions)