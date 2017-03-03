import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import './css/CreateForm.css';

const validate = (value, folders, title = '') => {
  let error = '';
  if(!value) {
    error = 'Required';
  } else if(value && value.length > 15) {
    error = 'Must be 15 characters or less!';
  } //else if(title !== 'NOTES' && folders.some((folder) => value && folder.name === value.trim())) {
    //error = 'This name is already taken!'
  //}
  return error;
};

const renderTextField = (field) => {
  const {
    input,
    placeholder,
    meta: {
      touched,
      //dirty,
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

class FolderForm extends React.Component {
  render() {
    const {
      folders,
      handleSubmit,
      defaultValue,
      handleClose,
      title,
      multiLine,
      rows,
      showSymbols,
      createSymbol,
      closeSymbol,
      reset,
      invalid,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            format={(value = defaultValue) => value}
            multiLine={multiLine}
            rows={rows}
            component={renderTextField}
            validate={[(v) => validate(v, folders, title)]}/>{' '}
          {showSymbols && <span>
            <span className="NewFolder Cancel" onClick={() => handleClose(reset)}>{closeSymbol}</span>{' '}
            <input
              className="NewFolder Save"
              type="submit"
              value={createSymbol}
              disabled={invalid}/></span>}
        </form>
      </div>
    );
  }
}

FolderForm.defaultProps = {
  title: '',
  defaultValue: '',
  multiLine: false,
  rows: 1,
  showSymbols: true,
  createSymbol: '+',
  closeSymbol: 'X',
};

FolderForm.propTypes = {
  onSubmit: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  title: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  multiLine: React.PropTypes.bool,
  rows: React.PropTypes.number,
  showSymbols: React.PropTypes.bool,
  createSymbol: React.PropTypes.string,
  closeSymbol: React.PropTypes.string,
};

FolderForm = reduxForm({
  form: 'folder',
})(FolderForm);

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
});

FolderForm = connect(
  mapStateToProps,
)(FolderForm);

export default FolderForm;
