import React from 'react';
import DragAndDropNote from './DragAndDropNote';

const style = {border: '1px solid blue'};

const styles = {
  width: '200px',
  margin: '10px',
  height: '40px',
  border: '1px dashed gray'
};

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.moveNote = this.moveNote.bind(this);
  }
  moveNote(dragIndex, hoverIndex) {
    const {params, moveNote} = this.props;
    moveNote(params.folderId, dragIndex, hoverIndex);
  }
  renderDragAndDropNote(note, index, props) {
    const {params, removeNote} = props;
    return (
      <DragAndDropNote
        index={index}
        params={params}
        note={note}
        moveNote={this.moveNote}
        removeNote={removeNote}/>
    )
  }
  render() {
    const {folder} = this.props;
    return (
      <div style={style}>
        {folder && folder.notes.map((note, index) => (
          <div key={note.id} style={styles}>
            {this.renderDragAndDropNote(note, index, this.props)}
          </div>)
        )}
      </div>
    );
  }
}

NoteList.propTypes = {
  folder: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  removeNote: React.PropTypes.func.isRequired,
};

export default NoteList;
