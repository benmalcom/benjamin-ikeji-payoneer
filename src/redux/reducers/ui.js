import {
  UPDATE_ERROR_STATE,
  UPDATE_LOADING_STATE,
  UPDATE_PAGINATION,
} from '../actions';

const initialState = {
  pagination: {
    default: {
      cnt: 40
    },
  },
  loading: {},
  errors: {},
};

const uiReducer = (state = initialState, action) => {
  const { payload, key } = action;
  switch (action.type) {
    case UPDATE_LOADING_STATE: {
      return Object.assign({}, state, {
        loading: {
          ...state.loading,
          [key]: payload,
        },
      });
    }

    case UPDATE_PAGINATION: {
      const { pagination } = state;
      const current = pagination[key] || pagination.default;
      return Object.assign({}, state, {
        pagination: {
          ...state.pagination,
          [key]: {
            ...current,
            ...payload,
          },
        },
      });
    }
    case UPDATE_ERROR_STATE: {
      return Object.assign({}, state, {
        errors: {
          ...state.errors,
          [key]: payload,
        },
      });
    }
    default:
      return state;
  }
};

export default uiReducer;


