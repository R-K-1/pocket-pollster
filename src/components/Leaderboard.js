import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>Leaderboard</h3>
                <ul className='dashboard-list'>
                    {this.props.userIds.map((id) => (
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

function mapStateToProps ({ users }) {
    return {
        userIds: Object.keys(users)
            .sort((a,b) => 
                a.id < b.id ? -1 : 1
            )
    }
}

export default connect(mapStateToProps)(Leaderboard)