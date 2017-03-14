import React, { PropTypes, Component } from 'react';

const styles = {
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
        <strong>{'NOTES'}</strong>{' '}
        <span onClick={this.createNote}>
          <i className="material-icons md-36">note_add</i>
        </span><br/>
      </div>
    );
  }
}

CreateNote.propTypes = {
  folderId: PropTypes.string.isRequired,
  createNote: PropTypes.func.isRequired,
};

export default CreateNote;
