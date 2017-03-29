import React, { PropTypes, Component } from 'react';
import DragAndDropNote from './DragAndDropNote';

const style = {
  display: 'flex',
  flexFlow: 'row wrap',
};

class NoteList extends Component {
  render() {
    const {
      folder,
      moveNote,
      removeNote
    } = this.props;
    return (
      <div style={style}>
        {folder && folder.notes.map((note, index) => (
          <DragAndDropNote
            key={note.id}
            index={index}
            note={note}
            moveNote={(dragIndex, hoverIndex) => (
              moveNote(dragIndex, hoverIndex, note.parentId)
            )}
            removeNote={removeNote}/>
          )
        )}
      </div>
    );
  }
}

NoteList.propTypes = {
  folder: PropTypes.object.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default NoteList;
