import React, {Component} from 'react';
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

import ModalConfirmation from './ModalConfirmation';
const getModalConfirmation = ModalConfirmation('modal-holder');

export const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const style = {
  border: '1px solid black',
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
            <Route path="/notes/:folderId/:noteId" render={() => (
              <div style={style}>
                <Logo/>
                <Route component={NotesContainer}/>
                <Route component={NoteDetailsContainer}/>
              </div>
            )}/>
            <Route path="/notes" render={({location}) => (
              <div style={style}>
                <Logo/>
                <Route
                  location={location}
                  key={location.key}
                  component={FoldersContainer}/>
                <Route path="/notes/:folderId" component={NotesContainer}/>
              </div>
            )}/>
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
