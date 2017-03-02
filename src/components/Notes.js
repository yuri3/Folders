import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/actions';
import Note from './Note';
import CreateForm from './CreateForm';

class Notes extends React.Component {
  render() {
    const {folders, params, createNote, removeNote, children} = this.props;
    const {folderId} = params;
    const folder = folders.find((folder) => (
      folder.id === folderId
    ));
    const {notes} = folder;
    return (
      <div style={{border: '1px solid red'}}>
        <CreateForm
          title={'NOTES'}
          folders={folders}
          create={createNote.bind(null, folderId)}/>
        <ul>
          {notes && notes.map((note) => (
            <Note
              key={note.id}
              params={params}
              note={note}
              removeNote={removeNote.bind(null, folderId)}/>
          ))}
        </ul>
        <div>{children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;
