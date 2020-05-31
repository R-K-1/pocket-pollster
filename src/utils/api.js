import {
    _getUsers,
    _getQuestions
} from './_DATA.js'
  
export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then((results) => ({
        'users': results[0],
        'questions': results[1]
    }))
}