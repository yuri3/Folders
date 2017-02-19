import React from 'react';
import Folder from './Folder';

const style = {listStyleType: 'none', padding: '15px', border: '1px solid red'};

class FolderList extends React.Component {
  render() {
    const {
      folders,
      status,
      renameId,
      params
    } = this.props;
    return (
      <ul style={style}>
        {folders.map(folder => (
          <Folder 
            key={folder.name}
            folder={folder}
            status={status}
            isShowRenameInput={renameId === folder.id}
            params={params}/>
        ))}
      </ul>
    );
  }
}

FolderList.propTypes = {
  folders: React.PropTypes.array.isRequired,
  status: React.PropTypes.string.isRequired,
  renameId: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired, React.PropTypes.number.isRequired
  ]),
  params: React.PropTypes.object.isRequired,
};

export default FolderList;
