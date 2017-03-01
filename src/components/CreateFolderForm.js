import React from 'react';
import './css/CreateFolderForm.css';
import FolderForm from './FolderForm';

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false};
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  switchCreateInput() {
    /*const {options, selectCreateInput, selectRenameInput} = this.props;
    (!options.isSelected) ? selectCreateInput(true) : selectCreateInput(false);
    if(options.renameId) {selectRenameInput(null);}*/
    this.setState((prevState) => ({
      ...prevState, isSelected: !prevState.isSelected,
    }));
  }
  handleClose(reset) {
    reset();
    this.switchCreateInput();
  }
  handleSubmit = (values) => {
    const {title, create} = this.props;
    if(title === 'FOLDERS') {
      const {name} = values;
      this.switchCreateInput();
      create(undefined, name);
    } else if(title === 'NOTES') {
      create();
    }
  };
  render() {
    const {folders, options, title, defaultValue, createSymbol, closeSymbol} = this.props;
    //const {isSelected} = options;
    const {isSelected} = this.state;
    return (
      <div>
        {title ?
          <span>
            <strong>{title}</strong>{' '}
            <span
              className="NewFolder Create"
              onClick={title !== 'NOTES' ? this.switchCreateInput : this.handleSubmit}>
              +
            </span><br/>
          </span> :
          <span
            className="NewFolder Create"
            onClick={title !== 'NOTES' ? this.switchCreateInput : this.handleSubmit}>+</span>}
        {isSelected &&
          <FolderForm
            folders={folders}
            onSubmit={this.handleSubmit}
            title={title}
            handleClose={this.handleClose}
            defaultValue={defaultValue}
            createSymbol={createSymbol}
            closeSymbol={closeSymbol}/>}
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  folders: React.PropTypes.array.isRequired,
  create: React.PropTypes.func.isRequired,
  options: React.PropTypes.object.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  selectCreateInput: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  createSymbol: React.PropTypes.string,
  closeSymbol: React.PropTypes.string,
};

export default CreateFolderForm;
