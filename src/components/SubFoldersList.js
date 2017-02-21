import React from 'react';
import Folder from './Folder';

class SubFoldersList extends React.Component {
  render() {
    const {subfolders, folder, renameId} = this.props;
    return (
      <ul style={{listStyleType: 'none'}}>
        {subfolders.map((subFolder, index) => (
          folder.id === subFolder.parentId ?
          <Folder {...this.props}
            key={subFolder.id}
            folder={subFolder}
            isShowRenameInput={renameId === subFolder.id}/> : null
        ))}
      </ul>
    )
  }
}

export default SubFoldersList;