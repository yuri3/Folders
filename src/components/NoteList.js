import React, { PropTypes, Component } from 'react';
import DragAndDropNote from './DragAndDropNote';

const style = {
  display: 'flex',
  flexFlow: 'row wrap',
  border: '1px solid blue'
};

class NoteList extends Component {
  render() {
    const {
      folder,
      match: {params: {folderId}},
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
            history={history}
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
  folder: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default NoteList;
