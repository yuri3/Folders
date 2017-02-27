import React from 'react';
import './css/CreateFolderForm.css';

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInput: false,
      name: '',
    };
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.createFolder = this.createFolder.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState, props) => (
      {...prevState, isInput: !prevState.isInput, name: ''}
    ));
  };
  handleChange(event) {
    this.setState({name: event.target.value});
  };
  handleEnter(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.createFolder();
    }
  };
  createFolder() {
    const foldersName = this.state.name.trim();
    if(!foldersName) {return;}
    this.switchCreateInput();
    this.props.createFolder(undefined, foldersName);
  }
  render() {
    const {title} = this.props;
    const {isInput} = this.state;
    return (
      <div>
        {title ? <span><strong>{title}</strong>{' '}
            <span className="NewFolder Create"
                  onClick={this.switchCreateInput}>+</span><br/>
          </span> :
          <span className="NewFolder Create"
                onClick={this.switchCreateInput}>+</span>
        }
        {isInput && <form>
          <label>
            <input type="text" placeholder="Name"
                   ref={(input) => input && input.focus()}
                   onChange={this.handleChange}
                   onKeyDown={this.handleEnter} />{' '}
            <span className="NewFolder Save"
                  onClick={this.createFolder}>+</span>{' '}
            <span className="NewFolder Cancel" onClick={this.switchCreateInput}>X</span>
          </label>
        </form>}
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  title: React.PropTypes.string,
  createFolder: React.PropTypes.func.isRequired,
};

export default CreateFolderForm;
