import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/note';
import * as notesActions from '../actions/notes';
import * as tagActions from '../actions/tags';
import CircularProgress from 'material-ui/CircularProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import DoneAction from 'material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';
import Loading from '../components/Loading';

const validate = (values, props) => {
  const {notes, tags, match: {params}} = props;
  if(!values.id) {return;}
  const error = {};
  if(values.name === '' || values.name.length > 18) {
    error.name = 'The "Name" field must be from 1 to 18 characters!';
  } else if(
    notes.lists.some(
      note => note && note.id !== values.id
                   && note.name !== 'New Note'
                   && note.name === values.name.trim()
    )
  ) {
    error.name = 'This name is already taken!';
  }
  if(tags.lists.some(tag =>
    tag && tag.noteId === Number.parseInt(params.noteId, 10) &&
    tag.label === values.tag)) {
    error.tag = 'This tag is already taken!';
  } else if(values.tag.length > 18) {
    error.tag = 'The "Tag" field has to be from 1 to 18 characters!';
  }
  return error;
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      error,
    },
    updateNoteName,
    addTag,
    ...custom
  } = field;
  return (
    <div>
      {input.name === 'name' || input.name === 'description' ?
        <TextField
          hintText={placeholder}
          floatingLabelText={placeholder}
          errorText={error}
          {...input}
          {...custom}
          onChange={(event) => {
            const value = event.target.value;
            input.onChange(value);
            updateNoteName && updateNoteName(value);
          }}
        /> :
        <TextField
          hintText={'Type a tag and hit Enter.'}
          floatingLabelText={placeholder}
          errorText={error}
          {...input}
          {...custom}
          onKeyDown={(event) => {
            const value = event.target.value;
            if(!error && addTag && event.keyCode === 13) {
              event.preventDefault();
              input.onChange('');
              addTag(value);
            }
          }}
        />}
    </div>
  );
};

const style = {
  position: 'relative',
  flex: 1,
  padding: '10px',
  margin: '0 0 0 30px',
};

const circularProgressStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loadingStyle = {
  display: 'flex',
  alignItems: 'flex-end',
};

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    const {match: {params}, fetchNoteById, fetchAllTags} = this.props;
    fetchNoteById(params);
    fetchAllTags();
  }
  componentWillReceiveProps(nextProps) {
    const {note: {currentNote}, notes: {lists}, match: {params}, initialValues, updateNoteName, fetchNoteById} = nextProps;
    if(
      currentNote.id && params.noteId !== this.props.match.params.noteId &&
      currentNote.name !== lists.find(note => note.id === Number.parseInt(params.noteId, 10)).name
    ) {
      updateNoteName(currentNote.id, initialValues.name);
    }
    if(currentNote.id && params.noteId !== this.props.match.params.noteId) {
      fetchNoteById(params);
    }
  }
  renderChip = (tag) => {
    const {deleteTag, match: {params: {noteId}}} = this.props;
    return (
      <div key={tag.id}>
        {tag.noteId === Number.parseInt(noteId, 10) &&
          <Chip
            onRequestDelete={() => deleteTag(tag.id)}
            style={{margin: 5}}
          >
            {tag.label}
          </Chip>}
      </div>
    );
  };
  save(values) {
    const {updateSelectedNote, addTag, initialValues, match: {params}} = this.props;
    const {name, description} = initialValues;
    const {id, tag, ...val} = values;
    if(values.name === name && values.description === description && tag.length > 0) {
      addTag(id, tag);
    } else if((values.name !== name || values.description !== description) && tag.length > 0) {
      updateSelectedNote(params, val);
      addTag(id, tag);
    } else {
      updateSelectedNote(params, val);
    }
  }
  render() {
    const {
      dirty,
      note: {loading: noteLoading, currentNote, success, error},
      invalid,
      pristine,
      submitting,
      handleSubmit,
      tags: {loading: tagsLoading, lists},
      updateNoteName,
      addTag,
    } = this.props;
    return (
      <div style={style}>
        {noteLoading && <div style={circularProgressStyle}>
          <CircularProgress size={80}  thickness={5}/>
        </div>}
        <Prompt
          when={dirty || invalid}
          message={nextLocation => {
            if(invalid) {
              return `
                There is an Error!!!
                Are you sure you want to go to ${nextLocation.pathname}?
                If Ok. The Form will not be save and data will be set to initial."`
            }
            if(dirty) {
              return `
                You have unsaved data!
                Are you sure you want to go to ${nextLocation.pathname}?
                If Ok. The Form will not be save and data will be set to initial.`
            }
          }}
        />
        {currentNote.id && lists.length > 0 && <form>
          <Field
            name="name"
            placeholder="Name"
            updateNoteName={(newName) => updateNoteName(currentNote.id, newName)}
            component={renderTextField}/>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{display: 'flex', flexWrap: 'wrap'}}
          >
            {lists.map(this.renderChip)}
          </ReactCSSTransitionGroup>
          <div style={loadingStyle}>
            <Field
              name="tag"
              placeholder="Tag..."
              addTag={(label) => addTag(currentNote.id, label)}
              normalize={(value) => value.toUpperCase()}
              component={renderTextField}
            />
              {tagsLoading && <Loading/>}
          </div>
          <Field
            name="description"
            placeholder="Description..."
            multiLine={true}
            rows={2}
            fullWidth={true}
            component={renderTextField}/>
          <div style={{textAlign: 'center'}}>
            <RaisedButton
              label="Save"
              labelPosition="before"
              backgroundColor="#a4c639"
              icon={<DoneAction color={fullWhite}/>}
              disabled={noteLoading || invalid || pristine || submitting}
              onTouchTap={handleSubmit(this.save)}
            />
          </div>
          <Snackbar
            open={!dirty && (!!success || !!error)}
            message={success || error}
            autoHideDuration={5000}
            action={
              success ?
                <i className="material-icons md-36">sentiment_very_satisfied</i> :
                <i className="material-icons md-36">sentiment_very_dissatisfied</i>
            }
            contentStyle={{color: error ? 'red' : 'dodgerblue'}}
          />
        </form>}
      </div>
    );
  }
}

NoteForm.propTypes = {
  note: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    currentNote: PropTypes.shape({
      folderId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    success: PropTypes.string,
  }).isRequired,
  notes: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      folderId: PropTypes.number,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired,
  }).isRequired,
  tags: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      noteId: PropTypes.number,
      id: PropTypes.number,
      label: PropTypes.string
    })).isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  fetchAllTags: PropTypes.func.isRequired,
  updateNoteName: PropTypes.func.isRequired,
  updateSelectedNote: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};

NoteForm = reduxForm({
  form: 'noteForm',
  validate,
  enableReinitialize: true,
})(NoteForm);

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    id: state.note.currentNote.id,
    name: state.note.currentNote.name,
    tag: '',
    description: state.note.currentNote.description,
  },
  note: state.note,
  notes: state.notes,
  tags: state.tags,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...noteActions, ...notesActions, ...tagActions}, dispatch);
};

const NoteFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteForm);

export default NoteFormContainer;
