import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { FOLDER_STATUS } from '../actions/actions';
import './css/Folder.css';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renameInput: this.props.folder.name,
    }
  }
  componentDidMount() {
    if(this.props.status === FOLDER_STATUS.IS_CREATE_DONE) {
      this.folder.querySelector('a').click();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(
        nextProps.status === FOLDER_STATUS.IS_REMOVE_DONE && 
        nextProps.params.folderId === nextProps.folder.name
      ) {
      nextProps.params.folderId = '';
      this.props.onSetStatusClick('');
    }
  }
  handleSelectFolder = (id) => {
    const {switchRenameInput} = this.props;
    switchRenameInput(id);
  }
  handleEnter = (event) => {
    if(event.keyCode === 13) {
      this.renameFolder();
    }
  }
  closeSelectedFolder = () => {
    const {switchRenameInput} = this.props;
    switchRenameInput(null);
  }
  renameFolder = () => {
    const {folder, renameFolder} = this.props;
    const newName = this.state.renameInput;
    if(!newName.trim()) {return;}
    renameFolder(folder.id, newName);
    this.closeSelectedFolder();
  }
  removeFolder = (folder) => {
    this.props.onRemoveFolderClick(folder.id);
    this.props.onSetStatusClick(FOLDER_STATUS.IS_REMOVE_DONE);
  }
  handleChange = (event) => {
    this.setState({renameInput: event.target.value});
  }
  render() {
    const {folder, folderId, selected} = this.props;
    return (
      <li>
        {!selected && <div>
          <div className="parentFolder" ref={(folder) => this.folder = folder}>
            {folderId === folder.name ?
              folder.name :
              <Link to={"/" + folder.name}>{folder.name}</Link>}
            <span className="Folder Create">+</span>
            <span className="Folder Remove" onClick={() => this.removeFolder(folder)}>X</span>
            <span className="Folder Rename" onClick={() => this.handleSelectFolder(folder.id)}>/</span>
          </div>
          {folder.subfolders ? (
            <ul style={{listStyleType: 'none'}}>
              {folder.subfolders.map((subFolder) => (
                <Folder key={subFolder.id} folder={subFolder}
                        onSetStatusClick={this.props.onSetStatusClick}
                        onIsRenameClick={this.props.onIsRenameClick}
                        onIsRenameCancelClick={this.props.onIsRenameCancelClick}
                        onRenameFolderClick={this.props.onRenameFolderClick}
                        onRemoveFolderClick={this.props.onRemoveFolderClick} />
              ))}
            </ul>
          ) : ''}
        </div>}
        {selected && <div>
          <input 
            type="text"
            ref={input => input && input.focus()}
            value={this.state.renameInput} 
            onChange={this.handleChange}
            onKeyDown={this.handleEnter} />{' '}
          <span onClick={this.closeSelectedFolder}>{'<--'}</span>{' '}
          <span onClick={this.renameFolder}>+</span>
        </div>}
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

Folder = connect(
  undefined,
  mapDispatchToProps,
)(Folder);

export default Folder;
