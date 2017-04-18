import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DragAndDropSubFolder from './DragAndDropSubFolder';

class SubFoldersList extends Component {
  render() {
    const {
      folders,
      folder,
      options,
      match,
      createNewFolder,
      selectRenameInput,
      renameSelectedFolder,
      deleteSelectedFolder,
      moveSelectedFolder
    } = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {folders.map((subFolder, index) => (
          folder.id === subFolder.parentId ?
            <DragAndDropSubFolder
              key={subFolder.id}
              index={index}
              folders={folders}
              folder={subFolder}
              match={match}
              options={options}
              createNewFolder={createNewFolder}
              selectRenameInput={selectRenameInput}
              renameSelectedFolder={renameSelectedFolder}
              deleteSelectedFolder={deleteSelectedFolder}
              moveSelectedFolder={moveSelectedFolder}/> : null
        ))}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

SubFoldersList.propTypes = {
  folders: PropTypes.array.isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    renameId: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  }).isRequired,
  match: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameSelectedFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
};

export default SubFoldersList;
