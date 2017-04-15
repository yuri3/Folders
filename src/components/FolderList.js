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
      options,
      match,
      createNewFolder,
      selectRenameInput,
      renameSelectedFolder,
      deleteSelectedFolder,
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
              options={options}
              match={match}
              createNewFolder={createNewFolder}
              selectRenameInput={selectRenameInput}
              renameSelectedFolder={renameSelectedFolder}
              deleteSelectedFolder={deleteSelectedFolder}
              moveFolder={moveFolder}/> : null
          ))}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

FolderList.propTypes = {
  /*folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.integer,
    id: PropTypes.integer.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,*/
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameSelectedFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveFolder: PropTypes.func.isRequired,
};

export default FolderList;
