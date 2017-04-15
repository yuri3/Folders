import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import CreateFolder from '../components/CreateFolder';
import FolderList from '../components/FolderList';

const style = {
  margin: '0 0 0 30px',
  overflow: 'auto',
  borderRight: '1px dashed gray',
};

class Folders extends Component {
  componentDidMount() {
    console.log('componentDidMount()');
    const {fetchFoldersIfNeeded} = this.props;
    fetchFoldersIfNeeded();
  }
  render() {
    const {
      folders,
      options,
      match,
      history,
      createNewFolder,
      selectRenameInput,
      renameFolder,
      deleteSelectedFolder,
      moveFolder
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
            createNewFolder={createNewFolder}
            selectRenameInput={selectRenameInput}
            renameFolder={renameFolder}
            deleteSelectedFolder={deleteSelectedFolder}
            moveFolder={moveFolder}
          />
        }
      </div>
    );
  }
}

Folders.propTypes = {
  /*folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.integer,
    id: PropTypes.integer.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,*/
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  deleteSelectedFolder: PropTypes.func.isRequired,
  moveFolder: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  options: state.options,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoldersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders);

export default FoldersContainer;
