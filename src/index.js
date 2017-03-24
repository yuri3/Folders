import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { ConnectedRouter } from 'react-router-redux';
//import createHistory from 'history/createBrowserHistory';
//import routes from './routes';
import store from './store';
import App from './App';

//const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
