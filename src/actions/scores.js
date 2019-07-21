// API actions
import { fbdb } from '../fbclient';


export const GET_SCORES_START = 'GET_SCORES_START';
export const GET_SCORES_FAIL = 'GET_SCORES_FAIL';
export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS';
export const GET_SCORES_NORESULT = 'GET_SCORES_NORESULT';

export const refreshScores = () => {
    return dispatch => {
        dispatch(refreshScoresStart())
        return fbdb.ref('/leaderboard').once('value')
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    console.log({ 'snapshot': snapshot });
                    dispatch(refreshScoresNoResult(snapshot));
                } else {
                    dispatch(refreshScoresSuccess(snapshot.val()));
                }
            })
            .catch((err) => {
                dispatch(refreshScoresFail(err))
            });

    };
};





export const refreshScoresStart = () => ({
    type: GET_SCORES_START,
});

export const refreshScoresFail = err => ({
    type: GET_SCORES_FAIL,
    payload: err
});
export const refreshScoresSuccess = scoreData => ({
    type: GET_SCORES_SUCCESS,
    payload: scoreData
});
export const refreshScoresNoResult = res => ({
    type: GET_SCORES_NORESULT,
    payload: res
});
