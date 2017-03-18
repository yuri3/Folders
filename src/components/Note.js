import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
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
  pointerEvents: 'none',
  width: '80%',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '10px 5px 10px 5px',
};

const removeStyle = {
  position: 'absolute',
  top: '-25px',
  right: '-25px',
};

class Note extends Component {
  render() {
    const {
      params,
      note,
      removeNote,
      isDragging,
      background,
    } = this.props;
    const {folderId, noteId} = params;
    const backgroundColor = background ? background : 'white';
    const noteName = note.name ? note.name : 'New Note';
    const color = note.name ? 'black' : 'gray';
    const opacity = isDragging ? 0 : 1;
    return(
      <div style={{...styles, backgroundColor, opacity}}>
        <i className="material-icons md-36" style={iconStyle}>description</i>
        {noteId === note.id ?
          <div style={{...linkStyle, color}}>{noteName}</div> :
          <Link style={{...linkStyle, color}} to={`/${folderId}/${note.id}`}>
            <span style={{pointerEvents: 'auto',}}>{noteName}</span>
          </Link>}
        <span style={removeStyle}>
          <IconButton
            iconClassName="material-icons"
            tooltip="Remove Note"
            onTouchTap={() => removeNote(folderId, note.id)}>delete_forever
          </IconButton>
        </span>
      </div>
    );
  }
}

Note.defaultProps = {
  params: {folderId: '', noteId: ''},
};

Note.propTypes = {
  params: PropTypes.object,
  note: PropTypes.object,
  removeNote: PropTypes.func,
  isDragging: PropTypes.bool,
  background: PropTypes.string,
};
export default Note;
