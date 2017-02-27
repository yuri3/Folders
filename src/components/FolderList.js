import React from 'react';
import { browserHistory } from 'react-router';
import Folder from './Folder';
import { REMOVE_FOLDER } from '../actions/actions';

const style = {listStyleType: 'none', padding: '15px', border: '1px solid red'};

class FolderList extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.status === REMOVE_FOLDER) {
      browserHistory.push('/');
      this.props.setStatus('');
    }
  }
  render() {
    const {
      folders,
      subfolders,
      status,
      params,
      renameId,
      setStatus,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    return (
      <ul style={style}>
        {folders.map(folder => (
          !folder.parentId ?
            <Folder
              key={folder.id}
              folder={folder}
              subfolders={subfolders}
              status={status}
              isShowRenameInput={renameId === folder.id}
              params={params}
              renameId={renameId}
              setStatus={setStatus}
              createFolder={createFolder}
              selectRenameInput={selectRenameInput}
              renameFolder={renameFolder}
              removeFolder={removeFolder}/> : null
          ))}
      </ul>
    );
  }
}

FolderList.propTypes = {
  folders: React.PropTypes.array.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired
  ]),
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
};

export default FolderList;
