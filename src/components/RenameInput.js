import React from 'react';

class RenameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renameInput: this.props.folder.name,
    }
  }
  handleChange = (event) => {
    this.setState({renameInput: event.target.value});
  };
  handleEnter = (event) => {
    if(event.keyCode === 13) {
      this.renameFolder();
    }
  };
  renameFolder = () => {
    const {folder, renameFolder} = this.props;
    const newName = this.state.renameInput;
    if(!newName.trim()) {return;}
    renameFolder(folder.id, newName);
    this.closeRenameInput();
  };
  closeRenameInput = () => {
    const {selectRenameInput} = this.props;
    selectRenameInput(null);
  };
  render() {
    return (
      <div>
        <input
          type="text"
          ref={input => input && input.focus()}
          value={this.state.renameInput}
          onChange={this.handleChange}
          onKeyDown={this.handleEnter} />{' '}
        <span onClick={this.closeRenameInput}>{'<--'}</span>{' '}
        <span onClick={this.renameFolder}>+</span>
      </div>
    );
  }
}

RenameInput.propTypes = {
  folder: React.PropTypes.object.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
};

export default RenameInput;