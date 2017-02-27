import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import Notes from './components/Notes';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/:folderId" component={Notes}/>
    </Route>
  </Router>
);
