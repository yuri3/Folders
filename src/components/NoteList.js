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
      options,
      folderId,
      moveSelectedNote,
      selectDeleteNote,
      deleteSelectedNote
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
              {note.folderId === Number.parseInt(folderId, 10) &&
                <DragAndDropNote
                  index={index}
                  note={note}
                  options={options}
                  moveSelectedNote={moveSelectedNote}
                  selectDeleteNote={selectDeleteNote}
                  deleteSelectedNote={deleteSelectedNote}
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
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  options: PropTypes.object.isRequired,
  folderId: PropTypes.string.isRequired,
  moveSelectedNote: PropTypes.func.isRequired,
  selectDeleteNote: PropTypes.func.isRequired,
  deleteSelectedNote: PropTypes.func.isRequired,
};

export default NoteList;
