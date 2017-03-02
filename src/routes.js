import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import Notes from './components/Notes';
import NoteDetails from './components/NoteDetails';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/:folderId" component={Notes}>
        <Route path="/:folderId/:noteId" component={NoteDetails}/>
      </Route>
    </Route>
  </Router>
);
