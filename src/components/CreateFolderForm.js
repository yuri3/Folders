import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'

const validate = (value, props) => {
  let error = {};
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 18) {
    error.name = 'Must be 18 characters or less!';
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

class CreateFolderForm extends Component {
  render() {
    const {
      handleSubmit,
      handleClose,
      invalid
    } = this.props;
    const saveStyle = {
      alignSelf: 'flex-end',
      opacity: invalid ? 0.5 : 1,
      pointerEvents: invalid ? 'none' : 'auto',
    };
    return (
      <div>
        <form>
          <div style={{display: 'flex',}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              component={renderTextField}/>{' '}
            <span style={saveStyle} onClick={handleSubmit}>
              <i className="material-icons md-36">save</i>
            </span>
            <span style={{alignSelf: 'flex-end',}} onClick={handleClose}>
              <i className="material-icons md-36">close</i>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  folders: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'createFolderForm',
  validate,
})(CreateFolderForm);
