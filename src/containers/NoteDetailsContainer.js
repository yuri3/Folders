import React, { PropTypes, Component } from 'react';
//import { withRouter } from 'react-router';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import NoteForm from '../components/NoteForm';

const style = {
  flex: 1,
  padding: '10px',
  margin: '0 0 0 30px',
};

//const NoteDetails = withRouter(For Router_3
  class NoteDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {isBlocking: false, errorMessage: ''};
      this.changeNote = this.changeNote.bind(this);
      this.handleBlocking = this.handleBlocking.bind(this);
      //this.routerWillLeave = this.routerWillLeave.bind(this); // For Router_3
    }
    componentWillReceiveProps(nextProps) {
      const {match} = this.props;
      const {isBlocking} = this.state;
      if(match.params && match.params.noteId !== nextProps.match.params.noteId && isBlocking) {
        this.changeNote('New Note');
      }
    }
    /*componentDidMount() {// For Router_3
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
    routerWillLeave(nextLocation) {
      if(this.state.isBlocking) {
        return `
          There is an Error "${this.state.errorMessage}"!!!
          Are you sure you want to go to ${nextLocation.pathname}?
          If Ok. the Note's name will be set to default Name "New Note."`
      }
    }*/
    componentWillUnmount() {
      const {isBlocking} = this.state;
      if(isBlocking) {
        this.changeNote('New Note');
      }
    }
    changeNote(value) {
      const {changeNoteName, match} = this.props;
      const {noteId} = match.params;
      changeNoteName(noteId, value);
    }
    handleBlocking(error) {
      this.setState({isBlocking: !!error, errorMessage: error});
    }
    render() {
      const {
        notes,
        tags,
        updateTagFlag,
        addTag,
        removeTag,
        changeDescription,
        match
      } = this.props;
      const {noteId} = match.params;
      const currentNote = notes.find(note => note.id === noteId);
      return (
        <div style={style}>
          <Prompt
            when={this.state.isBlocking}
            message={nextLocation => (`
              There is an Error "${this.state.errorMessage}"!!!
              Are you sure you want to go to ${nextLocation.pathname}?
              If Ok. the Note's name will be set to default Name "New Note."`
            )}
          />
          <NoteForm
            handleBlocking={this.handleBlocking}
            notes={notes}
            tags={tags}
            params={match.params}
            initialValues={{
              id: currentNote && currentNote.id,
              name: currentNote && currentNote.name,
              description: currentNote && currentNote.description,
            }}
            changeNoteName={this.changeNote}
            addTag={(label) => {
              !currentNote.hasTags && updateTagFlag(currentNote.id);
              addTag(noteId, label)
            }}
            removeTag={(key) => removeTag(key)}
            changeDescription={(value) => changeDescription(noteId, value)}/>
        </div>
      );
    }
  }
//);For Router_3

NoteDetails.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hasTags: PropTypes.bool.isRequired,
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    parentNoteId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  match: PropTypes.object.isRequired,
  changeNoteName: PropTypes.func.isRequired,
  updateTagFlag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  tags: state.tags,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
