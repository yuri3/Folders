import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import './css/FolderForm.css';

const validate = (value, props) => {
  let error = {};
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 15) {
    error.name = 'Must be 15 characters or less!';
  } else if(
    props.folders.some(folder => (
      folder.name === value.name.trim() ||
      folder.notes.some(note => note && note.name !== 'New Note' && note.name === value.name.trim())
    ))
  ) {
    error.name = 'This name is already taken!'
  }
  return error;
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      touched,
      error,
    },
    ...custom
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}/>
  );
};

class RenameFolderForm extends React.Component {
  render() {
    const {
      handleSubmit,
      handleClose,
      invalid
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            component={renderTextField}/>{' '}
          <span
            className="NewFolder Cancel"
            onClick={handleClose}>{'<--'}</span>{' '}
          <input
            className="NewFolder Save"
            type="submit"
            value='+'
            disabled={invalid}/>
        </form>
      </div>
    );
  }
}

RenameFolderForm.defaultProps = {
  initialValues: {name: ''},
};

RenameFolderForm.propTypes = {
  folders: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  initialValues: React.PropTypes.object,
};

export default reduxForm({
  form: 'renameFolderForm',
  validate,
})(RenameFolderForm);
