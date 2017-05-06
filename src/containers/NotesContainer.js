import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/notes';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';

const style = {
  margin: '0 0 0 30px',
};

class Notes extends Component {
  componentDidMount() {
    const {fetchAllNotes, match: {params}} = this.props;
    fetchAllNotes(params);
  }
  componentWillReceiveProps(nextProps) {
    const {match: {params}, fetchAllNotes} = this.props;
    if(nextProps.match.params.folderId !== params.folderId) {
      fetchAllNotes(nextProps.match.params);
    }
  }
  render() {
    const {
      notes,
      options,
      match,
      createNewNote,
      moveSelectedNote,
      selectDeleteNote,
      deleteSelectedNote
    } = this.props;
    const {isFetching} = options;
    const {folderId, noteId} = match.params;
    const flex = folderId && noteId ? '0 1 223px' : '1';
    return (
      <div style={{...style, flex}}>
        <CreateNote
          options={options}
          folderId={folderId}
          createNewNote={createNewNote}/>
        {!isFetching && notes.length > 0 &&
          <NoteList
            notes={notes}
            options={options}
            folderId={folderId}
            moveSelectedNote={moveSelectedNote}
            selectDeleteNote={selectDeleteNote}
            deleteSelectedNote={deleteSelectedNote}/>}
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  options: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }),
  match: PropTypes.object.isRequired,
  createNewNote: PropTypes.func.isRequired,
  moveSelectedNote: PropTypes.func.isRequired,
  selectDeleteNote: PropTypes.func.isRequired,
  deleteSelectedNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  options: state.noteOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;
