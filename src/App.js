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
  flex: 1,
  flexWrap: 'wrap',
  marginLeft: '72px',
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router getUserConfirmation={getModalConfirmation}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/notes"/>}/>
            <Route path="/notes/:folderId/:noteId" render={({location, history, match}) => (
              <div>
                <Logo history={history} match={match}/>
                <div style={style}>
                  <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                  >
                    <Route
                      location={location}
                      key={location.key}
                      path="/notes"
                      component={FoldersContainer}
                    />
                  </ReactCSSTransitionGroup>
                  <Route component={NotesContainer}/>
                  <Route component={NoteDetailsContainer}/>
                </div>
              </div>
              )}/>
            <Route path="/notes" render={({location, history, match}) => (
              <div style={style}>
                <Logo/>
                <Route path="/notes" component={FoldersContainer}/>
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
