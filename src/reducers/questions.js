import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION :
            action.questions[action.newQuestion.id] = action.newQuestion
            console.log('working on my case')
            return {
                ...state,
                ...action.questions
            }
        default :
            return state
  }
}