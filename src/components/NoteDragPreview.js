import React from 'react';
import Note from './Note';

const styles = {
  display: 'inline-block',
  width: '200px',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
};

class NoteDragPreview extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      tickTock: false,
    };
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    this.setState({
      tickTock: !this.state.tickTock,
    });
  }
  render() {
    const { note } = this.props;
    const { tickTock } = this.state;
    return (
      <div style={styles}>
        <Note note={note} color={tickTock && 'yellow'}/>
      </div>
    );
  }
}

export default NoteDragPreview;
