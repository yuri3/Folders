import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DragAndDropSubFolder from './DragAndDropSubFolder';

class SubFoldersList extends Component {
  render() {
    const {folders: {lists}, folder, moveSelectedFolder} = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {lists.map((subFolder, index) => (
          folder.id === subFolder.parentId &&
            <DragAndDropSubFolder
              key={subFolder.id}
              index={index}
              folder={subFolder}
              moveSelectedFolder={moveSelectedFolder}
            />
        ))}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

SubFoldersList.propTypes = {
  folders: PropTypes.shape({
    lists: PropTypes.arrayOf(PropTypes.shape({
      parentId: PropTypes.number,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
};

export default SubFoldersList;
