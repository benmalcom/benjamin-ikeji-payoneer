import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
import middleswares from './middleswares';

import { loadState, saveState } from '../utils';
import { metricValues } from '../utils/forecast';

const isDevelopment = process.env.NODE_ENV === 'development';
const allMiddlesWares = [...middleswares];
if (isDevelopment) {
  allMiddlesWares.push(createLogger());
}

const store = configureStore({
  preloadedState: loadState(),
  reducer,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(allMiddlesWares),
});

store.subscribe(() => {
  const { forecasts } = store.getState();
  const state = {
    forecasts: {
      currentDate: forecasts.currentDate,
      currentMetric: forecasts.currentMetric || metricValues.CELCIUS,
    },
  };
  saveState(state);
});

export default store;
