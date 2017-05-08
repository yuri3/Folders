import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import DoneAction from 'material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';
import Loading from './Loading';

const loadingStyle = {
  display: 'flex',
  alignItems: 'flex-end',
};

const validate = (value, props) => {
  const error = {};
  if(value.name === '' || value.name.length > 18) {
    error.name = 'The "Name" field must be from 1 to 18 characters!';
  } else if(
    props.notes.some(
      note => note && note.id !== value.id
                   && note.name !== 'New Note'
                   && note.name === value.name.trim()
    )
  ) {
    error.name = 'This name is already taken!';
  }
  if(props.tags.some(tag => tag && tag.label === value.tag)) {
    error.tag = 'This tag is already taken!';
  } else if(value.tag.length > 18) {
    error.tag = 'The "Tag" field has to be from 1 to 18 characters!';
  }
  props.handleBlocking({
    error: error,
    isFormChanged: props.dirty ? 'You have unsaved data!' : '',
  });
  return error;
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      error,
    },
    changeNoteName,
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
            changeNoteName && changeNoteName(value);
          }}
        /> :
        <TextField
          hintText={'Type in a tag and hit Enter.'}
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

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.timer = undefined;
    this.snackbarDuration = 5000;
  }
  componentDidUpdate() {
    const {
      submitSucceeded,
      noteOptions: {successMsg, errorMsg},
      resetMessages,
    } = this.props;
    if(submitSucceeded && (successMsg || errorMsg)) {
      this.timer = setTimeout(() => resetMessages(), this.snackbarDuration);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.noteId !== this.props.params.noteId) {
      this.props.fetchNoteById(nextProps.params);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  renderChip = (tag) => {
    const {deleteTag, params: {noteId}} = this.props;
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
  render() {
    const {
      noteOptions: {isUpdating, successMsg, errorMsg},
      invalid,
      pristine,
      submitting,
      handleSubmit,
      changeNoteName,
      tagOptions: {isCreating, isDeleting},
      tags,
      addTag,
    } = this.props;
    return (
      <div>
        <form>
          <Field
            name="name"
            placeholder="Name"
            changeNoteName={changeNoteName}
            component={renderTextField}/>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{display: 'flex', flexWrap: 'wrap'}}
          >
            {tags.map(this.renderChip)}
          </ReactCSSTransitionGroup>
          <div style={loadingStyle}>
            <Field
              name="tag"
              placeholder="Tag..."
              addTag={addTag}
              normalize={(value) => value.toUpperCase()}
              component={renderTextField}
            />
              {(isCreating || isDeleting) && <Loading/>}
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
              disabled={isUpdating || invalid || pristine || submitting}
              onTouchTap={handleSubmit}
            />
          </div>
          <Snackbar
            open={!!successMsg || !!errorMsg}
            message={successMsg || errorMsg}
            autoHideDuration={this.snackbarDuration}
            action={
              successMsg ?
                <i className="material-icons md-36">sentiment_very_satisfied</i> :
                <i className="material-icons md-36">sentiment_very_dissatisfied</i>
            }
            contentStyle={{color: successMsg ? 'dodgerblue' : 'red'}}
          />
        </form>
      </div>
    );
  }
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    folderId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  noteOptions: PropTypes.shape({
    isUpdating: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    noteId: PropTypes.number,
    id: PropTypes.number,
    label: PropTypes.string
  })).isRequired,
  tagOptions: PropTypes.shape({
    isCreating: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  handleBlocking: PropTypes.func.isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  changeNoteName: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  validate,
})(NoteForm);
