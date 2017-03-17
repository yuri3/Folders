import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NoteAddIcon from 'material-ui/svg-icons/action/note-add';

const styles = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
};

class CreateNote extends Component {
  createNote = () => {
    const {folderId, createNote} = this.props;
    createNote(folderId);
  };
  render() {
    return (
      <div style={styles}>
        <h4><strong>{'NOTES'}</strong></h4>
        <IconButton
          tooltip="Create New Note"
          onTouchTap={this.createNote}><NoteAddIcon/>
        </IconButton>
      </div>
    );
  }
}

CreateNote.propTypes = {
  folderId: PropTypes.string.isRequired,
  createNote: PropTypes.func.isRequired,
};

export default CreateNote;
