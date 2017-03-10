import React from 'react';
import { Link } from 'react-router';

const styles = {
  height: '20px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'move',
  border: '1px solid gray'
};

const removeStyle = {
  marginRight: '15px',
  float: 'right',
};

class Note extends React.Component {
  render() {
    const {
      params,
      note,
      removeNote,
      color,
    } = this.props;
    const {folderId, noteId} = params;
    const backgroundColor = color ? color : 'white';
    return(
      <div style={{...styles, backgroundColor}}>
        {noteId === note.id ? note.name :
          <Link to={`/${folderId}/${note.id}`}>{note.name}</Link>}
        <span style={removeStyle} onClick={() => removeNote && removeNote(folderId, note.id)}>X</span>
      </div>
    );
  }
}

Note.defaultProps = {
  params: {folderId: '', noteId: ''},
};

Note.propTypes = {
  params: React.PropTypes.object,
  note: React.PropTypes.object,
  removeNote: React.PropTypes.func,
};
export default Note;
