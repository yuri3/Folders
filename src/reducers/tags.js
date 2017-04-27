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

export const tags = (state = [], action) => {
  switch(action.type) {
    case FETCH_TAGS_SUCCESS:
      return action.response;
    case CREATE_TAG_SUCCESS:
      return [...state, action.response];
    case DELETE_TAG_SUCCESS:
      return state.filter(tag => tag.id !== action.response.id);
    default:
      return state;
  }
};

export const tagOptions = (state = {
  isFetching: false,
  isCreating: false,
  isDeleting: false,
}, action) => {
  switch(action.type) {
    case FETCH_TAGS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_TAGS_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_TAGS_FAILURE:
      return {...state, isFetching: false, error: action.error};

    case CREATE_TAG_REQUEST:
      return {...state, isCreating: true};
    case CREATE_TAG_SUCCESS:
      return {...state, isCreating: false};
    case CREATE_TAG_FAILURE:
      return {...state, isCreating: false, error: action.error};

    case DELETE_TAG_REQUEST:
      return {...state, isDeleting: true};
    case DELETE_TAG_SUCCESS:
      return {...state, isDeleting: false};
    case DELETE_TAG_FAILURE:
      return {...state, isDeleting: false, error: action.error};
    default:
      return state;
  }
};
