import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actions from '../actions/actions';
import CreateFolder from '../components/CreateFolder';
import FolderList from '../components/FolderList';
import { getSubFolders } from '../selectors';

const style = {
  border: '1px solid red',
  margin: '0 0 0 30px',
  overflow: 'auto',
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
      removeFolder
    } = this.props;
    console.log('match of FoldersContainer = ', this.props);
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div key={2} style={style}>
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
            removeFolder={removeFolder}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

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
