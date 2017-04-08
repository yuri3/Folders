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
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      moveFolder
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
              createFolder={createFolder}
              selectRenameInput={selectRenameInput}
              renameFolder={renameFolder}
              removeFolder={removeFolder}
              moveFolder={moveFolder}/> : null
        ))}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

SubFoldersList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    renameId: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  }).isRequired,
  match: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
  moveFolder: PropTypes.func.isRequired,
};

export default SubFoldersList;
