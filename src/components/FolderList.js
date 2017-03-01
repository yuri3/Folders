import React from 'react';
import { browserHistory } from 'react-router';
import Folder from './Folder';

const style = {listStyleType: 'none', padding: '15px', border: '1px solid red'};

class FolderList extends React.Component {
  componentDidMount() {
    browserHistory.push('/');
  }
  componentWillUpdate(nextProps, nextState) {
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
  folders: React.PropTypes.array.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
};

export default FolderList;
