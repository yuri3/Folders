import React, { PropTypes, Component } from 'react';
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
      note => note && note.folderId === folderId && note.id !== value.id
                   && note.name !== 'New Note'
                   && note.name === value.name.trim()
    )
  ) {
    error.name = 'This name is already taken!';
  }
  /*if(
    props.tags.some(
      tag => tag && tag.noteId === noteId && tag.label === value.tag
    )
  ) {
    error.tag = 'This tag is already taken!';
  }*/
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
          hintText={placeholder}
          floatingLabelText={placeholder}
          errorText={error}
          {...input}
          {...custom}
          onKeyDown={(event) => {
            const value = event.target.value;
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
    const {submitSucceeded, options: {successMsg, errorMsg}, resetMessages} = this.props;
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
  handleRequestDelete = (key) => {
    const {removeTag} = this.props;
    removeTag(key);
  };
  renderChip = (tag) => {
    const {params: {noteId}} = this.props;
    return (
      <div key={tag.id}>
        {tag.noteId === noteId &&
          <Chip
            onRequestDelete={() => this.handleRequestDelete(tag.id)}
            style={{margin: 5}}
          >
            {tag.label}
          </Chip>}
      </div>
    );
  };
  render() {
    const {
      options: {isUpdating, successMsg, errorMsg},
      invalid,
      pristine,
      submitting,
      handleSubmit,
      changeNoteName,
      //tags,
      //addTag,
    } = this.props;
    return (
      <div>
        <form>
          <Field
            name="name"
            placeholder="Name"
            changeNoteName={changeNoteName}
            component={renderTextField}/><br/>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{display: 'flex', flexWrap: 'wrap'}}
          >

          </ReactCSSTransitionGroup>
          <Field
            name="tag"
            placeholder="Tag..."
            //addTag={addTag}
            normalize={(value) => value.toUpperCase()}
            component={renderTextField}/><br/>
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
//{tags.map(this.renderChip)}
NoteForm.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    folderId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  options: PropTypes.shape({
    isUpdating: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
  }).isRequired,
  /*tags: PropTypes.arrayOf(PropTypes.shape({
    noteId: PropTypes.number,
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
  })).isRequired,*/
  params: PropTypes.shape({
    folderId: PropTypes.string.isRequired,
    noteId: PropTypes.string.isRequired,
  }).isRequired,
  handleBlocking: PropTypes.func.isRequired,
  fetchNoteById: PropTypes.func.isRequired,
  changeNoteName: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  //addTag: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  //enableReinitialize: true,
  validate,
})(NoteForm);
