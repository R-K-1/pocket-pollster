import React, { Component } from 'react'
import { connect } from 'react-redux'

class Questions extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>All Questions</h3>
        <ul className='dashboard-list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              {/*<Tweet id={id}/>*/}
              {id}
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