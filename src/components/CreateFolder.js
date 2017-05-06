import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import Loading from './Loading';
import CreateFolderForm from './CreateFolderForm';

const style = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px 0 12px',
};

class CreateFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false};
    this.switchCreateInput = this.switchCreateInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  switchCreateInput() {
    this.setState((prevState) => ({
      ...prevState, isSelected: !prevState.isSelected,
    }));
  }
  handleClose() {
    this.switchCreateInput();
  }
  handleSubmit(values) {
    const {createNewFolder} = this.props;
    const {name} = values;
    createNewFolder(undefined, name);
  }
  render() {
    const {options: {isFetching, isCreating}, folders} = this.props;
    const {isSelected} = this.state;
    return (
      <div>
        <div style={style}>
          <strong style={{marginRight: '30px'}}>{'FOLDERS'}</strong>
          {isFetching && <Loading size={36} width={'72px'} height={'72px'} />}
          {!isFetching && <IconButton
            style={{width: '72px', height: '72px', zIndex: 1}}
            iconStyle={{width: '36px', height: '36px'}}
            tooltip="CREATE NEW FOLDER"
            onTouchTap={this.switchCreateInput}><CreateNewFolderIcon/>
          </IconButton>}
        </div>
        {isSelected &&
          <CreateFolderForm
            folders={folders}
            isCreating={isCreating}
            onSubmit={this.handleSubmit}
            handleClose={this.handleClose}/>}
      </div>
    );
  }
}

CreateFolder.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    parentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    isFetching: PropTypes.bool.isFetching,
    isCreating: PropTypes.bool.isRequired,
  }).isRequired,
  createNewFolder: PropTypes.func.isRequired,
};

export default CreateFolder;
