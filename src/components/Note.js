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
  pointerEvents: 'none'
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
    removeNote(folderId, note.id);
    console.log(folderId, noteId, note);
    note.id === noteId && history.push(`/notes/${folderId}`);
  }
  render() {
    const {
      note,
      match: {params: {folderId}},
      isDragging,
      background,
    } = this.props;
    console.log('Note = ', this.props);
    const backgroundColor = background ? background : '';
    const noteName = note.name ? note.name : 'New Note';
    const color = note.name ? 'black' : 'gray';
    const opacity = isDragging ? 0 : 1;
    return(
      <div style={{...styles, backgroundColor, opacity}}>
        <i className="material-icons md-36" style={iconStyle}>description</i>
        <header style={{...linkStyle,}}>
          <NavLink
            style={{color}}
            activeStyle={activeStyle}
            to={`/notes/${folderId}/${note.id}`}>{noteName}
          </NavLink>
        </header>
        <span style={removeStyle}>
          <IconButton
            iconClassName="material-icons"
            tooltip="Remove Note"
            onTouchTap={this.handleRemove}>delete_forever
          </IconButton>
        </span>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  removeNote: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  background: PropTypes.string,
};

export default withRouter(Note);
