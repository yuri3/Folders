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
      folder.name === value.name.trim() //||
      //folder.notes.some(note => note && note.name !== 'New Note' && note.name === value.name.trim())
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
      valid,
    },
    changeNoteName
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      onChange={(event) => {
        input.onChange(event.target.value);
        changeNoteName && valid && changeNoteName(event.target.value);
      }}/>
  );
};

class NoteForm extends React.Component {
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
            component={renderTextField}/>
        </form>
      </div>
    );
  }
}

NoteForm.defaultProps = {
  initialValues: {name: '', notes: ''},
};

NoteForm.propTypes = {
  folders: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
  changeNoteName: React.PropTypes.func.isRequired,
  initialValues: React.PropTypes.object,
};

export default reduxForm({
  form: 'noteForm',
  enableReinitialize: true,
  validate,
})(NoteForm);
