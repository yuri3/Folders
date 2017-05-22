import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/notes';
import Loading from '../components/Loading';

const style = {
  padding: '10px',
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isInputChecked: true,
    };
    this.searchText = '';
    this.handleOnToggle = this.handleOnToggle.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleOnNewRequest = this.handleOnNewRequest.bind(this);
  }
  handleOnToggle(event, isInputChecked) {
    this.setState({isInputChecked});
  }
  handleUpdateInput(value, arr, params) {
    const {source} = params;
    const {isInputChecked} = this.state;
    if(source !== 'touchTap') {
      this.searchText = value;
      this.props.searchNotes(value, isInputChecked);
    }
  }
  handleOnNewRequest(note, index) {
    const {history, handleToggle} = this.props;
    if(index === -1) {
      return;
    }
    const {isInputChecked} = this.state;
    const {
      search: {
        matchInTitles: {count: noteCount},
        matchInTags: {count: tagCount},
      }
    } = this.props.notes;
    if(index === 0 && isInputChecked && noteCount > 0) {
      history.push({
        pathname: `/notes/search`,
        search: `?type=titles&deepQ=${this.searchText}`,
        state: {type: 'TITLES', searchText: this.searchText}
      });
    } else if(index === 1 && isInputChecked && tagCount > 0) {
      history.push({
        pathname: '/notes/search',
        search: `?type=tags&deepQ=${this.searchText}`,
        state: {type: 'TAGS', searchText: this.searchText}
      })
    } else {
      history.push(`/notes/${note.folderId}/${note.id}`);
    }
    handleToggle();
  }
  render() {
    const {
      search: {
        isSearching,
        matchInTitles: {count: noteCount, rows: notes},
        matchInTags: {count: tagCount},
      }
    } = this.props.notes;
    const {isInputChecked} = this.state;
    const dataSource = isInputChecked ? [
      `${noteCount} match(es) in titl(es).`,
      `${tagCount} match(es) in tag(s).`,
    ] : notes;
    const filter = isInputChecked ? AutoComplete.noFilter :
      (searchText, note) => (
        searchText !== '' &&
        (note.toUpperCase().includes(searchText.toUpperCase()))
      );
    return (
      <div style={style}>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <AutoComplete
            floatingLabelText="Type to search..."
            fullWidth={true}
            maxSearchResults={isInputChecked ? 3 : 10}
            filter={filter}
            dataSourceConfig={{text: 'name', value: 'name'}}
            dataSource={!isSearching && (noteCount > 0 || tagCount > 0) ?
              dataSource : []}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleOnNewRequest}
          />
          {isSearching && <Loading/>}
        </div>
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
  notes: PropTypes.shape({
    search: PropTypes.shape({
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
  }).isRequired,
  history: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
  searchNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
