import React from 'react';
import Folder from './Folder';
import { FOLDER_STATUS } from '../actions/actions';

const style = {listStyleType: 'none', padding: '15px', border: '1px solid red'};

class FolderList extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.status === FOLDER_STATUS.IS_REMOVE_DONE) {
      Object.assign(nextProps.params, {folderId: ''});
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
              params={params}
              isShowRenameInput={renameId === folder.id}
              renameId={renameId}/> : null
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
};

export default FolderList;