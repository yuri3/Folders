import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//import { Prompt } from 'react-router-dom';
import TextField from 'material-ui/TextField'

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
        changeNoteName && changeNoteName(event.target.value);
      }}/>
  );
};

class NoteForm extends Component {
  render() {
    const {changeNoteName} = this.props;
    return (
      <div>
        <form>
          <Field
            name="name"
            placeholder="Name"
            changeNoteName={changeNoteName}
            component={renderTextField}/><br/>
          <Field
            name="notes"
            placeholder="Notes"
            multiLine={true}
            rows={2}
            fullWidth={true}
            component={renderTextField}/>
        </form>
      </div>
    );
  }
}

NoteForm.propTypes = {
  folders: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  changeNoteName: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'noteForm',
  enableReinitialize: true,
  validate,
})(NoteForm);
