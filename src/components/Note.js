import React from 'react';
import { Link } from 'react-router';

const li = {
  width: '200px',
  textAlign: 'center',
};

const remove = {
  marginRight: '15px',
  float: 'right',
};

class Note extends React.Component {
  render() {
    const {params, removeNote, note} = this.props;
    const {folderId, noteId} = params;
    return (
      <li style={li}>
        {noteId === note.id ? note.name :
          <Link to={`/${folderId}/${note.id}`}>{note.name}</Link>}
        <span style={remove} onClick={() => removeNote(note.id)}>X</span>
      </li>
    );
  }
}

Note.propTypes = {
  params: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  removeNote: React.PropTypes.func.isRequired,
};

export default Note;
