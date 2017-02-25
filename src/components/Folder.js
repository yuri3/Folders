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
    this.state = {selectedFolderId: null};
    this.createFolder = this.createFolder.bind(this);
    this.showRenameInput = this.showRenameInput.bind(this);
    this.removeFolder = this.removeFolder.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
  }
  componentDidMount() {
    if(this.props.status === FOLDER_STATUS.IS_CREATE_DONE) {
      this.newFolder.querySelector('a').click();
      this.props.setStatus('');
    }
  }
  createFolder(id) {
    this.selectFolder(id);
    this.props.createFolder(id);
    this.props.setStatus(FOLDER_STATUS.IS_CREATE_DONE);
  }
  selectFolder(id = null) {
    this.setState({selectedFolderId: id});
  }
  showRenameInput(id) {
    const {selectRenameInput} = this.props;
    selectRenameInput(id);
  }
  removeFolder(id) {
    this.props.removeFolder(id);
    this.props.setStatus(FOLDER_STATUS.IS_REMOVE_DONE);
    this.props.isShowRenameInput && this.showRenameInput(null);
  }
  render() {
    const {
      folder,
      subfolders,
      isShowRenameInput,
      selectRenameInput,
      renameFolder
    } = this.props;
    const foundFolder = subfolders.find(
      subFolder => subFolder.parentId === folder.id
    );
    const isFolderHasSubFolders = foundFolder && true;
    return (
      <li>
        {!isShowRenameInput && <div className="parentFolder" ref={(newFolder) => this.newFolder = newFolder}>
          {isFolderHasSubFolders && this.state.selectedFolderId !== folder.id &&
            <span onClick={() => this.selectFolder(folder.id)}>{'> '}</span>}
          {isFolderHasSubFolders && this.state.selectedFolderId === folder.id &&
            <span onClick={this.selectFolder}>{'\\/ '}</span> }
            <Link to={"/" + folder.id} activeStyle={{textDecoration: 'none', color: 'black'}}>{folder.name}</Link>
            <span className="Folder Create"
                  onClick={() => this.createFolder(folder.id)}>+</span>
            <span className="Folder Remove"
                  onClick={() => this.removeFolder(folder.id)}>X</span>
            <span className="Folder Rename"
                  onClick={() => this.showRenameInput(folder.id)}>/</span>
          </div>}
        {isShowRenameInput &&
          <RenameInput folder={folder} selectRenameInput={selectRenameInput} renameFolder={renameFolder} />}

        {isFolderHasSubFolders && this.state.selectedFolderId === folder.id &&
          <SubFoldersList {...this.props}/>}
      </li>
    );
  }
}

Folder.propTypes = {
  folder: React.PropTypes.object.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  isShowRenameInput: React.PropTypes.bool.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired,
  ]),
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

Folder = connect(
  undefined,
  mapDispatchToProps,
)(Folder);

export default Folder;