import React from 'react';
import './css/CreateFolderForm.css';
import FolderForm from './FolderForm';

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInput: false,};
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState, props) => (
      {...prevState, isInput: !prevState.isInput}
    ));
  }
  handleClose(reset) {
    reset();
    this.switchCreateInput();
  }
  handleSubmit = (values) => {
    const {name} = values;
    console.log('handleSubmit()', name);
    this.switchCreateInput();
    this.props.createFolder(undefined, name);
  };
  render() {
    const {title} = this.props;
    const {isInput} = this.state;
    return (
      <div>
        {title ? <span><strong>{title}</strong>{' '}
          <span className="NewFolder Create" onClick={this.switchCreateInput}>+</span><br/></span> :
          <span className="NewFolder Create" onClick={this.switchCreateInput}>+</span>}
        {isInput &&
          <FolderForm
            onSubmit={this.handleSubmit}
            handleClose={this.handleClose}
            defaultValue="Hello"
            createSymbol={'+'}
            closeSymbol={'X'}/>}
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  title: React.PropTypes.string,
  createFolder: React.PropTypes.func.isRequired,
};

export default CreateFolderForm;
