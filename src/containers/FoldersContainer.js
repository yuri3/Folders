import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/folders';
import CreateFolder from '../components/CreateFolder';
import FolderList from '../components/FolderList';

const style = {
  margin: '0 0 0 30px',
  width: '350px',
  overflow: 'auto',
  borderRight: '1px dashed gray',
};

class Folders extends Component {
  componentDidMount() {
    const {fetchAllFolders} = this.props;
    fetchAllFolders();
  }
  render() {
    const {
      folders,
      options,
      match,
      history,
      selectCreateFolder,
      createNewFolder,
      selectRenameInput,
      renameSelectedFolder,
      selectDeleteFolder,
      deleteSelectedFolder,
      moveSelectedFolder
    } = this.props;
    const {isFetching} = options;
    return (
      <div style={style}>
        <CreateFolder
          folders={folders}
          options={options}
          createNewFolder={createNewFolder}
        />
        {!isFetching && folders.length > 0 &&
          <FolderList
            folders={folders}
            options={options}
            match={match}
            history={history}
            selectCreateFolder={selectCreateFolder}
            createNewFolder={createNewFolder}
            selectRenameInput={selectRenameInput}
            renameSelectedFolder={renameSelectedFolder}
            selectDeleteFolder={selectDeleteFolder}
            deleteSelectedFolder={deleteSelectedFolder}
            moveSelectedFolder={moveSelectedFolder}
        />}
      </div>
    );
  }
}

Folders.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  selectCreateFolder: PropTypes.func.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameSelectedFolder: PropTypes.func.isRequired,
  selectDeleteFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  options: state.folderOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
