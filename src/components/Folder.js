

import React from 'react';
import { connect } from 'react-redux';
import { setStatus, isRename, isRenameCancel, renameFolder, removeFolder } from '../actions/actions';
import { STATUS } from '../actions/actions';
import { Link } from 'react-router';
import './css/Folder.css';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renameInput: this.props.folder.name,
    }
  }

  componentDidMount() {
    if(this.props.status === STATUS.IS_CREATE_DONE) {
      this.folder.querySelector('a').click();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(
        nextProps.status === STATUS.IS_REMOVE_DONE && 
        nextProps.params.folderId === nextProps.folder.name
      ) {
      nextProps.params.folderId = '';
      this.props.onSetStatusClick('');
    }
  }
  
  showRenameInput = (folder) => {
    if(this.props.status === STATUS.IS_RENAME) {
      this.closeRenameInput(folder);
    }

    if(this.props.status !== STATUS.IS_RENAME) {
      this.props.onSetStatusClick(STATUS.IS_RENAME);
    }
    
    this.props.onIsRenameClick(folder.id);
  }

  closeRenameInput = (folder) => {
    this.props.onIsRenameCancelClick();
    this.setState({renameInput: folder.name});
  }

  renameFolder = (folder) => {
    const newName = this.state.renameInput;
    if(!newName.trim()) {return;}
    this.props.onRenameFolderClick(folder.id, newName);
    this.props.onSetStatusClick(STATUS.IS_RENAME_DONE);
    this.closeRenameInput(folder);
  }

  removeFolder = (folder) => {
    this.props.onRemoveFolderClick(folder.id);
    this.props.onSetStatusClick(STATUS.IS_REMOVE_DONE);
  }

  handleChange = (event) => {
    this.setState({renameInput: event.target.value});
  }

  render() {
    const {folder, params} = this.props;
    return (
      <li>
        <div style={{display: folder.isRename ? 'none' : 'block'}}>
          {params.folderId === folder.name ? 
            <div className="parentFolder" style={{border: '1px solid red'}}>
              {folder.name}
              <span className="Folder Create">+</span>
              <span className="Folder Remove" onClick={() => this.removeFolder(folder)}>X</span>
              <span className="Folder Rename" onClick={() => this.showRenameInput(folder)}>/</span>
            </div>
            :
            <div className="parentFolder" ref={(folder) => this.folder = folder}>
              <Link to={"/" + folder.name}>{folder.name}</Link>
              <span className="Folder Create">+</span>
              <span className="Folder Remove" onClick={() => this.removeFolder(folder)}>X</span>
              <span className="Folder Rename" onClick={() => this.showRenameInput(folder)}>/</span>
            </div>}
          {folder.subfolders ? (
            <ul style={{listStyleType: 'none'}}>
              {folder.subfolders.map((subFolder) => (
                <Folder key={subFolder.id} folder={subFolder} params={params}
                        onSetStatusClick={this.props.onSetStatusClick}
                        onIsRenameClick={this.props.onIsRenameClick}
                        onIsRenameCancelClick={this.props.onIsRenameCancelClick}
                        onRenameFolderClick={this.props.onRenameFolderClick}
                        onRemoveFolderClick={this.props.onRemoveFolderClick} />
              ))}
            </ul>
          ) : ''}
        </div>
        <div style={{display: folder.isRename ? 'block' : 'none'}}>
          <input type="text" value={this.state.renameInput} onChange={this.handleChange} />{' '}
          <span onClick={() => this.closeRenameInput(folder)}>{'<--'}</span>{' '}
          <span onClick={() => this.renameFolder(folder)}>+</span>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetStatusClick: (status) => {
      dispatch(setStatus(status));
    },
    onIsRenameClick: (id) => {
      dispatch(isRename(id));
    },
    onIsRenameCancelClick: () => {
      dispatch(isRenameCancel());
    },
    onRenameFolderClick: (id, newName) => {
      dispatch(renameFolder(id, newName));
    },
    onRemoveFolderClick: (id) => {
      dispatch(removeFolder(id));
    }
  }
}

Folder = connect(
  undefined,
  mapDispatchToProps,
)(Folder);

export default Folder;
