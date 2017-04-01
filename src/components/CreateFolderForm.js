import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
//import validate from './syncValidate';

const style = {
  alignSelf: 'flex-end',
};

const validate = (value, props) => {
  const error = {};
  if(!value.name) {
    error.name = 'Required';
  } else if(value.name && value.name.length > 18) {
    error.name = 'Must be 18 characters or less!';
  } else if(props.folders.some(folder => folder.name === value.name.trim())) {
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
    handleSubmit,
    handleClose,
    ...custom
  } = field;
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
      onKeyDown={(event) => {
        if(event.keyCode === 13) {
          event.preventDefault();
          handleSubmit(event);
        }
        if(event.keyCode === 27) {
          handleClose();
        }
      }}
    />
  );
};

class CreateFolderForm extends Component {
  render() {
    const {
      handleSubmit,
      handleClose,
      invalid
    } = this.props;
    return (
      <div>
        <form>
          <div style={{display: 'flex',}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              handleSubmit={handleSubmit}
              handleClose={handleClose}
              style={{width: '200px'}}
              component={renderTextField}/>
            <IconButton
              tooltip="SAVE"
              style={style}
              disabled={!!invalid}
              onTouchTap={handleSubmit}><SaveIcon/>
            </IconButton>
            <IconButton
              tooltip="CLOSE"
              style={style}
              onTouchTap={handleClose}><CloseIcon/>
            </IconButton>
          </div>
        </form>
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'createFolderForm',
  validate,
})(CreateFolderForm);
