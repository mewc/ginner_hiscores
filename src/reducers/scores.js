import * as scoreActions from '../actions/scores';

//0 is hard, 1 is easy
let defaultState = {
    scores: [
        [],
        []
    ],
    loading: false,
    message: false,
    activeScoreDifficulty: 1,
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
                scores: payload.scores,
                loading: false,
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