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
import Loading from '../components/Loading';

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
  componentWillUpdate() {
    const {folder, options: {isRenaming, renameId}} = this.props;
    if(isRenaming && renameId === folder.id) {
      this.closeRenameInput();
    }
  }
  componentDidMount() {
    const {options, selectCreateFolder} = this.props;
    options.createId && selectCreateFolder(null);
  }
  componentWillUnmount() {
    const {options, selectDeleteFolder} = this.props;
    options.deleteId && selectDeleteFolder(null);
  }
  createFolder(id) {
    this.selectFolder(id);
    this.props.createNewFolder(id, this.props.folders.length);
  }
  selectFolder(id) {
    this.setState({selectedFolderId: id});
  }
  showRenameInput(id) {
    const {selectRenameInput} = this.props;
    selectRenameInput(id);
  }
  renameFolder(values) {
    const {folder, renameSelectedFolder} = this.props;
    const {name} = values;
    renameSelectedFolder(folder.id, name.trim());
  }
  closeRenameInput() {
    const {selectRenameInput} = this.props;
    selectRenameInput(null);
  }
  removeFolder(id, parentId) {
    const {deleteSelectedFolder} = this.props;
    deleteSelectedFolder(id, parentId);
  }
  render() {
    const {
      folders,
      folder,
      options,
      match,
      isDragging,
      selectCreateFolder,
      createNewFolder,
      selectRenameInput,
      renameSelectedFolder,
      selectDeleteFolder,
      deleteSelectedFolder,
      moveSelectedFolder
    } = this.props;
    const isShowRenameInput = options.renameId === folder.id;
    const isFolderHasSubFolders = folders.some(
      subFolder => subFolder.parentId === folder.id
    );
    const {selectedFolderId} = this.state;
    const opacity = isDragging ? 0 : 1;
    const {isRenaming, createId, deleteId} = options;
    return (
      <div style={{opacity}}>
        {!isShowRenameInput && <div className="parentFolder">
          {folder.id !== deleteId && folder.id !== createId &&
            !isFolderHasSubFolders &&
            <IconButton style={style}>
              <FolderIcon/>
            </IconButton>}
          {folder.id !== deleteId && folder.id !== createId &&
            isFolderHasSubFolders && selectedFolderId !== folder.id &&
            <IconButton
              style={style}
              onTouchTap={() => this.selectFolder(folder.id)}>
              <FolderOpenIcon/>
            </IconButton>}
          {folder.id !== deleteId && folder.id !== createId &&
            isFolderHasSubFolders && selectedFolderId === folder.id &&
            <IconButton
              style={style}
              onTouchTap={() => this.selectFolder(null)}>
              <FolderOpenIcon/>
            </IconButton>}
          {(folder.id === deleteId || folder.id === createId) &&
            <div style={style}>
              <Loading />
            </div>}
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
              onTouchTap={() => this.removeFolder(folder.id, folder.parentId)}>
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
           isRenaming={isRenaming}
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
            selectCreateFolder={selectCreateFolder}
            createNewFolder={createNewFolder}
            selectRenameInput={selectRenameInput}
            renameSelectedFolder={renameSelectedFolder}
            selectDeleteFolder={selectDeleteFolder}
            deleteSelectedFolder={deleteSelectedFolder}
            moveSelectedFolder={moveSelectedFolder}/>}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Folder.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  folder: PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    createId: PropTypes.number,
    renameId: PropTypes.number,
    deleteId: PropTypes.number,
    isRenaming: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  selectCreateFolder: PropTypes.func.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameSelectedFolder: PropTypes.func.isRequired,
  selectDeleteFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
};

export default Folder;
