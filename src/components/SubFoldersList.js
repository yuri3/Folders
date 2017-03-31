import React, { PropTypes, Component } from 'react';
import Folder from './Folder';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const style = {
  margin: '0 0 20px 0',
  width: '350px',
  cursor: 'auto',
};

class SubFoldersList extends Component {
  render() {
    const {
      folders,
      folder,
      subfolders,
      options,
      match,
      isDragging,
      isOver,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {subfolders.map(subFolder => (
          folder.id === subFolder.parentId && !isOver ?
          <li key={subFolder.id} style={style}>
            <Folder
              folders={folders}
              folder={subFolder}
              subfolders={subfolders}
              match={match}
              options={options}
              isDragging={isDragging}
              isOver={isOver}
              createFolder={createFolder}
              selectRenameInput={selectRenameInput}
              renameFolder={renameFolder}
              removeFolder={removeFolder}/>
          </li> : null
        ))}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

SubFoldersList.propTypes = {
  folders: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired,
  subfolders: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};

export default SubFoldersList;
