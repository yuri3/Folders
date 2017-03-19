import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import SaveIcon from 'material-ui/svg-icons/content/save';
import validate from './syncValidate';

const style = {
  alignSelf: 'flex-end',
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      dirty,
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
      errorText={dirty && error}
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
      }}/>
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
    return (
      <div>
        <form>
          <div style={{display: 'flex'}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              style={{width: '200px'}}
              handleSubmit={handleSubmit}
              handleClose={handleClose}
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

export default props => {
  const Form = reduxForm({
    form: 'renameFolderForm' + props.initialValues.name,
    validate,
  })(RenameFolderForm);
  return <Form {...props}/>;
}
