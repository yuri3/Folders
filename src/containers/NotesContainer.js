import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/actions';
import CreateForm from '../components/CreateForm';
import NoteList from '../components/NoteList';

class Notes extends React.Component {
  render() {
    const {folders, params, createNote, removeNote, children} = this.props;
    const {folderId} = params;
    const folder = folders.find((folder) => (
      folder.id === folderId
    ));
    return (
      <div style={{border: '1px solid red'}}>
        <CreateForm
          title={'NOTES'}
          folders={folders}
          create={createNote.bind(null, folderId)}/>
        <NoteList
          folder={folder}
          params={params}
          removeNote={removeNote}/>
        <div>{children}</div>
      </div>
    );
  }
}

Notes.propTypes = {
  folders: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
  createNote: React.PropTypes.func.isRequired,
  removeNote: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};

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
