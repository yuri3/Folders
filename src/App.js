import React, {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Logo from './components/Logo';
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
  border: '1px solid red',
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '60px',
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router getUserConfirmation={getModalConfirmation}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/notes"/>}/>
            <Route path="/notes/search" render={() => (
              <div style={style}>
                <Logo/>
                <Route component={FoldersContainer}/>
                <Route component={FoundNotesContainer}/>
              </div>
            )}/>
            <Route path="/notes/:folderId/:noteId" render={({location}) => (
              <div style={style}>
                <Logo/>
                  <Route location={location} key={location.key} component={NotesContainer}/>
                  <Route location={location} key={location.key + '1'} component={NoteDetailsContainer}/>
              </div>
            )}/>
            <Route path="/notes" render={({location}) => (
              <div style={style}>
                <Logo/>
                <Route component={FoldersContainer}/>
                <div style={{display: 'flex', flex: 1, position: 'relative', border: '2px solid green'}}>
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={3000}
                  transitionLeaveTimeout={3000}
                >
                  <Route location={location} key={location.key} path="/notes/:folderId" component={NotesContainer}/>
                </ReactCSSTransitionGroup>
                </div>
              </div>
            )}/>
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
