import React from 'react';
import Folder from './Folder';

class SubFoldersList extends React.Component {
  render() {
    const {
      folder,
      subfolders,
      renameId,
    } = this.props;
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

SubFoldersList.propTypes = {
  folder: React.PropTypes.object.isRequired,
  subfolders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  isShowRenameInput: React.PropTypes.bool.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired,
  ]),
};

export default SubFoldersList;