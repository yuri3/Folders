import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions';
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
    if(this.props.status === actions.CREATE_FOLDER) {
      browserHistory.push(`/${this.props.folder.id}`);
      this.props.setStatus('');
    }
  }
  createFolder(id) {
    this.selectFolder(id);
    this.props.createFolder(id);
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
    this.props.isShowRenameInput && this.showRenameInput(null);
  }
  render() {
    const {
      folder,
      subfolders,
      status,
      isShowRenameInput,
      params,
      renameId,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    const foundFolder = subfolders.find(
      subFolder => subFolder.parentId === folder.id
    );
    const isFolderHasSubFolders = foundFolder && true;
    return (
      <li>
        {!isShowRenameInput && <div className="parentFolder">
          {isFolderHasSubFolders && this.state.selectedFolderId !== folder.id &&
            <span onClick={() => this.selectFolder(folder.id)}>{'> '}</span>}
          {isFolderHasSubFolders && this.state.selectedFolderId === folder.id &&
            <span onClick={this.selectFolder}>{'\\/ '}</span>}
            {params.folderId === folder.id ? folder.name :
              <Link to={"/" + folder.id}>{folder.name}</Link>}
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
          <SubFoldersList
            folder={folder}
            subfolders={subfolders}
            status={status}
            params={params}
            renameId={renameId}
            createFolder={createFolder}
            selectRenameInput={selectRenameInput}
            renameFolder={renameFolder}
            removeFolder={removeFolder}/>}
      </li>
    );
  }
}

Folder.propTypes = {
  folder: React.PropTypes.object.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  isShowRenameInput: React.PropTypes.bool.isRequired,
  params: React.PropTypes.object.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired,
  ]),
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

Folder = connect(
  undefined,
  mapDispatchToProps,
)(Folder);

export default Folder;
