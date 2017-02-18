import React from 'react';
import { connect } from 'react-redux';
import {createFolder, setStatus} from '../actions/actions';
import CreateFolderForm from '../components/CreateFolderForm';
import FolderList from '../components/FolderList';

class Folders extends React.Component {
  render() {
    const {
      folders,
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
          lastId={folders[folders.length - 1].id}
          setStatus={setStatus}
          createFolder={createFolder} />
        <FolderList
          folders={folders}
          status={status}
          selected={options.selected}
          folderId={params.folderId} />
        <div style={{color: 'red'}}>{children}</div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  options: state.options,
  status: state.status
});

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (status) => {
      dispatch(setStatus(status));
    },
    createFolder: (id, value) => {
      dispatch(createFolder(id, value));
    }
  };
};

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
