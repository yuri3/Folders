import React from 'react';
import Note from './Note';

const style = {border: '1px solid blue'};

class NoteList extends React.Component {
  moveNote = (dragIndex, hoverIndex) => {
    const {params, moveNote} = this.props;
    moveNote(params.folderId, dragIndex, hoverIndex);
  };
  render() {
    const {folder, params, removeNote} = this.props;
    return (
      <ul style={style}>
        {folder && folder.notes.map((note, index) => (
          <Note
            key={note.id}
            index={index}
            params={params}
            note={note}
            moveNote={this.moveNote}
            removeNote={removeNote}/>
        ))}
      </ul>
    );
  }
}

NoteList.propTypes = {
  folder: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  removeNote: React.PropTypes.func.isRequired,
};

export default NoteList;
