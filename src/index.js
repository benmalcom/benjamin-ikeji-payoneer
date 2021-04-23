import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import './index.scss';


import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faChevronRight,
  faCircleNotch,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChevronRight,
  faCheck,
  faCircleNotch,
  faChevronLeft
);
dom.watch();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
