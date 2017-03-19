import React, { PropTypes, Component } from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { Link } from 'react-router';
//import { bindActionCreators } from 'redux'
//import * as actions from '../actions/actions';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FolderOpenIcon from 'material-ui/svg-icons/file/folder-open';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
//import styles from '../IconStyles';
import RenameFolderForm from './RenameFolderForm';
import SubFoldersList from './SubFoldersList';
import './css/Folder.css';

const style = {
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
      params,
      match,
      options,
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
            <IconButton style={style}>
              <FolderIcon/>
            </IconButton>}
          {isFolderHasSubFolders && selectedFolderId !== folder.id &&
            <IconButton
              style={style}
              onTouchTap={() => this.selectFolder(folder.id)}>
              <FolderOpenIcon/>
            </IconButton>}
          {isFolderHasSubFolders && selectedFolderId === folder.id &&
            <IconButton
              style={style}
              onTouchTap={() => this.selectFolder(null)}>
              <FolderOpenIcon/>
            </IconButton>}
          <header>{params.folderId === folder.id ? folder.name :
            <Link to={`/` + folder.id}>{folder.name}</Link>}
          </header>
          <span className="Folder Rename">
            <IconButton
              tooltip="Rename Folder"
              style={style}
              onTouchTap={() => this.showRenameInput(folder.id)}>
              <ModeEditIcon/>
            </IconButton>
          </span>
          <span className="Folder Remove">
            <IconButton
              tooltip="Remove Folder"
              style={style}
              onTouchTap={() => this.removeFolder(folder.id)}>
              <DeleteForeverIcon/>
            </IconButton>
          </span>
          <span className="Folder Create">
            <IconButton
              tooltip="Create Folder"
              style={style}
              onTouchTap={() => this.createFolder(folder.id)}>
              <CreateNewFolderIcon/>
            </IconButton>
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
            match={match}
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
  //match: PropTypes.object.isRequired,
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
