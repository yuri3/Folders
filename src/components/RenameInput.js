import React from 'react';
import FolderForm from './FolderForm';

class RenameInput extends React.Component {
  handleSubmit = (values) => {
    const {folder, renameFolder} = this.props;
    const {name} = values;
    if(!name) {return;}
    renameFolder(folder.id, name.trim());
    this.handleClose();
  };
  handleClose = () => {
    const {selectRenameInput} = this.props;
    selectRenameInput(null);
  };
  render() {
    const {folder} = this.props;
    return (
      <FolderForm
        onSubmit={this.handleSubmit}
        handleClose={this.handleClose}
        title="Rename"
        defaultValue={folder.name}
        createSymbol={'+'}
        closeSymbol={'<--'}/>
    );
  }
}

RenameInput.propTypes = {
  folder: React.PropTypes.object.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
};

export default RenameInput;
