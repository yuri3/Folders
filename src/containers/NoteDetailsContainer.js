import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import NoteForm from '../components/NoteForm';

const style = {padding: '10px', border: '1px solid blue',};

class NoteDetails extends Component {
  render() {
    const {folders, notes, match, changeNoteName} = this.props;
    const {folderId, noteId} = match.params;
    const currentNote = notes[noteId];
    return (
      <div style={style}>
        <NoteForm
          folders={folders}
          params={match.params}
          initialValues={{
            name: currentNote && currentNote.name,
            notes: currentNote && currentNote.description
          }}
          changeNoteName={(value) => changeNoteName(folderId, noteId, value)}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  notes: state.folders.reduce((prev, curr) => {
    const {notes} = curr;
    if(notes) {
      notes.forEach(note => prev[note.id] = note);
      return prev;
    }
    return prev;
  }, {}),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
