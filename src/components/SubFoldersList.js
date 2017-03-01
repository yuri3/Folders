import React from 'react';
import Folder from './Folder';

class SubFoldersList extends React.Component {
  render() {
    const {
      folder,
      subfolders,
      params,
      options,
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
            options={options}
            params={params}
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
  params: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  createFolder: React.PropTypes.func.isRequired,
  selectRenameInput: React.PropTypes.func.isRequired,
  renameFolder: React.PropTypes.func.isRequired,
  removeFolder: React.PropTypes.func.isRequired,
};

export default SubFoldersList;
