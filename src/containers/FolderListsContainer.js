import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/folders';
import CreateFolder from '../components/CreateFolder';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DragAndDropFolder from '../components/DragAndDropFolder';

const rootStyle = {
  margin: '0 0 0 30px',
  width: '350px',
  overflow: 'auto',
  borderRight: '1px dashed gray',
};

const style = {
  listStyleType: 'none',
  padding: 0,
  cursor: 'move',
};

class FolderLists extends Component {
  componentDidMount() {
    const {fetchAllFolders} = this.props;
    fetchAllFolders();
  }
  componentWillReceiveProps(nextProps) {
    const {folders: {lists}, history} = this.props;
    if(lists.length > 0 && nextProps.folders.lists.length > lists.length) {
      history.push(`/notes/${nextProps.folders.lists[0].id}`);
    }
    if(nextProps.folders.lists.length < lists.length) {
      history.push('/folders');
    }
  }
  render() {
    const {folders, createNewFolder, moveSelectedFolder} = this.props;
    const {isFetching, lists} = folders;
    return (
    <div style={rootStyle}>
      <CreateFolder
        folders={folders}
        createNewFolder={createNewFolder}
      />
      <ul style={style}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {!isFetching && lists.length > 0 && lists.map((folder, index) => (
            !folder.parentId &&
              <DragAndDropFolder
                key={folder.id}
                index={index}
                folder={folder}
                moveSelectedFolder={moveSelectedFolder}
              />
          ))}
        </ReactCSSTransitionGroup>
      </ul>
    </div>
    );
  }
}

FolderLists.propTypes = {
  folders: PropTypes.shape({
    lists: PropTypes.arrayOf(PropTypes.shape({
      parentId: PropTypes.number,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  fetchAllFolders: PropTypes.func.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  moveSelectedFolder: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FolderListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderLists);

export default FolderListsContainer;
