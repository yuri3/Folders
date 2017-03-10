import React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { NoteTypes } from './NoteTypes';
import { DragSource, DropTarget } from 'react-dnd';
import Note from './Note';
import flow from 'lodash/flow';

function getStyles(props) {
  const {isDragging} = props;
  //const transform = `translate3d(${0}px, ${0}px, 0)`;
  return {
    position: 'relative',
    //top: 0,
    //left: 0,
    //width: '100%',
    //transform,
    //WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    //border: isDragging ? '1px dashed gray' : 'none',
    //height: isDragging ? 0 : '',
  };
}

const noteSource = {
  beginDrag(props) {
    return {
      id: props.note.id,
      name: props.note.name,
      index: props.index,
    };
  }
};

const noteTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if(dragIndex === hoverIndex) {
      return;
    }
    if(dragIndex !== hoverIndex) {
      props.moveNote(dragIndex, hoverIndex);
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

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
  };
}

class DragAndDropNote extends React.Component {
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const {
      params,
      note,
      removeNote,
      connectDragSource,
      connectDropTarget
    } = this.props;
    return connectDragSource(connectDropTarget(
      <div style={getStyles(this.props)}>
        <Note params={params} note={note} removeNote={removeNote}/>
      </div>
    ));
  }
}

DragAndDropNote.propTypes = {
  index: React.PropTypes.number.isRequired,
  params: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  moveNote: React.PropTypes.func.isRequired,
  removeNote: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func,
  connectDragPreview: React.PropTypes.func,
  isDragging: React.PropTypes.bool,
  connectDropTarget: React.PropTypes.func,
};

export default flow(
  DragSource(NoteTypes.NOTE, noteSource, collectSource),
  DropTarget(NoteTypes.NOTE, noteTarget, collectTarget)
)(DragAndDropNote);
