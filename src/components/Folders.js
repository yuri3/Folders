

import React from 'react';
//import { STATUS } from '../actions/actions';
import CreateFolderForm from './CreateFolderForm';
import Folder from './Folder';

class Folders extends React.Component {
  render() {
    const {folders, status, params, onSetStatus, onCreateFolderClick, children } = this.props;
    
    const li = folders.map((folder) => (
      <Folder key={folder.name} folder={folder} params={params} status={status} />
    ))
    return (
      <div>
        <CreateFolderForm lastId={folders[folders.length - 1].id}
                          onSetStatus={onSetStatus}
                          onCreateFolderClick={onCreateFolderClick} />
        <ul style={{listStyleType: 'none', padding: '15px', border: '1px solid red'}}>
          {li}
        </ul>
        <div style={{color: 'red'}}>{children}</div>
      </div>
    );
  }
}

export default Folders;
