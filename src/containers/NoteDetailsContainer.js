import React, { PropTypes, Component } from 'react';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/notes';
import * as tagActions from '../actions/tags';
import NoteForm from '../components/NoteForm';

const style = {
  flex: 1,
  padding: '10px',
  margin: '0 0 0 30px',
};

class NoteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPristine: true,
      isError: false,
      errorMessage: '',
      isFormChanged: false,
      formMessage: '',
    };
    this.changeName = this.changeName.bind(this);
    this.handleBlocking = this.handleBlocking.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {match: {params}, fetchNoteById, fetchAllTags} = this.props;
    fetchNoteById(params);
    fetchAllTags();
  }
  componentWillReceiveProps(nextProps) {
    const {match: {params: {noteId}}, note, notes, noteOptions: {successMsg, errorMsg}} = this.props;
    const {isError, isFormChanged} = this.state;
    if (
        noteId !== nextProps.match.params.noteId &&
        note.name !== notes.find(note => note.id === Number.parseInt(noteId, 10)).name &&
        (isError || isFormChanged)
    ) {
      this.changeName(note.name);
    }
    if(successMsg || errorMsg) {
      this.handleBlocking({error: {}, isFormChanged: ''});
    }
  }
  changeName(value) {
    const {updateNoteName, note} = this.props;
    updateNoteName(note.id, value);
  }
  handleBlocking({error, isFormChanged}) {
    const key = Object.keys(error).find(key => error[key] && error[key]);
    this.setState({
      ...this.state,
      isError: !!error[key],
      errorMessage: error[key],
      isFormChanged: !!isFormChanged,
      formMessage: isFormChanged,
    });
  }
  handleSubmit(values) {
    const {updateSelectedNote, match: {params}} = this.props;
    updateSelectedNote(params, values);
  }
  render() {
    const {
      note,
      notes,
      noteOptions,
      tags,
      tagOptions,
      match,
      fetchNoteById,
      resetMessages,
      addTag,
      deleteTag,
    } = this.props;
    const {isError, errorMessage, isFormChanged, formMessage} = this.state;
    const {noteId} = match.params;
    const {isFetchingById} = noteOptions;
    const {isFetching} = tagOptions;
    return (
      <div style={style}>
        <Prompt
          when={isError || isFormChanged}
          message={nextLocation => {
            if(isError) {
              return `
                There is an Error "${errorMessage}"!!!
                Are you sure you want to go to ${nextLocation.pathname}?
                If Ok. The Form will not be save and data will be set to initial."`
            }
            if(isFormChanged) {
              return `
                ${formMessage}
                Are you sure you want to go to ${nextLocation.pathname}?
                If Ok. The Form will not be save and data will be set to initial.`
            }
          }}
        />
        {!isFetchingById && note.id && !isFetching && tags.length >= 0 &&
          <NoteForm
            handleBlocking={this.handleBlocking}
            notes={notes}
            noteOptions={noteOptions}
            tags={tags}
            tagOptions={tagOptions}
            params={match.params}
            initialValues={{
              id: note.id,
              name: note.name,
              tag: '',
              description: note.description,
            }}
            fetchNoteById={fetchNoteById}
            changeNoteName={this.changeName}
            onSubmit={this.handleSubmit}
            resetMessages={resetMessages}
            addTag={(label) => addTag(noteId, label)}
            deleteTag={deleteTag}
          />}
      </div>
    );
  }
}

NoteDetails.propTypes = {
  note: PropTypes.shape({
    folderId: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    folderId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  noteOptions: PropTypes.shape({
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    noteId: PropTypes.number,
    id: PropTypes.number,
    label: PropTypes.string
  })).isRequired,
  tagOptions: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  fetchAllTags: PropTypes.func.isRequired,
  updateNoteName: PropTypes.func.isRequired,
  updateSelectedNote: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  note: state.note,
  notes: state.notes,
  noteOptions: state.noteOptions,
  tags: state.tags,
  tagOptions: state.tagOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...noteActions, ...tagActions}, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
