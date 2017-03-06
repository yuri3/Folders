import React from 'react';

class CreateNote extends React.Component {
  createNote = () => {
    const {folderId, createNote} = this.props;
    createNote(folderId);
  };
  render() {
    return (
      <div>
        <strong>{'NOTES'}</strong>{' '}
        <span
          className="NewFolder Create"
          onClick={this.createNote}>+</span><br/>
      </div>
    );
  }
}

CreateNote.propTypes = {
  folderId: React.PropTypes.string.isRequired,
  createNote: React.PropTypes.func.isRequired,
};

export default CreateNote;
