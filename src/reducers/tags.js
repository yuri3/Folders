import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  CREATE_TAG_REQUEST,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE
} from '../actions/tags';

const initialState = {
  loading: false,
  error: null,
  lists: [],
};

export default (state = initialState, action) => {
  const {type, response, error} = action;
  switch(type) {
    case FETCH_TAGS_REQUEST:
      return {loading: true, error: null, lists: []};
    case FETCH_TAGS_SUCCESS:
      return {loading: false, error: null, lists: response};
    case FETCH_TAGS_FAILURE:
      return {loading: false, error, lists: []};

    case CREATE_TAG_REQUEST:
      return {...state, loading: true};
    case CREATE_TAG_SUCCESS:
      return {loading: false, error: null, lists: [...state.lists, response]};
    case CREATE_TAG_FAILURE:
      return {...state, loading: false, error};

    case DELETE_TAG_REQUEST:
      return {...state, loading: true};
    case DELETE_TAG_SUCCESS:
      return {loading: false, error: null, lists: state.lists.filter(tag => tag.id !== response.id)};
    case DELETE_TAG_FAILURE:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};
