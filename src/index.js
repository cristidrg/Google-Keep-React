import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import rootReducer from './reducers/index';
import setupKeyboardFocus from './setupKeyboardFocus.js';

const MOUNT_NODE = document.getElementById('app');
const BODY_NODE = document.querySelector('body');

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

setupKeyboardFocus(document, BODY_NODE);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);
