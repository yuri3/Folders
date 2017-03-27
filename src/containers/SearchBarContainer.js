import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';

const style = {
  padding: '10px',
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isInputChecked: true,
      listOfMatchedNotesInTitles: [],
      listOfMatchedNotesInTags: [],
    };
    this.handleOnToggle = this.handleOnToggle.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleOnNewRequest = this.handleOnNewRequest.bind(this);
  }
  handleOnToggle(event, isInputChecked) {
    this.setState({isInputChecked});
  }
  handleUpdateInput(value) {
    const {notes} = this.props;
    const matchInTitles = (value !== '' && notes.filter((note) => {
      return note.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }));
    const matchInTags = [];
    console.log(matchInTitles, matchInTags);
    this.setState({
      ...this.state,
      listOfMatchedNotesInTitles: matchInTitles,
      listOfMatchedNotesInTags: matchInTags,
      dataSource: matchInTitles.length > 0 || matchInTags.length > 0 ? [
        `${matchInTitles.length} match(es) in titl(es).`,
        `${matchInTags.length} match(es) in tag(s).`,
      ] : [],
    });
  }
  handleOnNewRequest(note, index) {
    console.log('fsdfsd', note, index);
    const {history, handleToggle} = this.props;
    const {isInputChecked, listOfMatchedNotesInTitles, listOfMatchedNotesInTags} = this.state;
    if(isInputChecked) {
      // create route and make request to filtered route...
    } else {
      history.push(`/notes/${note.parentId}/${note.id}`);
    }
    handleToggle();
  }
  render() {
    const {isInputChecked, dataSource} = this.state;
    const {notes} = this.props;
    return (
      <div style={style}>
        <AutoComplete
          ref={(input) => this.input = input}
          floatingLabelText="Type to search..."
          fullWidth={true}
          maxSearchResults={isInputChecked ? 2 : 10}
          filter={isInputChecked ? AutoComplete.noFilter :
            (searchText, note) => (
              searchText !== '' &&
                (note.toUpperCase().indexOf(searchText.toUpperCase())) > -1
            )
          }
          dataSource={isInputChecked ? dataSource : notes}
          dataSourceConfig={{text: 'name', value: 'name'}}
          onUpdateInput={isInputChecked ? this.handleUpdateInput : () => {}}
          onNewRequest={this.handleOnNewRequest}
          onBlur={() => this.input.state.searchText = ''}
        />
        <Toggle
          label="Deep Search..."
          labelPosition="right"
          defaultToggled={true}
          onToggle={this.handleOnToggle}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.string,
    descriptions: PropTypes.string,
  })),
  history: PropTypes.object.isRequired,
  handleToggle: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.folders.reduce((prev, curr) => {// read about normalize???
    const {notes} = curr;
    if(notes.length > 0) {
      //notes.forEach((note) => prev.push(note.name));
      notes.forEach((note) => prev.push(note));
      return prev;
    }
    return prev;
  }, []),
});

const SearchBarContainer = connect(
  mapStateToProps,
)(SearchBar);

export default SearchBarContainer;
