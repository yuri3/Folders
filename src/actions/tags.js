import {CALL_API} from '../middleware/api';
//---FETCH_ALL_TAGS------------------------------------------------------------>
export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

const fetchTags = (noteId) => ({
  [CALL_API]: {
    types: [FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE],
    endpoint: `tags/${noteId}`,
  }
});

export const fetchAllTags = (noteId) => dispatch => {
  dispatch(fetchTags(noteId));
};
//---ADD_TAG_IN_VIEW------------------------------------------------------------>
export const ADD_TAG_IN_VIEW = 'ADD_TAG_IN_VIEW';
export const addTag = (noteId, label) => ({
  type: ADD_TAG_IN_VIEW,
  noteId,
  label,
});
