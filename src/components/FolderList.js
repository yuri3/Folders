import React, { PropTypes, Component } from 'react';
import Folder from './Folder';

const style = {listStyleType: 'none', padding: 0};

class FolderList extends Component {
  /*componentDidMount() {
    const {history} = this.props;
    console.log('history = ', history);
    history.push('/');
  }*/
  componentWillUpdate(nextProps) {
    const {history} = this.props;
    if(nextProps.folders.length > this.props.folders.length) {
      const newFolder = nextProps.folders[0];
      history.push(`/${newFolder.id}`);
    }
    if(nextProps.folders.length < this.props.folders.length) {
      history.push('/');
    }
  }
  render() {
    const {
      folders,
      subfolders,
      match,
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
              match={match}
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};

export default FolderList;
