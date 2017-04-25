import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import DoneAction from 'material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';

const validate = (value, props) => {
  const error = {};
  const {folderId, noteId} = props.params;
  if(!value.name) {
    error.name = 'The "Name" field is Required!';
  } else if(value.name && value.name.length > 18) {
    error.name = 'The "Name" field must be 18 characters or less!';
  } else if(
    props.notes.some(
      note => note && note.folderId === Number.parseInt(folderId, 10)
                   && note.id !== value.id
                   && note.name !== 'New Note'
                   && note.name === value.name.trim()
    )
  ) {
    error.name = 'This name is already taken!';
  }
  if(
    value.tags.some(
      tag => tag && tag.noteId === Number.parseInt(noteId, 10)
                 && tag.label === value.tag
    )
  ) {
    error.tag = 'This tag is already taken!';
  }
  props.handleBlocking({
    error: error,
    isFormChanged: props.dirty || !props.isPristine ? 'You have unsaved data!' : '',
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
    initialName,
    initialDescription,
    changeNoteName,
    tags,
    addTag,
    setPristine,
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
            if(
                (input.name === 'name' && input.value === initialName) ||
                (input.name === 'description' && input.value === initialDescription)
            ) {
              setPristine(false);
            }
            if(
                (input.name === 'name' && value === initialName) ||
                (input.name === 'description' && value === initialDescription)
            ) {
              setPristine(true);
            }
            input.onChange(value);
            changeNoteName && changeNoteName(value);
          }}
        /> :
        <TextField
          hintText={placeholder}
          floatingLabelText={placeholder}
          errorText={error}
          {...input}
          {...custom}
          onKeyDown={(event) => {
            const value = event.target.value;
            if(value === '') {
              setPristine(false);
            }
            if(!error && addTag && event.keyCode === 13) {
              event.preventDefault();
              addTag(value);
              input.onChange('');
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
      this.props.setPristine(true);
      this.props.fetchNoteById(nextProps.params);
      this.props.fetchAllTags(nextProps.params.noteId);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleDeleteTag = (id) => {
    const {initialValues: {tags}} = this.props;

  };
  renderChip = (tag) => {
    const {params: {noteId}} = this.props;
    return (
      <div key={tag.label}>
        {tag.noteId === Number.parseInt(noteId, 10) &&
          <Chip
            onRequestDelete={() => this.handleDeleteTag(tag.label)}
            style={{margin: 5}}
          >
            {tag.label}
          </Chip>}
      </div>
    );
  };
  render() {
    const {
      isPristine,
      setPristine,
      noteOptions: {isUpdating, successMsg, errorMsg},
      invalid,
      pristine,
      submitting,
      handleSubmit,
      changeNoteName,
      initialValues: {tags, name, description},
      addTag,
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <form>
          <Field
            name="name"
            placeholder="Name"
            initialName={name}
            setPristine={setPristine}
            changeNoteName={changeNoteName}
            component={renderTextField}/><br/>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{display: 'flex', flexWrap: 'wrap'}}
          >
            {tags.map(this.renderChip)}
          </ReactCSSTransitionGroup>
          <Field
            name="tag"
            placeholder="Tag..."
            tags={tags}
            addTag={addTag}
            setPristine={setPristine}
            normalize={(value) => value.toUpperCase()}
            component={renderTextField}/><br/>
          <Field
            name="description"
            placeholder="Description..."
            initialDescription={description}
            setPristine={setPristine}
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
              disabled={isUpdating || invalid || isPristine || submitting}
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
  /*tags: PropTypes.arrayOf(PropTypes.shape({
    noteId: PropTypes.number,
    id: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,*/
  tagOptions: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    folderId: PropTypes.string.isRequired,
    noteId: PropTypes.string.isRequired,
  }).isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string,
  }).isRequired,
  handleBlocking: PropTypes.func.isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  fetchAllTags: PropTypes.func.isRequired,
  changeNoteName: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(NoteForm);
