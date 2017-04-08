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
  render() {
    const {
      folders,
      options,
      match,
      history,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      moveFolder
    } = this.props;
    return (
      <div style={style}>
        <CreateFolder
          folders={folders}
          createFolder={createFolder}/>
        <FolderList
          folders={folders}
          options={options}
          match={match}
          history={history}
          createFolder={createFolder}
          selectRenameInput={selectRenameInput}
          renameFolder={renameFolder}
          removeFolder={removeFolder}
          moveFolder={moveFolder}/>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
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
