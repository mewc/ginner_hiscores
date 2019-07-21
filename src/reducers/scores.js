import * as scoreActions from '../actions/scores';

//0 is hard, 1 is easy
let defaultState = {
    easy: [],
    loading: false,
    message: false,
    activeScoreDifficulty: 'easy',
}

export default function score(state = defaultState, action) {
    const { payload, type } = action;
    switch (type) {
        case scoreActions.GET_SCORES_START:
            return {
                ...state,
                loading: true
            }
        case scoreActions.GET_SCORES_SUCCESS:
            return {
                ...state,
                loading: false,
                easy: payload.easy,
                hard: payload.hard
            }
        case scoreActions.GET_SCORES_FAIL:
            //keep old state
            return {
                ...state,
                loading: false,
            }
        case scoreActions.GET_SCORES_NORESULT:
            //keep old state
            return {
                ...state,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}