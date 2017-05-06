import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NoteAddIcon from 'material-ui/svg-icons/action/note-add';
import Loading from './Loading';

const styles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

class CreateNote extends Component {
  createNote = () => {
    const {folderId, createNewNote} = this.props;
    createNewNote(folderId);
  };
  render() {
    const {options: {isFetching, isCreating, isFetchingById, isUpdating}} = this.props;
    return (
      <div style={styles}>
        <strong style={{marginRight: '30px'}}>{'NOTES'}</strong>
        {(isFetching || isCreating || isFetchingById || isUpdating) &&
          <Loading size={36} width={'72px'} height={'72px'} />}
        {!(isFetching || isCreating || isFetchingById || isUpdating) &&
          <IconButton
            style={{width: '72px', height: '72px'}}
            iconStyle={{width: '36px', height: '36px'}}
            tooltip="CREATE NEW NOTE"
            onTouchTap={this.createNote}><NoteAddIcon/>
          </IconButton>}
      </div>
    );
  }
}

CreateNote.propTypes = {
  options: PropTypes.shape({
    isFetching: PropTypes.bool,
    isCreating: PropTypes.bool,
    isFetchingById: PropTypes.bool,
    isUpdating: PropTypes.bool,
  }).isRequired,
  folderId: PropTypes.string.isRequired,
  createNewNote: PropTypes.func.isRequired,
};

export default CreateNote;
