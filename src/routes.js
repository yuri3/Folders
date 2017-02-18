

import React from 'react';
import { Route /*, IndexRoute*/ } from 'react-router';
import App from './App';
import Notes from './components/Notes';

export default (
  <Route path="/" component={App}>
    <Route path="/:folderId" component={Notes}></Route>
  </Route>
);
