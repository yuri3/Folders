import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'

const validate = (value, props) => {
  let error = {};
  if(!props.dirty) {return;}
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
      dirty,
      error,
    },
    ...custom
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={dirty && error}
      {...input}
      {...custom}/>
  );
};

class RenameFolderForm extends Component {
  render() {
    const {
      handleSubmit,
      handleClose,
      invalid,
      pristine
    } = this.props;
    const saveStyle = {
      alignSelf: 'flex-end',
      opacity: invalid || pristine ? 0.5 : 1,
      pointerEvents: invalid || pristine ? 'none' : 'auto',
    };
    return (
      <div>
        <form>
          <div style={{display: 'flex'}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              style={{width: '200px'}}
              component={renderTextField}/>
            <span style={{alignSelf: 'flex-end'}} onClick={handleClose}>
              <i className="material-icons md-36">undo</i>
            </span>
            <span style={saveStyle} onClick={handleSubmit}>
              <i className="material-icons md-36">save</i>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

RenameFolderForm.propTypes = {
  folders: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'renameFolderForm',
  validate,
})(RenameFolderForm);
