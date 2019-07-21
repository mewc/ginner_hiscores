// API actions
import { fbdb } from '../fbclient';


export const GET_SCORES_START = 'GET_SCORES_START';
export const GET_SCORES_FAIL = 'GET_SCORES_FAIL';
export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS';
export const GET_SCORES_NORESULT = 'GET_SCORES_NORESULT';

export const refreshScores = () => {
    return dispatch => {
        dispatch(refreshScoresStart());
        let promises = [];
        promises.push(fbdb.ref('/leaderboard/easy').once('value'));
        promises.push(fbdb.ref('/leaderboard/hard').once('value'));


        Promise.all(promises)
            .then((res) => {
                let arr = []
                res.forEach((snapshot, index) => {
                    if (!snapshot.exists()) {
                        dispatch(refreshScoresNoResult(snapshot));
                    } else {
                        let a = [];
                        let values = snapshot.val();
                        Object.keys(snapshot.val()).forEach((k, i) => {
                            values[k].key = k
                            a.push(values[k])
                        })
                        a.sort((a, b) => {
                            if (a.score > b.score)
                                return -1;
                            if (a.score < b.score)
                                return 1;
                            return 0;
                        })
                        arr.push(a);
                    }
                });
                dispatch(refreshScoresSuccess({ easy: arr[0], hard: arr[1] }));
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
