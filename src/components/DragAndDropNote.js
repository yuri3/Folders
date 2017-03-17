import React, { PropTypes, Component } from 'react';
//import { getEmptyImage } from 'react-dnd-html5-backend';
import { NoteTypes } from './NoteTypes';
import { DragSource, DropTarget } from 'react-dnd';
import Note from './Note';
import flow from 'lodash/flow';

const styles = {
  margin: '10px',
  borderRadius: '0px 9px 0px 0px',
  border: '1px solid gray',
};

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

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
    //isOver: monitor.isOver(),
    //isOverCurrent: monitor.isOver({shallow: true}),
    //canDrop: monitor.canDrop(),
  };
}

class DragAndDropNote extends Component {
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    /*this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });*/
    const img = new Image(); // When add new Note, it does note show image!!!
    img.src = 'description.svg';
    img.onload = () => {console.log('onload()');this.props.connectDragPreview(img)};
  }
  render() {
    const {
      params,
      note,
      removeNote,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    const border = isDragging ? '1px dashed gray' : '1px solid gray';
    return connectDragSource(connectDropTarget(
      <div style={{...styles, border}}>
        <Note params={params} note={note} removeNote={removeNote} isDragging={isDragging}/>
      </div>
    ));
  }
}

DragAndDropNote.propTypes = {
  index: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
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
