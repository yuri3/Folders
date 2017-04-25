import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  ADD_TAG_IN_VIEW,
} from '../actions/tags';

export const tags = (state = [], action) => {
  switch(action.type) {
    case FETCH_TAGS_SUCCESS:
      return action.response;
    case ADD_TAG_IN_VIEW:
      return [
        ...state,
        {
          //id: state[state.length - 1].id + 1,
          label: action.label,
          noteId: Number.parseInt(action.noteId, 10),
          order: state.length,
          //createdAt: new Date().getTime().toString(),
          //updatedAt: new Date().getTime().toString(),
        }
      ];
    default:
      return state;
  }
};

export const tagOptions = (state = {isFetching: false}, action) => {
  switch(action.type) {
    case FETCH_TAGS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_TAGS_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_TAGS_FAILURE:
      return {...state, isFetching: false, error: action.error};
    default:
      return state;
  }
};
