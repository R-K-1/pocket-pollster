import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>Leaderboard</h3>
                <ul className='dashboard-list'>
                    {this.props.users.map((user) => (
                        <li key={user.id}>
                            <div className='question'>
                                <img
                                src={user.avatarURL}
                                alt={`Avatar of ${user.name}`}
                                className='avatar'
                                />
                                <div className='question-info'>
                                    <span>{user.name}</span>
                                    <p>{`Number of questions asked: ${user.statistics.asked} |
                                            Number of questions answered: ${user.statistics.answered}`}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions }) {
    Object.keys(users).forEach((userId) => {
        let stats = { asked: 0,
                        answered: 0}
        Object.values(questions).forEach((question) => {
            if (question.optionOne.votes.includes(userId)) stats.answered += 1;
            if (question.optionTwo.votes.includes(userId)) stats.answered += 1;
            if (question.author === userId) stats.asked += 1;
        })
        users[userId].statistics = stats

    })

    return {
        users: Object.values(users)
            .sort((a,b) => 
                (b.statistics.asked + b.statistics.answered) -  (a.statistics.asked + a.statistics.answered)
            )
    }
}

export default connect(mapStateToProps)(Leaderboard)