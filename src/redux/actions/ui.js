export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';
export const UPDATE_ERROR_STATE = 'UPDATE_ERROR_STATE';
export const UPDATE_LOADING_STATE = 'UPDATE_LOADING_STATE';

export const updatePagination = (key, payload) => ({
  type: UPDATE_PAGINATION,
  key,
  payload
});

export const updateErrorState = (key, payload) => ({
  type: UPDATE_ERROR_STATE,
  key,
  payload
});

export const updateLoadingState = (key, payload) => ({
  type: UPDATE_LOADING_STATE,
  key,
  payload
});
