import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';

const validate = (value, props) => {
  const error = {};
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 18) {
    error.name = 'Must be 18 characters or less!';
  } else if(
    props.folders.some(folder => (
      (folder.name === value.name.trim() && folder.id !== value.id) ||
      folder.notes.some(
        note => note && note.name !== 'New Note' && note.name === value.name.trim() && note.id !== value.id
      )
    ))
  ) {
    error.name = 'This name is already taken!'
  }
  props.handleBlocking(error.name);
  return error;
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      touched,
      error
    },
    changeNoteName,
    changeDescription,
    ...custom
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
      onChange={(event) => {
        const value = event.target.value;
        changeNoteName && changeNoteName(value);
        changeDescription && changeDescription(value);
      }}
    />
  );
};

const renderTextFieldForTags = (field) => {
  const {
    input,
    placeholder,
    addTag
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      {...input}
      onKeyDown={(event) => {
        const label = event.target.value;
        if(addTag && event.keyCode === 13) {
          event.preventDefault();
          addTag(label);
          input.onChange('');
        }
      }}
    />
  );
};

class NoteForm extends Component {
  handleRequestDelete = (key) => {
    const {removeTag} = this.props;
    removeTag(key);
  };
  renderChip = (data) => {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={{margin: 5}}
      >
        {data.label}
      </Chip>
    );
  };
  render() {
    const {changeNoteName, tags, addTag, changeDescription} = this.props;
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
            name="tags"
            placeholder="Tags..."
            addTag={addTag}
            component={renderTextFieldForTags}/><br/>
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
  folders: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  changeNoteName: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  enableReinitialize: true,
  validate,
})(NoteForm);
