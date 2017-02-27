import React from 'react';
import FoldersContainer from './containers/FoldersContainer';

const App = ({ params, children }) => (
  <FoldersContainer params={params} children={children}/>
);

export default App;
