import React, { PropTypes, Component } from 'react';
import { NoteTypes } from './NoteTypes';
import { DragSource, DropTarget } from 'react-dnd';
import Note from './Note';
import flow from 'lodash/flow';

const noteSource = {
  beginDrag(props) {
    return {
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

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class DragAndDropNote extends Component {
  componentDidMount() {
    const img = new Image();
    img.src = '/description.svg';
    img.onload = () => this.props.connectDragPreview(img);
  }
  render() {
    const {
      note,
      removeNote,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    const border = isDragging ? '1px dashed gray' : '1px solid gray';
    return connectDragSource(connectDropTarget(
      <div style={{margin: '10px', border}}>
        <Note
          note={note}
          removeNote={removeNote}
          isDragging={isDragging}/>
      </div>
    ));
  }
}

DragAndDropNote.propTypes = {
  note: PropTypes.shape({
    parentId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isDragging: PropTypes.bool,
  connectDropTarget: PropTypes.func,
};

export default flow(
  DragSource(NoteTypes.NOTE, noteSource, collectSource),
  DropTarget(NoteTypes.NOTE, noteTarget, collectTarget)
)(DragAndDropNote);
