import React from 'react';
import { connect } from 'react-redux';
import { createFolder, setStatus } from '../actions/actions';
import CreateFolderForm from '../components/CreateFolderForm';
import FolderList from '../components/FolderList';

class Folders extends React.Component {
  render() {
    const {
      folders,
      subfolders,
      status,
      options,
      params,
      setStatus,
      createFolder,
      children
    } = this.props;
    return (
      <div>
        <CreateFolderForm
          title={'FOLDERS'}
          setStatus={setStatus}
          createFolder={createFolder} />
        <FolderList
          setStatus={setStatus}
          folders={folders}
          subfolders={subfolders}
          status={status}
          renameId={options.renameId}
          params={params} />
        <div style={{color: 'red'}}>{children}</div>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  setStatus: React.PropTypes.func.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};

function getSubFolders(folders) {
  return folders.filter((folder) => folder.parentId);
}

function setSubFoldersId(subFolders) {
  return subFolders.map((folder, i, subfolders) => {
    if(folder['id']) {return folder;}
    const subFoldersId = subfolders.reduce((maxId, folder) => Math.max(Number.parseInt(folder.id, 10), maxId), -1) + 1;
    folder.id = subFoldersId + 'a';
    console.log(folder.id);
    return folder;
  });
}

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  subfolders: setSubFoldersId(getSubFolders(state.folders)),
  options: state.options,
  status: state.status
});

const mapDispatchToProps = (dispatch) => {
  return {
    createFolder: (id, value) => {
      dispatch(createFolder(id, value));
    },
    setStatus: (status) => {
      dispatch(setStatus(status));
    },
  };
};

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
