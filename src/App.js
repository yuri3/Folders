import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import FoldersContainer from './containers/FoldersContainer';

const App = ({ params, children }) => (
  <MuiThemeProvider>
    <FoldersContainer params={params} children={children}/>
  </MuiThemeProvider>
);

export default App;
