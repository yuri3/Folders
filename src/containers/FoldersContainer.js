

import { connect } from 'react-redux';
import { createFolder, setStatus } from '../actions/actions';
import Folders from '../components/Folders';

const mapStateToProps = (state, ownProps) => {
  return {
    folders: state.folders,
    status: state.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFolderClick: (id, name) => {
      dispatch(createFolder(id, name));
    },
    onSetStatus: (status) => {
      dispatch(setStatus(status));
    },
  }
}

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
