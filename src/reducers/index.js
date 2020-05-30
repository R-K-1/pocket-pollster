import { combineReducers } from 'redux'
import users from './users'
import setAuthedUser from './authedUser'

export default combineReducers({
    users,
    setAuthedUser,
})