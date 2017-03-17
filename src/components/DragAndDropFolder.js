import React, { PropTypes, Component } from 'react';
import { FolderTypes } from './FolderTypes';
import { DragSource, DropTarget } from 'react-dnd';
import Folder from './Folder';
import flow from 'lodash/flow';

const style = {
  margin: '0 0 20px 0',
  width: '350px',
};

const folderSource = {
  beginDrag(props) {
    return {
      id: props.folder.id,
      name: props.folder.name,
      index: props.index,
    };
  }
};

const folderTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    console.log('same', dragIndex, hoverIndex);
    if(dragIndex === hoverIndex) {
      return;
    }
    console.log('end', dragIndex, hoverIndex);
    if(dragIndex !== hoverIndex) {
      props.moveFolder(dragIndex, hoverIndex);
    }
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

class DragAndDropFolder extends Component {
  componentDidMount() {
    const img = new Image(); // When add new Folder, it does note show image!!!
    img.src = 'ic_folder_black_48px.svg'; //'ic_folder_open_black_48px';
    img.onload = () => {console.log('onload()');this.props.connectDragPreview(img)};
  }
  render() {
    const {
      folders,
      folder,
      subfolders,
      params,
      options,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    return connectDragSource(connectDropTarget(
      <li style={{...style, border: isDragging ? '1px dashed gray' : ''}}>
        <Folder
          folders={folders}
          folder={folder}
          subfolders={subfolders}
          match={match}
          options={options}
          isDragging={isDragging}
          createFolder={createFolder}
          selectRenameInput={selectRenameInput}
          renameFolder={renameFolder}
          removeFolder={removeFolder}/>
      </li>
    ));
  }
}

DragAndDropFolder.propTypes = {
  index: PropTypes.number.isRequired,
  folders: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired,
  subfolders: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};

export default flow(
  DragSource(FolderTypes.FOLDER, folderSource, collectSource),
  DropTarget(FolderTypes.FOLDER, folderTarget, collectTarget)
)(DragAndDropFolder);
