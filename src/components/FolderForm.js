import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import './css/CreateFolderForm.css';

const validate = (value) => {
  let error = '';
  if(!value) {
    error = 'Required';
  } else if(value && value.length > 15) {
    error = 'Must be 15 characters or less!';
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
      handleSubmit,
      handleClose,
      createSymbol = '+',
      closeSymbol = 'X',
      valid,
      reset
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
            validate={[validate]}/>{' '}
          <span className="NewFolder Cancel" onClick={() => handleClose(reset)}>{closeSymbol}</span>{' '}
          <input
            className="NewFolder Save"
            type="submit"
            value={createSymbol}
            disabled={!valid}/>
        </form>
      </div>
    );
  }
}

FolderForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  defaultValue: React.PropTypes.string,
  createSymbol: React.PropTypes.string,
  closeSymbol: React.PropTypes.string,
};

FolderForm = reduxForm({
  form: 'folder',
})(FolderForm);

export default FolderForm;
