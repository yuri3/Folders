import React from 'react';
import { connect } from 'react-redux';
import { createFolder, setStatus } from '../actions/actions';
import CreateFolderForm from '../components/CreateFolderForm';
import FolderList from '../components/FolderList';
import { setSubFoldersId } from '../selectors';

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
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  setStatus: React.PropTypes.func.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  subfolders: setSubFoldersId(state),
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
