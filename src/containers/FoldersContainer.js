import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions';
import CreateFolderForm from '../components/CreateFolderForm';
import FolderList from '../components/FolderList';
import { getSubFolders } from '../selectors';

class Folders extends React.Component {
  render() {
    const {
      folders,
      subfolders,
      options,
      status,
      params,
      setStatus,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      children
    } = this.props;
    return (
      <div>
        <CreateFolderForm
          title={'FOLDERS'}
          setStatus={setStatus}
          createFolder={createFolder} />
        <FolderList
          folders={folders}
          subfolders={subfolders}
          status={status}
          params={params}
          renameId={options.renameId}
          setStatus={setStatus}
          createFolder={createFolder}
          selectRenameInput={selectRenameInput}
          renameFolder={renameFolder}
          removeFolder={removeFolder}/>
        <div style={{color: 'red'}}>{children}</div>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: React.PropTypes.array.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired,
  status: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  setStatus: React.PropTypes.func.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  subfolders: getSubFolders(state),
  options: state.options,
  status: state.status
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
