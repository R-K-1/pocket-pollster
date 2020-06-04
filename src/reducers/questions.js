import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION :
            action.questions[action.newQuestion.id] = action.newQuestion
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION :
                action.questions[action.question.id] = action.question
                return {
                    ...state,
                    ...action.questions
                }
        default :
            return state
  }
}