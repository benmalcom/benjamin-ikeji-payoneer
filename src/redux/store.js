import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'

import reducer from './reducers';
import middleswares from './middleswares';

const isDevelopment = process.env.NODE_ENV === 'development';
const allMiddlesWares = [...middleswares];
if (isDevelopment) {
  allMiddlesWares.push(createLogger());
}

export default configureStore({
  reducer,
  devTools: isDevelopment,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(allMiddlesWares),
});
