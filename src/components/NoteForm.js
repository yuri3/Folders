import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Prompt } from 'react-router-dom';
import TextField from 'material-ui/TextField'

const validate = (value, props) => {
  //if(!props.dirty) {return;}
  let error = {};
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 18) {
    error.name = 'Must be 18 characters or less!';
  } else if(// it does not work correctly!!!
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
      error
    },
    handleBlocking,
    changeNoteName,
    ...custom
  } = field;
  console.log('error', error);
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
      onChange={(event) => {
        const value = event.target.value;
        input.onChange(value);
        handleBlocking && handleBlocking(error);
        changeNoteName && changeNoteName(value);
      }}/>
  );
};

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {isBlocking: false, errorMessage: ''};
    this.handleBlocking = this.handleBlocking.bind(this);
  }
  handleBlocking(error) {
    this.setState({isBlocking: !!error, errorMessage: error ? error : ''});
  }
  componentWillReceiveProps(nextProps) {
    const {params, initialize} = this.props;
    if(params && params.noteId !== nextProps.params.noteId) {
      this.handleBlocking('');
      initialize(nextProps.initialValues);
    }
  }
  render() {
    const {isBlocking, errorMessage} = this.state;
    const {changeNoteName} = this.props;
    return (
      <div>
        <form>
          <Prompt
            when={isBlocking}
            message={location => (`
              There is an Error "${errorMessage}"!!!
              Are you sure you want to go to ${location.pathname}?
              If Ok. the Note's name will be set to default Name "New Note."`
            )}/>
          <Field
            name="name"
            placeholder="Name"
            handleBlocking={this.handleBlocking}
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
  //destroyOnUnmount: false,
  //forceUnregisterOnUnmount: true,
  //enableReinitialize: true,
  //keepDirtyOnReinitialize: true,
  validate,
})(NoteForm);
