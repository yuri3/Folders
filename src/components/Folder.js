import React, { PropTypes, Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router';
//import { bindActionCreators } from 'redux'
//import * as actions from '../actions/actions';
import RenameFolderForm from './RenameFolderForm';
import SubFoldersList from './SubFoldersList';
import './css/Folder.css';

const spanStyle = {
  flex: '1',
};

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedFolderId: null};
    this.createFolder = this.createFolder.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
    this.showRenameInput = this.showRenameInput.bind(this);
    this.renameFolder = this.renameFolder.bind(this);
    this.closeRenameInput = this.closeRenameInput.bind(this);
    this.removeFolder = this.removeFolder.bind(this);
  }
  createFolder(id) {
    this.selectFolder(id);
    this.props.createFolder(id);
  }
  selectFolder(id) {
    this.setState({selectedFolderId: id});
  }
  showRenameInput(id) {
    const {selectRenameInput} = this.props;
    selectRenameInput(id);
  }
  renameFolder(values) {
    const {folder, renameFolder} = this.props;
    const {name} = values;
    this.closeRenameInput();
    renameFolder(folder.id, name.trim());
  }
  closeRenameInput() {
    const {selectRenameInput} = this.props;
    selectRenameInput(null);
  }
  removeFolder(id) {
    const {removeFolder, options, folder} = this.props;
    removeFolder(id);
    options.renameId === folder.id && this.showRenameInput(null);
  }
  render() {
    const {
      folders,
      folder,
      subfolders,
      options,
      params,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    const isShowRenameInput = options.renameId === folder.id;
    const isFolderHasSubFolders = subfolders.some(
      subFolder => subFolder.parentId === folder.id
    );
    const {selectedFolderId} = this.state;
    return (
      <li>
        {!isShowRenameInput && <div className="parentFolder">
          {!isFolderHasSubFolders &&
            <span style={spanStyle}>
              <i className="material-icons md-36">folder</i>
            </span>}
          {isFolderHasSubFolders && selectedFolderId !== folder.id &&
            <span style={spanStyle}>
              <i style={{position: 'relative'}} className="material-icons md-36"
                 onClick={() => this.selectFolder(folder.id)}>
                folder_open
                <span style={{position: 'absolute', left: '35%', top: '15%', fontSize: '20px', fontWeight: 'bold'}}>{'>'}</span>
              </i>
            </span>}
          {isFolderHasSubFolders && selectedFolderId === folder.id &&
            <span style={spanStyle}>
              <i style={{position: 'relative'}} className="material-icons md-36"
                 onClick={() => this.selectFolder(null)}>
                folder_open
                <span style={{position: 'absolute', left: '35%', top: '15%', fontSize: '20px'}}>{'\\/'}</span>
              </i>
            </span>}
            <header>{params.folderId === folder.id ? folder.name :
              <Link to={"/" + folder.id}>{folder.name}</Link>}</header>
            <span className="Folder Rename"
              onClick={() => this.showRenameInput(folder.id)}>
              <i className="material-icons md-36">mode_edit</i>
            </span>
            <span className="Folder Remove"
              onClick={() => this.removeFolder(folder.id)}>
              <i className="material-icons md-36">delete_forever</i>
            </span>
            <span className="Folder Create"
              onClick={() => this.createFolder(folder.id)}>
              <i className="material-icons md-36">create_new_folder</i>
            </span>
          </div>}
        {isShowRenameInput &&
        <RenameFolderForm
           folders={folders}
           onSubmit={this.renameFolder}
           handleClose={this.closeRenameInput}
           initialValues={{name: folder.name}}/>}
        {selectedFolderId === folder.id &&
          <SubFoldersList
            folders={folders}
            folder={folder}
            subfolders={subfolders}
            params={params}
            options={options}
            createFolder={createFolder}
            selectRenameInput={selectRenameInput}
            renameFolder={renameFolder}
            removeFolder={removeFolder}/>}
      </li>
    );
  }
}

Folder.propTypes = {
  folders: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired,
  subfolders: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};
/*
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

Folder = connect(
  undefined,
  mapDispatchToProps,
)(Folder);*/

export default Folder;
