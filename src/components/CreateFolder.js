import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import CreateFolderForm from './CreateFolderForm';

const style = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px 0 12px',
};

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
    const {folders, options, createNewFolder} = this.props;
    const {name} = values;
    createNewFolder(undefined, name, folders.length);
    !options.isCreating && this.switchCreateInput();
  }
  render() {
    const {folders} = this.props;
    const {isSelected} = this.state;
    return (
      <div>
        <div style={style}>
          <strong style={{marginRight: '30px'}}>{'FOLDERS'}</strong>
          <IconButton
            style={{width: '72px', height: '72px', zIndex: 1}}
            iconStyle={{width: '36px', height: '36px'}}
            tooltip="CREATE NEW FOLDER"
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
  options: PropTypes.object.isRequired,
  createNewFolder: PropTypes.func.isRequired,
};

export default CreateFolder;
