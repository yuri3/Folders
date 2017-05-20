import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/folders';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FolderOpenIcon from 'material-ui/svg-icons/file/folder-open';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import RenameFolderForm from '../components/RenameFolderForm';
import SubFoldersList from '../components/SubFoldersList';
import '../components/css/Folder.css';
import Loading from '../components/Loading';

const style = {
  flex: '1',
  position: 'relative',
  padding: 10,
  cursor: 'pointer',
};

const openIconStyle = {
  position: 'absolute',
  top: 10,
  left: 10,
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
    const {folder, folders: {isRenaming, renameId}} = this.props;
    if(isRenaming && renameId === folder.id) {
      this.closeRenameInput();
    }
  }
  componentDidMount() {
    const {folders: {createId}, selectCreateFolder} = this.props;
    createId && selectCreateFolder(null);
  }
  componentWillUnmount() {
    const {folders: {deleteId}, selectDeleteFolder} = this.props;
    deleteId && selectDeleteFolder(null);
  }
  createFolder(id) {
    this.selectFolder(id);
    const {selectCreateFolder, createNewFolder} = this.props;
    selectCreateFolder(id);
    createNewFolder(id);
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
  removeFolder(id) {
    const {selectDeleteFolder, deleteSelectedFolder} = this.props;
    selectDeleteFolder(id);
    deleteSelectedFolder(id);
  }
  render() {
    const {
      folders,
      folder,
      isDragging,
      moveSelectedFolder
    } = this.props;
    const {lists, isRenaming, createId, renameId, deleteId} = folders;
    const showRenameInput = renameId === folder.id;
    const isFolderHasSubFolders = lists.some(
      subFolder => subFolder.parentId === folder.id
    );
    const {selectedFolderId} = this.state;
    const opacity = isDragging ? 0 : 1;
    const showLoading = (folder.id === deleteId || folder.id === createId);
    return (
      <div style={{opacity}}>
        {!showRenameInput && <div className="parentFolder">
          {!showLoading && !isFolderHasSubFolders &&
            <div style={style}><FolderIcon/></div>}
          {!showLoading && isFolderHasSubFolders && selectedFolderId !== folder.id &&
            <div style={style} onClick={() => this.selectFolder(folder.id)}>
              <FolderOpenIcon style={openIconStyle}/>
              <ExpandMore/>
            </div>}
          {!showLoading && isFolderHasSubFolders && selectedFolderId === folder.id &&
            <div style={style} onClick={() => this.selectFolder(null)}>
              <FolderOpenIcon style={openIconStyle}/>
              <ExpandLess/>
            </div>}
          {showLoading && <div style={style}><Loading/></div>}
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
        {showRenameInput &&
          <RenameFolderForm
             folders={folders}
             isRenaming={isRenaming}
             onSubmit={this.renameFolder}
             handleClose={this.closeRenameInput}
             initialValues={{id: folder.id, parentId: folder.parentId, name: folder.name}}
          />}
        <ReactCSSTransitionGroup transitionName="fade"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {!isDragging && selectedFolderId === folder.id  &&
            <SubFoldersList
              folders={folders}
              folder={folder}
              moveSelectedFolder={moveSelectedFolder}/>}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Folder.propTypes = {
  folder: PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
  folders: PropTypes.shape({
    isRenaming: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      parentId: PropTypes.number,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    createId: PropTypes.number,
    renameId: PropTypes.number,
    deleteId: PropTypes.number,
  }),
  match: PropTypes.object,
  selectCreateFolder: PropTypes.func,
  createNewFolder: PropTypes.func,
  selectRenameInput: PropTypes.func,
  renameSelectedFolder: PropTypes.func,
  selectDeleteFolder: PropTypes.func,
  deleteSelectedFolder: PropTypes.func,
  moveSelectedFolder: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);

export default withRouter(FolderContainer);
