import React from 'react'
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'redux/reducers';

export const createTestStore = () => createStore(combineReducers(reducers));

export const withProvider = (children) => {
  const store = createTestStore();
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
