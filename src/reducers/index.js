import { combineReducers } from 'redux';
import scores from '../reducers/scores';
import app from '../reducers/app';

export const combined = combineReducers({
    scores,
    app
})

