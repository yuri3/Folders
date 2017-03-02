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
  } else if(title !== 'NOTES' && folders.some((folder) => value && folder.name === value.trim())) {
    error = 'This name is already taken!'
  }
  return error;
};

const renderTextField = (field) => {
  const {
    defaultValue,
    input,
    placeholder,
    meta: {
      touched,
      dirty,
      error,
    },
    ...custom
  } = field;
  return (
    <TextField
      autoFocus
      hintText={placeholder}
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
      value={defaultValue}
      onChange={(event) => input.onChange(event)}/>
  );
};

class FolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  render() {
    const {
      folders,
      handleSubmit,
      handleClose,
      title,
      createSymbol = '+',
      closeSymbol = 'X',
      reset,
      invalid,
    } = this.props;
    const {value} = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            defaultValue={value}
            onChange={this.handleChange}
            component={renderTextField}
            validate={[(v) => validate(v, folders, title)]}/>{' '}
          <span className="NewFolder Cancel" onClick={() => handleClose(reset)}>{closeSymbol}</span>{' '}
          <input
            className="NewFolder Save"
            type="submit"
            value={createSymbol}
            disabled={invalid}/>
        </form>
      </div>
    );
  }
}

FolderForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
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
