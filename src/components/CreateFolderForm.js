import React from 'react';
import { STATUS } from '../actions/actions';
import './css/CreateFolderForm.css';

class CreateFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInput: false};
    this.createFolder = this.createFolder.bind(this);
  }
  switchInput = () => {
    this.input.value = '';
    this.setState((prevState, props) => (
      {...prevState, isInput: !prevState.isInput}
    ));
  }
  createFolder(event) {
    const value = this.input.value.trim();
    if(!value) {return;}
    this.switchInput();
    this.props.onCreateFolderClick(this.props.lastId + 1, value);
    this.props.onSetStatus(STATUS.IS_CREATE_DONE);
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.isInput) {
      this.input.focus();
    }
  }
  render() {
    return (
      <div>
        <strong>FOLDERS</strong>{' '}
         <span className="NewFolder Create"
               onClick={this.switchInput}>+</span><br/>
        <form style={{display: this.state.isInput ? 'inline' : 'none'}}>
          <label>
            <input type="text" placeholder="Title"
                   ref={(input) => this.input = input}/>{' '}
            <span className="NewFolder Save"
                  onClick={this.createFolder}>+</span>{' '}
            <span className="NewFolder Cancel" onClick={this.switchInput}>X</span>
          </label>
        </form>
      </div>
    );
  }
}

CreateFolderForm.propTypes = {
  lastId: React.PropTypes.number.isRequired,
  createFolder: React.PropTypes.func.isRequired
};

export default CreateFolderForm;
