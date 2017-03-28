import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NoteAddIcon from 'material-ui/svg-icons/action/note-add';

const styles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

class CreateNote extends Component {
  createNote = () => {
    const {folderId, createNote} = this.props;
    createNote(folderId);
  };
  render() {
    return (
      <div style={styles}>
        <strong style={{marginRight: '30px'}}>{'NOTES'}</strong>
        <IconButton
          style={{width: '72px', height: '72px'}}
          iconStyle={{width: '36px', height: '36px'}}
          tooltip="CREATE NEW NOTE"
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
