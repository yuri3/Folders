import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';

const validate = (value, props) => {
  const error = {};
  const {folderId, noteId} = props.params;
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 18) {
    error.name = 'Must be 18 characters or less!';
  } else if(
    props.notes.some(
      note => note && note.parentFolderId === folderId && note.id !== value.id
                   && note.name !== 'New Note'
                   && note.name === value.name.trim()
    )
  ) {
    error.name = 'This name is already taken!';
  } else if(
    props.tags.some(
      tag => tag && tag.parentNoteId === noteId && tag.label === value.tag
    )
  ) {
    error.tag = 'This tag is already taken!';
  }
  props.handleBlocking(error.name);
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
    changeDescription,
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
            changeNoteName && changeNoteName(value);
            changeDescription && changeDescription(value);
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
  handleRequestDelete = (key) => {
    const {removeTag} = this.props;
    removeTag(key);
  };
  renderChip = (tag) => {
    const {params: {noteId}} = this.props;
    return (
      <div key={tag.key}>
        {tag.parentNoteId === noteId && <Chip
          onRequestDelete={() => this.handleRequestDelete(tag.key)}
          style={{margin: 5}}
        >
          {tag.label}
        </Chip>}
      </div>
    );
  };
  render() {
    const {
      changeNoteName,
      tags,
      addTag,
      changeDescription
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
            {tags.map(this.renderChip)}
          </ReactCSSTransitionGroup>
          <Field
            name="tag"
            placeholder="Tag..."
            addTag={addTag}
            normalize={(value) => value.toUpperCase()}
            component={renderTextField}/><br/>
          <Field
            name="description"
            placeholder="Description..."
            multiLine={true}
            rows={2}
            fullWidth={true}
            changeDescription={changeDescription}
            component={renderTextField}/>
        </form>
      </div>
    );
  }
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    parentNoteId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  params: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  changeNoteName: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  enableReinitialize: true,
  validate,
})(NoteForm);
