import React, { PropTypes, Component} from 'react';
import Note from './Note';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-5deg)',
  WebkitTransform: 'rotate(-5deg)',
};

class NoteDragPreview extends Component {
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
        <Note note={note} background={tickTock && 'yellow'}/>
      </div>
    );
  }
}

NoteDragPreview.propTypes = {
  note: PropTypes.object,
};

export default NoteDragPreview;
