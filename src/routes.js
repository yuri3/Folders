import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import NotesContainer from './containers/NotesContainer';
import NoteDetailsContainer from './containers/NoteDetailsContainer';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/:folderId" component={NotesContainer}>
        <Route path="/:folderId/:noteId" component={NoteDetailsContainer}/>
      </Route>
    </Route>
  </Router>
);
