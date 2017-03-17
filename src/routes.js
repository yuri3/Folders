import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App';
//import NotesContainer from './containers/NotesContainer';
//import NoteDetailsContainer from './containers/NoteDetailsContainer';

export default (
  <Router>
    <div>
      <Route path="/" component={App}/>
    </div>
  </Router>
);

/**
 * <Route path="/:folderId" component={NotesContainer}>
 *   <Route path="/:folderId/:noteId" component={NoteDetailsContainer}/>
 * </Route>
 */
