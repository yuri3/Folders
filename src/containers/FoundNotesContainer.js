import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/notes';
import DragAndDropNote from '../components/DragAndDropNote';

const style = {
  margin: '0 0 0 30px',
  flex: 1,
};

const headerStyle = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

class FoundTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {label: ''};
    this.handleLink = this.handleLink.bind(this);
  }
  componentDidMount() {
    const {match: {params}, fetchAllNotes} = this.props;
    fetchAllNotes(params);
  }
  handleLink(label) {
    const {location: {state}} = this.props;
    state.type = '';
    this.setState({label});
  }
  render() {
    const {
      notes,
      noteOptions,
      location: {state},
      moveSelectedNote,
      selectDeleteNote,
      deleteSelectedNote,
    } = this.props;
    const {
      isFetching: isFetchingNote,
      matchInTitles: {rows: matchNotes},
      matchInTags: {rows: matchTags},
    } = noteOptions;
    const {label} = this.state;
    return (
      <div style={style}>
        {!isFetchingNote && <div>
          <div style={headerStyle}>
            <strong>{`FOUND (${label ? label : state.searchText.toUpperCase()}) BY ${state.type ? state.type : 'TAGS'}`}</strong>
          </div>
          {state.type === 'TITLES' &&
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {notes.map((note, index) => (
                <ReactCSSTransitionGroup
                  key={note.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {matchNotes.find(n => n.id === note.id) &&
                    <DragAndDropNote
                      index={index}
                      note={note}
                      options={noteOptions}
                      moveSelectedNote={moveSelectedNote}
                      selectDeleteNote={selectDeleteNote}
                      deleteSelectedNote={deleteSelectedNote}
                    />}
                </ReactCSSTransitionGroup>)
              )}
            </div>}
          {state.type === 'TAGS' &&
            <div style={{display: 'flex'}}>
              {matchTags.map((tag, index) => (
                <ReactCSSTransitionGroup
                  key={tag.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  <Chip
                    onTouchTap={() => this.handleLink(tag.label)}
                    style={{margin: 5}}
                  >
                    {tag.label}
                  </Chip>
                </ReactCSSTransitionGroup>)
              )}
            </div>}
          {state.type === '' && label &&
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {notes.map((note, index) => (
                <ReactCSSTransitionGroup
                  key={note.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {note.name === label &&
                    <DragAndDropNote
                      index={index}
                      note={note}
                      options={noteOptions}
                      moveSelectedNote={moveSelectedNote}
                      selectDeleteNote={selectDeleteNote}
                      deleteSelectedNote={deleteSelectedNote}
                    />}
                 </ReactCSSTransitionGroup>)
              )}
            </div>}
        </div>}
      </div>
    );
  }
}

FoundTitles.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.string,
  })).isRequired,
  noteOptions: PropTypes.shape({
    isSearching: PropTypes.bool.isRequired,
    matchInTitles: PropTypes.shape({
      count: PropTypes.number.isRequired,
      rows: PropTypes.array.isRequired,
    }).isRequired,
    matchInTags: PropTypes.shape({
      count: PropTypes.number.isRequired,
      rows: PropTypes.array,
    }).isRequired,
  }).isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  moveSelectedNote: PropTypes.func.isRequired,
  selectDeleteNote: PropTypes.func.isRequired,
  deleteSelectedNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  noteOptions: state.noteOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoundTitlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoundTitles);

export default FoundTitlesContainer;
