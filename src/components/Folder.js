import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { FOLDER_STATUS } from '../actions/actions';
import RenameInput from './RenameInput';
import SubFoldersList from './SubFoldersList';
import './css/Folder.css';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.createFolder = this.createFolder.bind(this);
    this.showRenameInput = this.showRenameInput.bind(this);
    this.removeFolder = this.removeFolder.bind(this);
  }
  componentDidMount() {
    if(this.props.status === FOLDER_STATUS.IS_CREATE_DONE) {
      this.newFolder.querySelector('a').click();
      this.props.setStatus('');
    }
  }
  createFolder(id) {
    this.props.createFolder(id);
    this.props.setStatus(FOLDER_STATUS.IS_CREATE_DONE);
  }
  showRenameInput(id) {
    const {switchRenameInput} = this.props;
    switchRenameInput(id);
  }
  removeFolder(id) {
    this.props.removeFolder(id);
    this.props.setStatus(FOLDER_STATUS.IS_REMOVE_DONE);
    this.showRenameInput(null);
  }
  render() {
    const {
      folder,
      subfolders,
      params,
      isShowRenameInput,
      switchRenameInput,
      renameFolder
    } = this.props;
    return (
      <li>
        {!isShowRenameInput && <div className="parentFolder" ref={(newFolder) => this.newFolder = newFolder}>
          {params.folderId === folder.id ?
            folder.name :
            <Link to={"/" + folder.id}>{folder.name}</Link>}
            <span className="Folder Create"
                  onClick={() => this.createFolder(folder.id)}>+</span>
            <span className="Folder Remove"
                  onClick={() => this.removeFolder(folder.id)}>X</span>
            <span className="Folder Rename"
                  onClick={() => this.showRenameInput(folder.id)}>/</span>
          </div>}
        {isShowRenameInput &&
          <RenameInput folder={folder} switchRenameInput={switchRenameInput} renameFolder={renameFolder} />}

        {subfolders && subfolders.length > 0 ? <SubFoldersList {...this.props} /> : ''}
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