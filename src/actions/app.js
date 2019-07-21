// API actions
export const SNACKBAR = 'SNACKBAR';
export const LOAD_APP_BEGIN = 'LOAD_APP_BEGIN';
export const LOAD_APP_SUCCESS = 'LOAD_APP_SUCCESS';

export const BASENAV_CHANGE = 'BASENAV_CHANGE';

export const basenavChange = index => ({
    type: BASENAV_CHANGE,
    payload: { index }
});



