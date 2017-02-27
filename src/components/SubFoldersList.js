import React from 'react';
import Folder from './Folder';

class SubFoldersList extends React.Component {
  render() {
    const {
      folder,
      subfolders,
      status,
      params,
      renameId,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        {subfolders.map((subFolder, index) => (
          folder.id === subFolder.parentId ?
          <Folder
            key={subFolder.id}
            folder={subFolder}
            subfolders={subfolders}
            status={status}
            isShowRenameInput={renameId === subFolder.id}
            params={params}
            renameId={renameId}
            createFolder={createFolder}
            selectRenameInput={selectRenameInput}
            renameFolder={renameFolder}
            removeFolder={removeFolder}/> : null
        ))}
      </ul>
    )
  }
}

SubFoldersList.propTypes = {
  folder: React.PropTypes.object.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired,
  ]),
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
};

export default SubFoldersList;
