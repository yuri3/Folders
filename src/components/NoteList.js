import React, { PropTypes, Component } from 'react';
import DragAndDropNote from './DragAndDropNote';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  //border: '1px solid blue'
};

class NoteList extends Component {
  render() {
    const {folder, params, moveNote, removeNote} = this.props;
    const {folderId} = params;
    return (
      <div style={style}>
        {folder && folder.notes.map((note, index) => (
          <DragAndDropNote
            key={note.id}
            index={index}
            params={params}
            note={note}
            moveNote={(dragIndex, hoverIndex) => (
              moveNote(folderId, dragIndex, hoverIndex)
            )}
            removeNote={removeNote}/>)
        )}
      </div>
    );
  }
}

NoteList.propTypes = {
  folder: PropTypes.object,
  params: PropTypes.object.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default NoteList;
