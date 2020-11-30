import { createStore } from 'redux'

const STATE =  {
    'correct_answer': '',
    'score': 0,
    'time': Date.now() + 150000
}

function courses(state=STATE, action) {
    switch (action.type) {
        case 'SET_ANSWER':
            return {...state, correct_answer: action.correct_answer}
        case 'INCREASE_SCORE':
            return {...state, score: state.score + 1}
        case 'START_GAME':
            return {
                'correct_answer': '',
                'score': 0,
                'time': Date.now() + 150000
            }
        default:
            return state
    }
}

const store = createStore(courses)

export default store