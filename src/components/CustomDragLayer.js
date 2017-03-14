import React, { PropTypes, Component } from 'react';
import { DragLayer } from 'react-dnd';
import NoteDragPreview from './NoteDragPreview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
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

class CustomDragLayer extends Component {
  render() {
    const {item, isDragging} = this.props;
    if(!isDragging) {return null;}
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <NoteDragPreview note={item}/>
        </div>
      </div>
    )
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.object,
  currentOffset: PropTypes.object,
  isDragging: PropTypes.bool,
};


export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
