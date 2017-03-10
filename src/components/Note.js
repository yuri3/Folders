import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const styles = {
  width: '200px',
  margin: '10px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'move',
  border: '1px solid green',
};

const removeStyle = {
  marginRight: '15px',
  float: 'right',
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.note.id,
      index: props.index,
    };
  }
};

const noteTarget = {
  hover(props, monitor, /*component*/) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if(dragIndex === hoverIndex) {
      return;
    }
    /*
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }*/

    if(dragIndex !== hoverIndex) {
      props.moveNote(dragIndex, hoverIndex);
    }

    // Time to actually perform the action
    //props.moveNote(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  /*canDrop(props, monitor) {
  },
  drop(props, monitor, component) {
  },*/
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
  };
}

class Note extends React.Component {
  render() {
    const {
      params,
      note,
      removeNote,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    const {folderId, noteId} = params;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <div style={{...styles, opacity}}>
        {noteId === note.id ? note.name :
          <Link to={`/${folderId}/${note.id}`}>{note.name}</Link>}
        <span style={removeStyle} onClick={() => removeNote(folderId, note.id)}>X</span>
      </div>
    ));
  }
}

Note.propTypes = {
  index: React.PropTypes.number.isRequired,
  params: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  moveNote: React.PropTypes.func.isRequired,
  removeNote: React.PropTypes.func.isRequired,
};

export default flow(
  DragSource(ItemTypes.NOTE, noteSource, collectSource),
  DropTarget(ItemTypes.NOTE, noteTarget, collectTarget)
)(Note);

/*export default DragSource(
  ItemTypes.NOTE, noteSource, collectSource
)(DropTarget(ItemTypes.NOTE, noteTarget, collectTarget)(Note));
*/
