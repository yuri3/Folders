import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Loading from './Loading';

const style = {
  alignSelf: 'flex-end',
};

const validate = (value, props) => {
  const error = {};
  if(!props.dirty) {return;}
  if(value.name && value.name.length > 18) {
    error.name = 'The folder name must be from 1 to 18 characters!';
  } else if(props.folders.some(folder => !folder.parentId && folder.name === value.name.trim())) {
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
      }}
    />
  );
};

class CreateFolderForm extends Component {
  componentDidUpdate(prevProps) {
    if(this.props.folders.length > prevProps.folders.length) {
      const {handleClose} = this.props;
      handleClose();
    }
  }
  render() {
    const {
      isCreating,
      handleSubmit,
      handleClose,
      invalid,
      pristine,
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
            {isCreating &&
              <div style={style}>
                <Loading />
              </div>
            }
            {!isCreating && <IconButton
              tooltip="SAVE"
              style={style}
              disabled={!!invalid || !!pristine}
              onTouchTap={handleSubmit}><SaveIcon/>
            </IconButton>}
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
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isCreating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'createFolderForm',
  validate,
})(CreateFolderForm);
