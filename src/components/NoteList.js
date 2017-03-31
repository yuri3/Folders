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
      folder,
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
        </ReactCSSTransitionGroup>
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
