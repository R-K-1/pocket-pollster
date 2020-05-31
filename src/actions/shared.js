import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'


export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
        .then(({ users }) => {
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(''))
        })
    }
}

export function handleSetAuthedUser (authedUser) {
    return (dispatch) => {
        dispatch(setAuthedUser(authedUser))
    }
}