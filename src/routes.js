import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import App from './App';
import ModalConfirmation from './ModalConfirmation';
const getModalConfirmation = ModalConfirmation('modal-holder');

export const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

export default(
  <Router getUserConfirmation={getModalConfirmation}>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/notes"/>}/>
      <Route path="/notes" component={App}/>
      <Route component={NoMatch}/>
    </Switch>
  </Router>
);

/*
For Router_3 with custom modal.
import { Route, Router } from 'react-router';
import App from './App';
import NotesContainer from './containers/NotesContainer';
import NoteDetailsContainer from './containers/NoteDetailsContainer';

import ModalConfirmation from './ModalConfirmation';
import createHistory from './createConfirmationHistory';

const getModalConfirmation = ModalConfirmation('modal-holder');
const history = createHistory(getModalConfirmation);

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/:folderId" component={NotesContainer}>
        <Route path="/:folderId/:noteId" component={NoteDetailsContainer}/>
      </Route>
    </Route>
  </Router>
);
*/
