import * as appActions from '../actions/app';
import * as scoreActions from '../actions/scores';

let defaultState = {
    name: "GinnersGame HISCORES",
    loading: false,
    error: false,
    notification: false,
    activeTabIndex: 0
}


export default function app(state = defaultState, action) {
    const { payload, type } = action;
    switch (type) {
        case appActions.BASENAV_CHANGE:

            return {
                ...state,
                activeTabIndex: payload.index
            }
        case scoreActions.GET_SCORES_START:

            return {
                ...state,
                loading: true
            }
        case scoreActions.GET_SCORES_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload.message
            }
        case scoreActions.GET_SCORES_FAIL:
            return {
                ...state,
                loading: false,
                message: payload.message
            }
        case scoreActions.GET_SCORES_NORESULT:
            return {
                ...state,
                loading: false,
                message: payload.message
            }
        default:
            return {
                ...state
            }
    }
}