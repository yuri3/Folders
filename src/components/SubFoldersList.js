import React, { PropTypes, Component } from 'react';
import Folder from './Folder';

class SubFoldersList extends Component {
  render() {
    const {
      folders,
      folder,
      subfolders,
      params,
      match,
      options,
      createFolder,
      selectRenameInput,
      renameFolder,
      removeFolder
    } = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        {subfolders.map(subFolder => (
          folder.id === subFolder.parentId ?
          <Folder
            key={subFolder.id}
            folders={folders}
            folder={subFolder}
            subfolders={subfolders}
            params={params}
            match={match}
            options={options}
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
  folders: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired,
  subfolders: PropTypes.array.isRequired,
  //match: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired,
  selectRenameInput: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  removeFolder: PropTypes.func.isRequired,
};

export default SubFoldersList;
