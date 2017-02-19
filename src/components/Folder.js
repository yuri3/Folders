import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { FOLDER_STATUS } from '../actions/actions';
import Rename from './Rename';
import './css/Folder.css';

class Folder extends React.Component {
  componentDidMount() {
    if(this.props.status === FOLDER_STATUS.IS_CREATE_DONE) {
      this.newFolder.querySelector('a').click();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(
        nextProps.status === FOLDER_STATUS.IS_REMOVE_DONE &&
        nextProps.params.folderId === nextProps.folder.name
      ) {
      Object.assign(nextProps.params, {folderId: ''});
      this.props.setStatus('');
    }
  }
  createFolder = (id) => {
    console.log(id);
  };
  showRenameInput = (id) => {
    const {switchRenameInput} = this.props;
    switchRenameInput(id);
  };
  removeFolder = (id) => {
    this.props.removeFolder(id);
    this.props.setStatus(FOLDER_STATUS.IS_REMOVE_DONE);
  };
  render() {
    const {
      folder,
      params,
      isShowRenameInput,
      switchRenameInput,
      renameFolder
    } = this.props;
    return (
      <li>
        {!isShowRenameInput && <div>
          <div className="parentFolder" ref={(newFolder) => this.newFolder = newFolder}>
            {params.folderId === folder.name ?
              folder.name :
              <Link to={"/" + folder.name}>{folder.name}</Link>}
            <span className="Folder Create"
                  onClick={() => this.createFolder(folder.id)}>+</span>
            <span className="Folder Remove"
                  onClick={() => this.removeFolder(folder.id)}>X</span>
            <span className="Folder Rename"
                  onClick={() => this.showRenameInput(folder.id)}>/</span>
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
        {isShowRenameInput &&
          <Rename
            folder={folder}
            switchRenameInput={switchRenameInput}
            renameFolder={renameFolder} />}
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