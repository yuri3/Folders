import {CALL_API} from '../middleware/api';
//---FETCH_ALL_TAGS------------------------------------------------------------>
export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

const fetchTags = (noteId) => ({
  [CALL_API]: {
    types: [FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE],
    endpoint: `tags/${noteId ? noteId : 'null'}`,
  }
});

export const fetchAllTags = (noteId) => dispatch => {
  dispatch(fetchTags(noteId));
};
//---CREATE_TAG---------------------------------------------------------------->
export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE';

const createTag = (noteId, requestOptions) => ({
  [CALL_API]: {
    types: [CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE],
    endpoint: `tags/${noteId}`,
    requestOptions,
  }
});

export const addTag = (noteId, order, label) => dispatch => {
  dispatch(createTag(noteId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({order, label}),
  }));
};
//---DELETE_TAG---------------------------------------------------------------->
export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';

const removeTag = (requestOptions) => ({
  [CALL_API]: {
    types: [DELETE_TAG_REQUEST, DELETE_TAG_SUCCESS, DELETE_TAG_FAILURE],
    endpoint: 'tags/:folderId',
    requestOptions,
  }
});

export const deleteTag = (id) => dispatch => {
  dispatch(removeTag({
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  }));
};
