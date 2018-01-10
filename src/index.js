import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App.jsx';
import rootReducer from './reducers/index';
import setupKeyboardFocus from './setupKeyboardFocus.js';
import { middleware, enhancer } from './routes';

const MOUNT_NODE = document.getElementById('app');
const BODY_NODE = document.querySelector('body');

const store = createStore(
  rootReducer,
  composeWithDevTools(enhancer,  applyMiddleware(middleware, thunkMiddleware)),
);

setupKeyboardFocus(document, BODY_NODE);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);