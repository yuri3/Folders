import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import NoteForm from '../components/NoteForm';

const style = {padding: '10px', border: '1px solid blue',};

const NoteDetails = withRouter(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {isBlocking: false, errorMessage: ''};
      this.changeNote = this.changeNote.bind(this);
      this.handleBlocking = this.handleBlocking.bind(this);
      this.routerWillLeave = this.routerWillLeave.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      const {params} = this.props;
      if(params && params.noteId !== nextProps.params.noteId) {
        this.changeNote('New Note');
      }
    }
    componentDidMount() {
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
    routerWillLeave(nextLocation) {
      if(this.state.isBlocking) {
        return `
          There is an Error "${this.state.errorMessage}"!!!
          Are you sure you want to go to ${nextLocation.pathname}?
          If Ok. the Note's name will be set to default Name "New Note."`
      }
    }
    componentWillUnmount() {
      const {isBlocking} = this.state;
      if(isBlocking) {
        this.changeNote('New Note');
      }
    }
    changeNote(value) {
      const {changeNoteName, params} = this.props;
      const {folderId, noteId} = params;
      changeNoteName(folderId, noteId, value);
    }
    handleBlocking(error) {
      this.setState({isBlocking: !!error, errorMessage: error ? error : ''});
    }
    render() {
      const {folders, notes, params/*, match*/} = this.props;
      //console.log('match of NoteDetailsContainer = ', match);
      //const {folderId, noteId} = match.params;
      const {noteId} = params;
      const currentNote = notes[noteId];
      return (
        <div style={style}>
          <NoteForm
            handleBlocking={this.handleBlocking}
            folders={folders}
            params={params}
            initialValues={{
              id: currentNote && currentNote.id,
              name: currentNote && currentNote.name,
              notes: currentNote && currentNote.description
            }}
            changeNoteName={this.changeNote}/>
        </div>
      );
    }
  }
);

NoteDetails.propTypes = {
  folders: PropTypes.array.isRequired,
  notes: PropTypes.object.isRequired,
  //match: PropTypes.object.isRequired,
  changeNoteName: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  folders: state.folders,
  notes: state.folders.reduce((prev, curr) => {// read about normalize???
    const {notes} = curr;
    if(notes.length > 0) {
      notes.forEach(note => prev[note.id] = note);
      return prev;
    }
    return prev;
  }, {}),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetails);

export default NoteDetailsContainer;
