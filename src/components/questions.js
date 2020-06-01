import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question, { QUESTION_ROLE_ANSWERED, QUESTION_ROLE_UNANSWERED, QUESTION_ROLE_TO_ANSWER} from './Question'

class Questions extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>All Questions</h3>
        <ul className='dashboard-list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question 
                id={id}
                questionRole={QUESTION_ROLE_UNANSWERED}/>
              {/*id*/}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  /*return {
    tweetIds: Object.keys(tweets)
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
  }*/
  return {
    questionIds: Object.keys(questions)
  }
}

export default connect(mapStateToProps)(Questions)