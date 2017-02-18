import React, {Component, PropTypes} from 'react';
import Folder from './Folder';

const style = {listStyleType: 'none', padding: '15px', border: '1px solid red'};

class FolderList extends Component {
  render() {
    const {
      folders,
      status,
      selected,
      folderId
    } = this.props;
    return (
      <ul style={style}>
        {folders.map(folder => (
          <Folder 
            key={folder.name}
            folder={folder}
            status={status}
            selected={selected === folder.id}
            folderId={folderId} />
        ))}
      </ul>
    );
  }
}

FolderList.propTypes = {
  folders: PropTypes.array.isRequired,
  folderId: PropTypes.string
};

export default FolderList;
