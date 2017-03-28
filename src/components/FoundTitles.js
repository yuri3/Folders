import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import DragAndDropNote from './DragAndDropNote';

const headerStyle = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

const listStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
};

class FoundTitles extends Component {
  constructor(props) {
    super(props);
    const {options: {foundNotes: {matchInTitles}}} = this.props;
    this.state = {foundMatch: matchInTitles};
  }
  componentWillReceiveProps(nextProps) {
    const {
      notes,
      options: {foundNotes: {matchInTitles}}
    } = nextProps;
    if(notes.length < this.props.notes.length) {
      const foundMatch = matchInTitles.filter((note) => {
        return notes.find((n) => n.id === note.id);
      });
      this.setState({foundMatch});
    }
    this.setState({foundMatch: notes});
  }
  render() {
    const {
      options: {foundNotes},
      location: {state},
      moveNote,
      removeNote
    } = this.props;
    const {searchText} = foundNotes;
    const {foundMatch} = this.state;
    return (
      <div style={{border: '1px solid blue', margin: '0 0 0 30px', flex: 1}}>
        <div style={headerStyle}>
          <strong>{`FOUND (${searchText.toUpperCase()}) BY ${state.type}`}</strong>
        </div>
        <div style={listStyle}>
          {foundMatch.map((note, index) => (
            <DragAndDropNote
              key={note.id}
              note={note}
              index={index}
              moveNote={(dragIndex, hoverIndex) => (
                moveNote(note.parentId, dragIndex, hoverIndex)
              )}
              removeNote={removeNote}/>
          ))}
        </div>
      </div>
    );
  }
}

FoundTitles.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.string,
    descriptions: PropTypes.string,
  })),
  options: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.folders.reduce((prev, curr) => {// read about normalize???
    const {notes} = curr;
    if(notes.length > 0) {
      notes.forEach((note) => prev.push(note));
      return prev;
    }
    return prev;
  }, []),
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
