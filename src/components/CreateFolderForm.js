import React from 'react';
import { FOLDER_STATUS } from '../actions/actions';
import './css/CreateFolderForm.css';

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInput: false,
      title: '',
    };
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.createFolder = this.createFolder.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState, props) => (
      {...prevState, isInput: !prevState.isInput, title: ''}
    ));
  };
  handleChange(event) {
    this.setState({title: event.target.value});
  };
  handleEnter(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.createFolder();
    }
  };
  createFolder() {
    const foldersName = this.state.title.trim();
    if(!foldersName) {return;}
    this.switchCreateInput();
    this.props.createFolder(foldersName, foldersName);
    this.props.setStatus(FOLDER_STATUS.IS_CREATE_DONE);
  }
  render() {
    const {title} = this.props;
    return (
      <div>
        {title ?
          <span>
            <strong>{title}</strong>{' '}
            <span className="NewFolder Create"
                  onClick={this.switchCreateInput}>+</span><br/>
          </span>
          :
          <span className="NewFolder Create"
                onClick={this.switchCreateInput}>+</span>
        }
        <form style={{display: this.state.isInput ? 'inline' : 'none'}}>
          <label>
            <input type="text" placeholder="Title"
                   ref={(input) => input && input.focus()}
                   value={this.state.title}
                   onChange={this.handleChange}
                   onKeyDown={this.handleEnter} />{' '}
            <span className="NewFolder Save"
                  onClick={this.createFolder}>+</span>{' '}
            <span className="NewFolder Cancel" onClick={this.switchCreateInput}>X</span>
          </label>
        </form>
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  title: React.PropTypes.string,
  createFolder: React.PropTypes.func.isRequired,
  setStatus: React.PropTypes.func.isRequired,
};

export default CreateFolderForm;
