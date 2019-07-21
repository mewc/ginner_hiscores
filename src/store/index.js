import { createStore, applyMiddleware } from 'redux';
import { combined } from '../reducers';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [
    ReduxThunk,
];

const store = createStore(combined,
    composeWithDevTools(
        applyMiddleware(...middleware),
    ));

export default store;

