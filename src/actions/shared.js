import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions, addQuestion } from './questions'
import { setAuthedUser, clearAuthedUser } from './authedUser'
import { showLoading, hideLoading} from 'react-redux-loading'


export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(setAuthedUser(''))
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleSetAuthedUser (authedUser) {
    return (dispatch) => {
        dispatch(setAuthedUser(authedUser))
    }
}

export function handleClearAuthedUser () {
    return (dispatch) => {
        dispatch(clearAuthedUser())
    }
}

export function handleAddQuestion (questions, newQuestion) {
    return (dispatch) => {
        dispatch(addQuestion(questions, newQuestion))
    }
}