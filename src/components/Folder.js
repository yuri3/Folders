import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FolderOpenIcon from 'material-ui/svg-icons/file/folder-open';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import RenameFolderForm from './RenameFolderForm';
import SubFoldersList from './SubFoldersList';
import './css/Folder.css';

const style = {
  flex: '1',
};

const activeStyle = {
  color: 'dodgerblue',
  textDecoration: 'none',
  pointerEvents: 'none'
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
      options,
      match,
      isDragging,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      moveFolder
    } = this.props;
    const isShowRenameInput = options.renameId === folder.id;
    const isFolderHasSubFolders = folders.some(
      subFolder => subFolder.parentId === folder.id
    );
    const {selectedFolderId} = this.state;
    const opacity = isDragging ? 0 : 1;
    return (
      <div style={{opacity}}>
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
          <header>
            <NavLink
              to={`/notes/${folder.id}`}
              activeStyle={activeStyle}>{folder.name}</NavLink>
          </header>
          <span className="Folder Rename">
            <IconButton
              tooltip="RENAME FOLDER"
              tooltipPosition="bottom-left"
              style={style}
              onTouchTap={() => this.showRenameInput(folder.id)}>
              <ModeEditIcon/>
            </IconButton>
          </span>
          <span className="Folder Remove">
            <IconButton
              tooltip="REMOVE FOLDER"
              tooltipPosition="bottom-left"
              style={style}
              onTouchTap={() => this.removeFolder(folder.id)}>
              <DeleteForeverIcon/>
            </IconButton>
          </span>
          <span className="Folder Create">
            <IconButton
              tooltip="CREATE FOLDER"
              tooltipPosition="bottom-left"
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
           initialValues={{parentId: folder.parentId, name: folder.name}}/>}
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {!isDragging && selectedFolderId === folder.id  &&
          <SubFoldersList
            folders={folders}
            folder={folder}
            options={options}
            match={match}
            isDragging={isDragging}
            createFolder={createFolder}
            selectRenameInput={selectRenameInput}
            renameFolder={renameFolder}
            removeFolder={removeFolder}
            moveFolder={moveFolder}/>}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Folder.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    renameId: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  }).isRequired,
  match: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
  moveFolder: PropTypes.func.isRequired,
};

export default Folder;
