import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
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
    this.matchInNotes = this.matchInNotes.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {notes, history, location: {state}} = this.props;
    if(nextProps.notes.length === notes.length) {
      return;
    }
    const {matchInTitles, matchInTags} = this.matchInNotes(nextProps);
    if(
      (state.type === 'TITLES' || state.type === '') &&
      nextProps.notes.length < notes.length && matchInTitles.length === 0
    ) {
      history.push(`/notes`);
    } else if(
      (state.type === 'TAGS' || state.type === '') &&
      nextProps.notes.length < notes.length && matchInTags.length === 0
    ) {
      history.push(`/notes`);
    }
  }
  matchInNotes(nextProps) {
    const {notes, tags, options: {foundNotes: {matchInTitles}}} = nextProps;
    const {label} = this.state;
    return notes.reduce((match, note) => {
      const isMatchInTitles = matchInTitles.find(n => n.id === note.id);
      const isMatchInTags = label && tags.find(t => t.parentNoteId === note.id && t.label === label);
      isMatchInTitles && match.matchInTitles.push(note);
      isMatchInTags && match.matchInTags.push(note);
      return match;
    }, {matchInTitles: [], matchInTags: []});
  }
  handleLink(label) {
    const {location: {state}} = this.props;
    state.type = '';
    this.setState({label});
  }
  render() {
    const {
      notes,
      tags,
      options: {foundNotes},
      location: {state},
      moveNote,
      removeTag,
      removeNote,
    } = this.props;
    const {label} = this.state;
    const {matchInTitles, matchInTags} = foundNotes;
    return (
      <div style={style}>
        <div style={headerStyle}>
          <strong>{`FOUND (${label ? label : foundNotes.searchText.toUpperCase()}) BY ${state.type ? state.type : 'TAGS'}`}</strong>
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
                {matchInTitles.find(n => n.id === note.id) &&
                  <DragAndDropNote
                    index={index}
                    note={note}
                    moveNote={moveNote}
                    removeTag={removeTag}
                    removeNote={removeNote}
                  />}
              </ReactCSSTransitionGroup>)
            )}
          </div>}
          {state.type === 'TAGS' &&
            <div style={{display: 'flex'}}>
              {tags.map((tag, index) => (
                <ReactCSSTransitionGroup
                  key={tag.key}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {matchInTags.find(t => t.key === tag.key) &&
                    <Chip
                      onTouchTap={() => this.handleLink(tag.label)}
                      style={{margin: 5}}
                    >
                      {tag.label}
                    </Chip>}
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
                  {tags.find(t => t.parentNoteId === note.id && t.label === label) &&
                    <DragAndDropNote
                      index={index}
                      note={note}
                      moveNote={moveNote}
                      removeTag={removeTag}
                      removeNote={removeNote}
                    />}
                 </ReactCSSTransitionGroup>)
              )}
            </div>}
        </div>

    );
  }
}

FoundTitles.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.string,
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    parentNoteId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    foundNotes: PropTypes.shape({
      searchText: PropTypes.string.isRequired,
      matchInTitles: PropTypes.array.isRequired,
      matchInTags: PropTypes.array.isRequired,
      matchInDescriptions: PropTypes.array,
    }),
  }).isRequired,
  moveNote: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  tags: state.tags,
  options: state.options,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoundTitlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoundTitles);

export default FoundTitlesContainer;
