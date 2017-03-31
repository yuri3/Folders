import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import Folder from './Folder';
import DragAndDropFolder from './DragAndDropFolder';

const style = {
  listStyleType: 'none',
  padding: 0,
  cursor: 'move',
};

class FolderList extends Component {
  componentWillUpdate(nextProps) {
    const {history} = this.props;
    if(nextProps.folders.length > this.props.folders.length) {
      const newFolder = nextProps.folders[0];
      history.push(`/notes/${newFolder.id}`);
    }
    if(nextProps.folders.length < this.props.folders.length) {
      history.push('/notes');
    }
  }
  render() {
    const {
      folders,
      subfolders,
      options,
      match,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      moveFolder
    } = this.props;
    return (
      <ul style={style}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {folders.map((folder, index) => (
          !folder.parentId ?
            <DragAndDropFolder
              key={folder.id}
              index={index}
              folders={folders}
              folder={folder}
              subfolders={subfolders}
              options={options}
              match={match}
              createFolder={createFolder}
              selectRenameInput={selectRenameInput}
              renameFolder={renameFolder}
              removeFolder={removeFolder}
              moveFolder={moveFolder}/> : null
          ))}
        </ReactCSSTransitionGroup>
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
  moveFolder: PropTypes.func.isRequired,
};

export default FolderList;
