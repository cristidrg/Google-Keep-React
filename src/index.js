import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import App from './App.jsx';

const MOUNT_NODE = document.getElementById('app');
const store = createStore(reducers, {
  notes: {
    note1: {
      title: 'My note',
      note: "What's up",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);
