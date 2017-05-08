import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
      history.push(`/notes/${nextProps.folders[0].id}`);
    }
    if(nextProps.folders.length < this.props.folders.length) {
      history.push('/folders');
    }
  }
  render() {
    const {
      folders,
      options,
      match,
      selectCreateFolder,
      createNewFolder,
      selectRenameInput,
      renameSelectedFolder,
      selectDeleteFolder,
      deleteSelectedFolder,
      moveSelectedFolder
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
              options={options}
              match={match}
              selectCreateFolder={selectCreateFolder}
              createNewFolder={createNewFolder}
              selectRenameInput={selectRenameInput}
              renameSelectedFolder={renameSelectedFolder}
              selectDeleteFolder={selectDeleteFolder}
              deleteSelectedFolder={deleteSelectedFolder}
              moveSelectedFolder={moveSelectedFolder}/> : null
          ))}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  selectCreateFolder: PropTypes.func.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameSelectedFolder: PropTypes.func.isRequired,
  selectDeleteFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
};

export default FolderList;
