import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';

const styles = {
  display: 'flex',
  position: 'relative',
  width: '200px',
  cursor: 'move',
};

const iconStyle = {
  width: '20%',
  backgroundColor: 'gray',
};

const linkStyle = {
  width: '80%',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '10px 5px 10px 5px',
};

const activeStyle = {
  textDecoration: 'none',
  pointerEvents: 'none',
  color: 'dodgerblue',
};

const removeStyle = {
  position: 'absolute',
  top: '-25px',
  right: '-25px',
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove() {
    const {history, removeNote, match: {params: {folderId, noteId}}, note} = this.props;
    removeNote(note.id);
    note.id === noteId && history.push(`/notes/${folderId}`);
  }
  render() {
    const {
      note,
      isDragging,
    } = this.props;
    const noteName = note.name ? note.name : 'New Note';
    const color = note.name ? 'black' : 'gray';
    const opacity = isDragging ? 0 : 1;
    return(
      <div style={{...styles, opacity}}>
        <i className="material-icons md-36" style={iconStyle}>description</i>
        <header style={{...linkStyle,}}>
          <NavLink
            style={{color}}
            activeStyle={activeStyle}
            to={`/notes/${note.parentId}/${note.id}`}>{noteName}
          </NavLink>
        </header>
        <span style={removeStyle}>
          <IconButton
            iconClassName="material-icons"
            tooltip="REMOVE NOTE"
            onTouchTap={this.handleRemove}>delete_forever
          </IconButton>
        </span>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    parentId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  removeNote: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

export default withRouter(Note);
