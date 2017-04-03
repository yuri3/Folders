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
      notes,
      match,
      createNote,
      moveNote,
      removeTag,
      removeNote
    } = this.props;
    const {folderId, noteId} = match.params;
    const flex = folderId && noteId ? '0 1 223px' : '1';
    return (
      <div style={{...style, flex}}>
        <CreateNote
          folderId={folderId}
          createNote={createNote}/>
        {notes && notes.length > 0 &&
          <NoteList
            notes={notes}
            folderId={folderId}
            moveNote={moveNote}
            removeTag={removeTag}
            removeNote={removeNote}/>}
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    hasTags: PropTypes.bool,
  })).isRequired,
  match: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;
