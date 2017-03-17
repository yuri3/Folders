import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
//import styles from '../IconStyles';
import CreateFolderForm from './CreateFolderForm';

class CreateFolder extends Component {
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
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '30px'}}><strong>{'FOLDERS'}</strong></div>
          <IconButton
            tooltip="Create New Folder"
            onTouchTap={this.switchCreateInput}><CreateNewFolderIcon/>
          </IconButton>
        </div>
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
  folders: PropTypes.array.isRequired,
  createFolder: PropTypes.func.isRequired,
};

export default CreateFolder;
