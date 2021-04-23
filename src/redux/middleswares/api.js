import { isEmpty } from 'lodash';
import { createRequest } from '../../services/_request';
import {
  API_REQUEST,
  updateLoadingState,
  updateErrorState
} from '../actions';

const apiRequest = ({ dispatch }) => next => action => {
  if (action.type === API_REQUEST.START) {
    const {
      method = 'GET',
      url,
      key,
      payload,
      onError,
      params,
      onSuccess,
    } = action.meta;
    dispatch(updateLoadingState(key, true));
    const config = { method, url };
    if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
      config.data = payload;
    }
    if (params && !isEmpty(params)) {
      config.params = params;
    }
    createRequest(config)
      .then(data => {
        if (onSuccess) {
          if (typeof onSuccess === 'function') {
            onSuccess(data);
          } else {
            dispatch({ type: onSuccess, payload: data });
          }
        }
      })
      .catch(e => {
        if (onError) {
          if (typeof onError !== 'function') {
            throw new Error('onError parameter should be a function');
          }
          onError(e.message);
        } else {
          dispatch(updateErrorState(key, e.message))
        }
      }).finally(() => dispatch(updateLoadingState(key, false)));
  }
  return next(action);
};

export default [apiRequest];
