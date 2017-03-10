import React from 'react';
import { DragLayer } from 'react-dnd';
import { NoteTypes } from './NoteTypes';
import NoteDragPreview from './NoteDragPreview';

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 10,
  top: 0,
  left: 0,
};

function getItemStyles(props) {
  const {initialOffset, currentOffset} = props;
  if(!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let {x, y} = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(type, item) {
    switch(type) {
      case NoteTypes.NOTE:
        return (<NoteDragPreview note={item}/>);
      default:
        return null;
    }
  }
  render() {
    const {item, itemType, isDragging} = this.props;
    if(!isDragging) {return null;}
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
