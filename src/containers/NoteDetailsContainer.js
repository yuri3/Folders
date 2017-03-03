import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import FolderForm from '../components/FolderForm';

const style = {padding: '10px', border: '1px solid blue',};

class NoteDetails extends React.Component {
  render() {
    const {folders, params} = this.props;
    const {noteId} = params;
    const notes = folders.reduce((prev, curr) => {
      const {notes} = curr;
      notes.forEach((note) => prev[note.id] = note);
      return prev;
    }, {});
    const currentNote = notes[noteId];
    return (
      <div style={style}>
        {currentNote && <div>{currentNote.name}</div>}
        {currentNote && <FolderForm
          params={params}
          defaultValue={currentNote.name}
          showSymbols={false}
          autoFocus={false}/>}

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  options: state.options,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
/*
FolderForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  multiLine: React.PropTypes.bool,
  rows: React.PropTypes.number,
  createSymbol: React.PropTypes.string,
  closeSymbol: React.PropTypes.string,
};
*/
