import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Loading from '../components/Loading';

const style = {
  alignSelf: 'flex-end',
};

const validate = (value, props) => {
  const error = {};
  if(!value.name) {
    error.name = 'The folder name is Required!';
  } else if(value.name && value.name.length > 18) {
    error.name = 'The folder name must be from 1 to 18 characters!';
  } else if(
    props.folders.some(folder =>
      folder.id !== value.id &&
      !folder.parentId && !value.parentId && folder.name === value.name.trim()
    )
  ) {
    error.name = 'This name is already taken!'
  } else if(
    props.folders.some(folder => (
      folder.id !== value.id && folder.parentId && value.parentId === folder.parentId &&
      folder.name !== 'New Folder' && folder.name === value.name.trim()
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

class RenameFolderForm extends Component {
  render() {
    const {
      isRenaming,
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
            {isRenaming &&
              <div style={style}>
                <Loading />
              </div>
            }
            {!isRenaming && <IconButton
              tooltip="Save"
              style={style}
              disabled={!!invalid || !!pristine}
              onTouchTap={handleSubmit}><SaveIcon/>
            </IconButton>}
          </div>
        </form>
      </div>
    );
  }
}

RenameFolderForm.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isRenaming: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    parentId: PropTypes.number,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default props => {
  const Form = reduxForm({
    form: 'renameFolderForm' + props.initialValues.name,
    validate,
  })(RenameFolderForm);
  return <Form {...props}/>;
}
