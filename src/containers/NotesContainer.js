import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actions  from '../actions/actions';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
//import CustomDragLayer from '../components/CustomDragLayer';

const style = {
  border: '1px solid red',
  margin: '0 0 0 30px',
};

class Notes extends Component {
  render() {
    const {currentFolder, match, createNote, moveNote, removeNote} = this.props;
    const {folderId, noteId} = match.params;
    console.log('match of NotesContainer = ', folderId, noteId);
    const flex = folderId && noteId ? '0 1 223px' : '1';
    return (
      <div style={{...style, flex}}>
        <CreateNote
          folderId={folderId}
          createNote={createNote}/>
        <NoteList
          folder={currentFolder}
          params={match.params}
          moveNote={moveNote}
          removeNote={removeNote}/>
      </div>
    );
  }
}

Notes.propTypes = {
  match: PropTypes.object.isRequired,
  currentFolder: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  currentFolder: state.folders.find((folder) => folder.id === ownProps.match.params.folderId),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

//export default NotesContainer;
export default DragDropContext(HTML5Backend)(NotesContainer);
