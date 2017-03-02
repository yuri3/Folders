import React from 'react';

class NoteDetails extends React.Component {
  render() {
    const {params} = this.props;
    return (
      <div>Note details of {params.noteId}</div>
    );
  }
}

export default NoteDetails;
