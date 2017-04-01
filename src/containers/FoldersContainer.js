import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actions from '../actions/actions';
import CreateFolder from '../components/CreateFolder';
import FolderList from '../components/FolderList';
import { getSubFolders } from '../selectors';

const style = {
  margin: '0 0 0 30px',
  overflow: 'auto',
  borderRight: '1px dashed gray',
};

class Folders extends Component {
  render() {
    const {
      folders,
      subfolders,
      options,
      match,
      history,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      moveFolder
    } = this.props;
    const root = (
      <div key={'13'}>
        <CreateFolder
          folders={folders}
          createFolder={createFolder}/>
        <FolderList
          folders={folders}
          subfolders={subfolders}
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
    return (
      <div style={style}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {root}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  subfolders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    renameId: PropTypes.object,
  }).isRequired,
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
  subfolders: getSubFolders(state),
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
