import rootReducer from './reducers/reducers';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware
  )
);

export default store;