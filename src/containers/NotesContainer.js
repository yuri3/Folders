import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/actions';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';

const style = {
  margin: '0 0 0 30px',
};

class Notes extends Component {
  render() {
    const {
      currentFolder,
      match,
      createNote,
      moveNote,
      removeNote
    } = this.props;
    const {folderId, noteId} = match.params;
    const flex = folderId && noteId ? '0 1 223px' : '1';
    return (
      <div style={{...style, flex}}>
        <CreateNote
          folderId={folderId}
          createNote={createNote}/>
        {currentFolder && currentFolder.notes.length > 0 &&
          <NoteList
            folder={currentFolder}
            moveNote={moveNote}
            removeNote={removeNote}/>}
      </div>
    );
  }
}

Notes.defaultProps = {
  currentFolder: {
    notes: [],
  },
};

Notes.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentFolder: state.folders.find((folder) => folder.id === ownProps.match.params.folderId),
  options: state.options,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;
