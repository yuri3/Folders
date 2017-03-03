import React from 'react';
import Note from './Note';

const style = {border: '1px solid blue'};

const NoteList = ({folder, params, removeNote}) => {
  const {folderId} = params;
  return (
    <ul style={style}>
      {folder && folder.notes.map((note) => (
        <Note
          key={note.id}
          params={params}
          note={note}
          removeNote={removeNote.bind(null, folderId)}/>
      ))}
    </ul>
  )
};

NoteList.propTypes = {
  folder: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  removeNote: React.PropTypes.func.isRequired,
};

export default NoteList;
