import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
//import createHistory from 'history/createBrowserHistory';
//import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();

//const history = createHistory();
//const middleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware//,
    //middleware
  )
);

export default store;
