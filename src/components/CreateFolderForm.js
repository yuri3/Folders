import React from 'react';
import { Field, reduxForm } from 'redux-form';
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

const renderField = (field) => {
  const {
    input,
    type,
    placeholder,
    label,
    meta: {
      touched,
      error,
    }
  }= field;
  return (
    <span>
      <label>
        <input {...input} type={type} placeholder={placeholder} autoFocus/>
        {touched && error && <div>{error}</div>}
      </label>
    </span>
  );
};

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInput: false,};
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState, props) => (
      {...prevState, isInput: !prevState.isInput}
    ));
  }
  handleEnter(event) {
    if(event.keyCode === 13) {
      this.createFolder(event);
    }
  }
  createFolder(event) {
    event.preventDefault();
    const {handleSubmit} = this.props;
    handleSubmit();
    this.switchCreateInput();
  };
  render() {
    const {title, valid} = this.props;
    const {isInput} = this.state;
    return (
      <div>
        {title ? <span><strong>{title}</strong>{' '}
          <span className="NewFolder Create"
                onClick={this.switchCreateInput}>+</span><br/></span> :
          <span className="NewFolder Create"
                onClick={this.switchCreateInput}>+</span>}
        {isInput && <form onSubmit={this.createFolder}>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            onKeyDown={this.handleEnter}
            component={renderField}
            validate={[validate]}/>{' '}
          <input
            className="NewFolder Save"
            type="submit"
            value="+"
            disabled={!valid}/>{' '}
          <span
            className="NewFolder Cancel"
            onClick={this.switchCreateInput}>X</span>
        </form>}
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  title: React.PropTypes.string,
  createFolder: React.PropTypes.func,
};

CreateFolderForm = reduxForm({
  form: 'folder',
  //validate,
})(CreateFolderForm);

export default CreateFolderForm;
