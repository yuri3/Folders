import React from 'react';
import CreateFolderForm from './CreateFolderForm';

class CreateFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false};
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState) => ({
      ...prevState, isSelected: !prevState.isSelected,
    }));
  }
  handleClose() {
    this.switchCreateInput();
  }
  handleSubmit(values) {
    const {createFolder} = this.props;
    const {name} = values;
    this.switchCreateInput();
    createFolder(undefined, name);
  }
  render() {
    const {folders} = this.props;
    const {isSelected} = this.state;
    return (
      <div>
        <strong>{'FOLDERS'}</strong>{' '}
        <span className="NewFolder Create" onClick={this.switchCreateInput}>+</span><br/>
        {isSelected &&
          <CreateFolderForm
            folders={folders}
            onSubmit={this.handleSubmit}
            handleClose={this.handleClose}/>}
      </div>
    );
  }
}

CreateFolder.propTypes = {
  folders: React.PropTypes.array.isRequired,
  createFolder: React.PropTypes.func.isRequired,
};

export default CreateFolder;
