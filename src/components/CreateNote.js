import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const {loading} = this.props;
    return (
      <div style={styles}>
        <strong style={{marginRight: '30px'}}>{'NOTES'}</strong>
        {loading && <Loading size={36} width={'72px'} height={'72px'} />}
        {!loading &&
          <IconButton
            style={{width: '72px', height: '72px'}}
            iconStyle={{width: '36px', height: '36px'}}
            tooltip="CREATE NEW NOTE"
            tooltipPosition="bottom-right"
            onTouchTap={this.createNote}><NoteAddIcon/>
          </IconButton>}
      </div>
    );
  }
}

CreateNote.propTypes = {
  loading: PropTypes.bool.isRequired,
  folderId: PropTypes.string.isRequired,
  createNewNote: PropTypes.func.isRequired,
};

export default CreateNote;
