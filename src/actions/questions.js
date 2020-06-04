export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion (questions, newQuestion) {
    return {
        type: ADD_QUESTION,
        questions,
        newQuestion
    }
}

export function answerQuestion (questions, question) {
    return {
        type: ANSWER_QUESTION,
        questions,
        question
    }
}

