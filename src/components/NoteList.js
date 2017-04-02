import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DragAndDropNote from './DragAndDropNote';

const style = {
  display: 'flex',
  flexFlow: 'row wrap',
};

class NoteList extends Component {
  render() {
    const {
      notes,
      folderId,
      moveNote,
      removeNote
    } = this.props;
    return (
      <div style={style}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          style={{display: 'flex', flexWrap: 'wrap'}}
        >
          {notes && notes.map((note, index) => (
            <div key={note.id}>
              {note.parentFolderId === folderId &&
                <DragAndDropNote
                  index={index}
                  note={note}
                  moveNote={moveNote}
                  removeNote={removeNote}
                />}
            </div>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  folderId: PropTypes.string.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default NoteList;
