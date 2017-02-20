import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import * as actions from '../actions/actions';
import { FOLDER_STATUS } from '../actions/actions';
import Rename from './Rename';
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
  componentWillUpdate(nextProps, nextState) {
    if(
        nextProps.status === FOLDER_STATUS.IS_REMOVE_DONE &&
        nextProps.params.folderId === nextProps.folder.name
      ) {
      Object.assign(nextProps.params, {folderId: ''});
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
  }
  render() {
    const {
      status,
      folder,
      subfolders,
      params,
      isShowRenameInput,
      renameId,
      setStatus,
      createFolder,
      switchRenameInput,
      renameFolder,
      removeFolder
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
          {subfolders && subfolders.length > 0 ? (
            <ul style={{listStyleType: 'none'}}>
              {subfolders.map((subFolder, index) => (
                folder.id === subFolder.parentId ?
                  <Folder
                    key={subFolder.id + index}
                    folder={subFolder}
                    subfolders={subfolders}
                    params={params}
                    status={status}
                    isShowRenameInput={renameId === subFolder.id}
                    renameId={renameId}
                    setStatus={setStatus}
                    createFolder={createFolder}
                    switchRenameInput={switchRenameInput}
                    renameFolder={renameFolder}
                    removeFolder={removeFolder} /> : null
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