import React, { PropTypes, Component } from 'react';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/note_Actions';
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
    const {match: {params}, fetchNoteById} = this.props;
    fetchNoteById(params);
  }
  componentWillReceiveProps(nextProps) {
    const {match, options: {successMsg, errorMsg}} = this.props;
    const {isError, isFormChanged} = this.state;
    if (match.params && match.params.noteId !== nextProps.match.params.noteId && (isError || isFormChanged)) {
      this.changeName('New Note');
    }// reconsider this part!!!
    if(successMsg || errorMsg) {
      this.handleBlocking({error: '', isFormChanged: ''});
    }
  }
  componentWillUnmount() {
    const {isError} = this.state;
    if (isError) {
      this.changeName('New Note');
    }
  }
  changeName(value) {
    const {updateNoteName, note} = this.props;
    updateNoteName(note.id, value);
  }
  handleBlocking({error, isFormChanged}) {
    const key = Object.keys(error).find(key => error[key] && error[key]);
    this.setState({
      isError: !!error[key],
      errorMessage: error[key],
      isFormChanged: !!isFormChanged,
      formMessage: isFormChanged,
    });
  }
  handleSubmit(values) {
    console.log('handleSubmit', values);
    const {updateSelectedNote, match: {params}} = this.props;
    updateSelectedNote(params, values);
  }
  render() {
    const {
      note,
      notes,
      tags,
      options,
      match,
      fetchNoteById,
      resetMessages,
      addTag,
      removeTag,
    } = this.props;
    console.log(this.state);
    const {isError, errorMessage, isFormChanged, formMessage} = this.state;
    const {noteId} = match.params;
    const {isFetchingById} = options;
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
        {!isFetchingById && note.id &&
          <NoteForm
            handleBlocking={this.handleBlocking}
            notes={notes}
            tags={tags}
            options={options}
            params={match.params}
            initialValues={{
              id: note.id,
              name: note.name,
              tags: [],
              description: note.description,
            }}
            fetchNoteById={fetchNoteById}
            changeNoteName={this.changeName}
            onSubmit={this.handleSubmit}
            resetMessages={resetMessages}
            addTag={(label) => addTag(noteId, label)}
            removeTag={(key) => removeTag(key)}
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
  options: PropTypes.shape({
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
  }).isRequired,
  /*tags: PropTypes.arrayOf(PropTypes.shape({
    noteId: PropTypes.number,
    id: PropTypes.number.isRequired,
    label: PropTypes.string
  })).isRequired,*/
  match: PropTypes.object.isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  updateNoteName: PropTypes.func.isRequired,
  updateSelectedNote: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  /*addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,*/
};

const mapStateToProps = (state, ownProps) => ({
  note: state.note,
  notes: state.notes,
  //tags: state.tags,
  options: state.noteOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
