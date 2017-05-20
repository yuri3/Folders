import {CALL_API} from '../middleware/api';
//---FETCH_ALL_NOTES------------------------------------------------------------>
export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

const fetchNotes = (params) => ({
  [CALL_API]: {
    types: [FETCH_NOTES_REQUEST, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE],
    endpoint: `notes/${params.folderId ? params.folderId : 'null'}`,
  }
});

export const fetchAllNotes = (params) => dispatch => {
  dispatch(fetchNotes(params));
};
//---CREATE_NOTE------------------------------------------------------------>
export const CREATE_NOTE_REQUEST = 'CREATE_NOTE_REQUEST';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';

const createNote = (folderId, requestOptions) => ({
  [CALL_API]: {
    types: [CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE],
    endpoint: `notes/${folderId}`,
    requestOptions,
  }
});

export const createNewNote = (folderId, name = 'New Note') => dispatch => {
  dispatch(createNote(folderId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, description: ''}),
  }));
};
//---UPDATE_NOTE_NAME_IN_VIEW----------------------------------------------->
export const UPDATE_NOTE_NAME_IN_VIEW = 'UPDATE_NOTE_NAME_IN_VIEW';
export const updateNoteName = (id, newName) => ({
  type: UPDATE_NOTE_NAME_IN_VIEW,
  id,
  newName,
});
//---DELETE_NOTE------------------------------------------------------------>
export const SELECT_DELETE_NOTE = 'SELECT_DELETE_NOTE';
export const selectDeleteNote = (id) => ({
  type: SELECT_DELETE_NOTE,
  id,
});

export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';

const deleteNote = (requestOptions) => ({
  [CALL_API]: {
    types: [DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE],
    endpoint: 'notes/:folderId',
    requestOptions,
  }
});

export const deleteSelectedNote = (id) => dispatch => {
  dispatch(deleteNote({
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  }));
};
//---MOVE_NOTE----------------------------------------------------------------->
export const MOVE_NOTE_IN_VIEW = 'MOVE_NOTE_IN_VIEW';

export const moveSelectedNote = (data) => ({
  type: MOVE_NOTE_IN_VIEW,
  dragIndex: data.dragIndex,
  hoverIndex: data.hoverIndex,
});
//---SEARCH_NOTES---------------------------------------------------------------->
export const SEARCH_NOTES_REQUEST = 'SEARCH_NOTES_REQUEST';
export const SEARCH_NOTES_SUCCESS = 'SEARCH_NOTES_SUCCESS';
export const SEARCH_NOTES_FAILURE = 'SEARCH_NOTES_FAILURE';

const findNotes = (searchText, isDeep) => ({
  [CALL_API]: {
    types: [SEARCH_NOTES_REQUEST, SEARCH_NOTES_SUCCESS, SEARCH_NOTES_FAILURE],
    endpoint: isDeep ? `notes/search?deepQ=${searchText}` : `notes/search?q=${searchText}`,
  }
});

export const searchNotes = (searchText, isDeep) => dispatch => {
  dispatch(findNotes(searchText, isDeep));
};
