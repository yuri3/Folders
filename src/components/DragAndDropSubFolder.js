import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FolderTypes } from './FolderTypes';
import { DragSource, DropTarget } from 'react-dnd';
import FolderContainer from '../containers/FolderContainer';
import flow from 'lodash/flow';

const style = {
  margin: '0 0 20px 0',
  width: '350px',
};

const folderSource = {
  beginDrag(props) {
    return {
      id: props.folder.id,
      index: props.index,
    };
  }
};

const folderTarget = {
  hover(props, monitor) {
    const dragId = monitor.getItem().id;
    const hoverId = props.folder.id;

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if(dragId === hoverId) {
      return;
    }
    if(dragIndex !== hoverIndex) {
      props.moveSelectedFolder({dragIndex, hoverIndex});
    }
    monitor.getItem().id = hoverId;
    monitor.getItem().index = hoverIndex;
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class DragAndDropSubFolder extends Component {
  componentDidMount() {
    const img = new Image();
    img.src = '/ic_folder_black_48px.svg';
    img.onload = () => this.props.connectDragPreview(img);
  }
  render() {
    const {
      folder,
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props;
    const border = isDragging ? '1px dashed gray' : '';
    return connectDragSource(connectDropTarget(
      <li style={{...style, border}}>
        <FolderContainer folder={folder} isDragging={isDragging}/>
      </li>
    ));
  }
}

DragAndDropSubFolder.propTypes = {
  index: PropTypes.number.isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
};

export default flow(
  DragSource(props => FolderTypes.SUB_FOLDER + props.folder.parentId, folderSource, collectSource),
  DropTarget(props => FolderTypes.SUB_FOLDER + props.folder.parentId, folderTarget, collectTarget)
)(DragAndDropSubFolder);
