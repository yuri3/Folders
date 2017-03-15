import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

const styles = {
  display: 'flex',
  position: 'relative',
  width: '200px',
  height: '40px',
  cursor: 'move',
  borderRadius: '9px',
};

const iconStyle = {
  width: '20%',
  cursor: 'move',
  backgroundColor: 'gray',
  borderRadius: '9px 0px 0px 9px',
};

const linkStyle = {
  pointerEvents: 'none',
  width: '80%',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  padding: '10px 5px 10px 5px',
};

const removeStyle = {
  position: 'absolute',
  top: '-14px',
  right: '-13px',
  borderRadius: '9px',
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
    let noteName = note.name ? note.name : 'New Note';
    noteName = noteName.length > 18 ? `${noteName.slice(0, 17)}...` : noteName;
    const color = note.name ? 'black' : 'gray';
    const border = isDragging ? '1px dashed gray' : '1px solid gray';
    const opacity = isDragging ? 0 : 1;
    return(
      <div style={{...styles, backgroundColor, border}}>
        <div style={{...iconStyle, opacity}}>
          <i className="material-icons md-36">description</i>
        </div>
        {noteId === note.id ?
          <div style={{...linkStyle, color, opacity}}>{noteName}</div> :
          <Link style={{...linkStyle, color, opacity}} to={`/${folderId}/${note.id}`}>
            <span style={{pointerEvents: 'auto',}}>{noteName}</span>
          </Link>}
        <span style={{...removeStyle, opacity}} onClick={() => removeNote(folderId, note.id)}>
          <i className="material-icons md-24">delete_forever</i>
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
