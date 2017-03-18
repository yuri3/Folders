import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actions from '../actions/actions';
import CreateFolder from '../components/CreateFolder';
import FolderList from '../components/FolderList';
import { getSubFolders } from '../selectors';
import NotesContainer from './NotesContainer';

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
      removeFolder
    } = this.props;
    return (
      <div>
        <CreateFolder
          folders={folders}
          createFolder={createFolder}/>
        <FolderList
          folders={folders}
          subfolders={subfolders}
          match={match}
          history={history}
          options={options}
          createFolder={createFolder}
          selectRenameInput={selectRenameInput}
          renameFolder={renameFolder}
          removeFolder={removeFolder}/>
        <Route path={`${match.url}:folderId`} component={NotesContainer}/>
      </div>
    );
  }
}
//<Route path={`${match.url}:folderId`} component={NotesContainer}/>
Folders.propTypes = {
  folders: PropTypes.array.isRequired,
  subfolders: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
  children: PropTypes.node,
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

export default DragDropContext(HTML5Backend)(FoldersContainer);
