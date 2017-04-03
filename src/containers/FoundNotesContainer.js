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
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps()');
    const {notes, tags, history, location: {state}} = nextProps;
    if(notes.length === 0 || tags.length === 0) {
      history.push(`/notes`);
    }
  }
  handleLink(label) {
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
    const {matchInTitles, matchInTags} = foundNotes;
    const {label} = this.state;
    return (
      <div style={style}>
        <div style={headerStyle}>
          <strong>{`FOUND (${label ? label : foundNotes.searchText.toUpperCase()}) BY ${state.type}`}</strong>
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
          {label &&
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
      searchText: PropTypes.string,
      matchInTitles: PropTypes.array,
      matchInTags: PropTypes.array,
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
