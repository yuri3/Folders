import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import Folder from './Folder';

const style = {listStyleType: 'none', padding: '15px'};

class FolderList extends Component {
  componentDidMount() {
    browserHistory.push('/');
  }
  componentWillUpdate(nextProps) {
    if(nextProps.folders.length > this.props.folders.length) {
      const newFolder = nextProps.folders[0];
      browserHistory.push(`/${newFolder.id}`);
    }
    if(nextProps.folders.length < this.props.folders.length) {
      browserHistory.push('/');
    }
  }
  render() {
    const {
      folders,
      subfolders,
      params,
      options,
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
              folders={folders}
              folder={folder}
              subfolders={subfolders}
              options={options}
              params={params}
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
  folders: PropTypes.array.isRequired,
  subfolders: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};

export default FolderList;
