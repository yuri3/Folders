

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import foldersApp from './reducers/reducers';
import { Provider } from 'react-redux';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

const loggerMiddleware = createLogger();

const store = createStore(
  foldersApp,
  applyMiddleware(
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
