import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import SaveIcon from 'material-ui/svg-icons/content/save';

const style = {
  alignSelf: 'flex-end',
};

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
  handleEnter = (event) => {
    event.preventDefault();
    console.log(event.keyCode);
    if(event.keyCode === 13) {
      const {handleSubmit} = this.props;
      handleSubmit();
    }
  };
  render() {
    const {
      handleSubmit,
      handleClose,
      invalid,
      pristine
    } = this.props;
    return (
      <div>
        <form onSubmit={this.handleEnter}>
          <div style={{display: 'flex'}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              style={{width: '200px'}}
              component={renderTextField}/>
            <IconButton
              tooltip="Undo"
              style={style}
              onTouchTap={handleClose}><UndoIcon/>
            </IconButton>
            <IconButton
              tooltip="Save"
              style={style}
              disabled={!!invalid || !!pristine}
              onTouchTap={handleSubmit}><SaveIcon/>
            </IconButton>
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
  initialValues: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'renameFolderForm',
  validate,
})(RenameFolderForm);
