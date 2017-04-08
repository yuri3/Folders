import React, {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import SideBar from './components/SideBar';
import FoldersContainer from './containers/FoldersContainer';
import NotesContainer from './containers/NotesContainer';
import NoteDetailsContainer from './containers/NoteDetailsContainer';
import FoundNotesContainer from './containers/FoundNotesContainer';

import ModalConfirmation from './ModalConfirmation';
const getModalConfirmation = ModalConfirmation('modal-holder');

export const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '60px',
};

const routeStyle = {
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router getUserConfirmation={getModalConfirmation}>
          <div style={style}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/notes"/>}/>
              <Route path="/notes/search" render={() => (
                <div style={routeStyle}>
                  <SideBar/>
                  <Route component={FoldersContainer}/>
                  <Route component={FoundNotesContainer}/>
                </div>
              )}/>
              <Route path="/notes/:folderId/:noteId" render={({location}) => (
                <div style={routeStyle}>
                  <SideBar/>
                  <Route component={NotesContainer}/>
                  <Route component={NoteDetailsContainer}/>
                </div>
              )}/>
              <Route path="/notes" render={({location}) => (
                <div style={routeStyle}>
                  <SideBar/>
                  <Route component={FoldersContainer}/>
                  <Route path="/notes/:folderId" component={NotesContainer}/>
                </div>
              )}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
