import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions';
import CreateFolderForm from '../components/CreateFolderForm';
import FolderList from '../components/FolderList';
import { getSubFolders } from '../selectors';

class Folders extends React.Component {
  handleSubmit = (values) => {
    const {name} = values;
    this.props.createFolder(undefined, name);
    Object.assign(values, {name: ''});
  };
  render() {
    const {
      folders,
      subfolders,
      options,
      params,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder,
      children
    } = this.props;
    return (
      <div>
        <CreateFolderForm
          title={'FOLDERS'}
          onSubmit={this.handleSubmit}/>
        <FolderList
          folders={folders}
          subfolders={subfolders}
          params={params}
          renameId={options.renameId}
          createFolder={createFolder}
          selectRenameInput={selectRenameInput}
          renameFolder={renameFolder}
          removeFolder={removeFolder}/>
        <div>{children}</div>
      </div>
    );
  }
}

Folders.propTypes = {
  folders: React.PropTypes.array.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
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
