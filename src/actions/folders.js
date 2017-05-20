import {CALL_API} from '../middleware/api';
//---FETCH_FOLDERS------------------------------------------------------------>
export const FETCH_FOLDERS_REQUEST = 'FETCH_FOLDERS_REQUEST';
export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE';

const fetchFolders = () => ({
  [CALL_API]: {
    types: [FETCH_FOLDERS_REQUEST, FETCH_FOLDERS_SUCCESS, FETCH_FOLDERS_FAILURE],
    endpoint: 'folders',
  }
});

export const fetchAllFolders = () => dispatch => {
  dispatch(fetchFolders());
};
//---CREATE_FOLDER------------------------------------------------------------>
export const SELECT_CREATE_FOLDER = 'SELECT_CREATE_FOLDER';
export const selectCreateFolder = (id) => ({
  type: SELECT_CREATE_FOLDER,
  id,
});

export const CREATE_FOLDER_REQUEST = 'CREATE_FOLDER_REQUEST';
export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const CREATE_FOLDER_FAILURE = 'CREATE_FOLDER_FAILURE';

const createFolder = (requestOptions) => ({
  [CALL_API]: {
    types: [CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, CREATE_FOLDER_FAILURE],
    endpoint: 'folders',
    requestOptions,
  }
});

export const createNewFolder = (parentId = '', name = 'New Folder') => dispatch => {
  dispatch(createFolder({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({parentId, name}),
  }));
};
//---RENAME_FOLDER------------------------------------------------------------>
export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';
export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id,
});

export const RENAME_FOLDER_REQUEST = 'RENAME_FOLDER_REQUEST';
export const RENAME_FOLDER_SUCCESS = 'RENAME_FOLDER_SUCCESS';
export const RENAME_FOLDER_FAILURE = 'RENAME_FOLDER_FAILURE';

const renameFolder = (requestOptions) => ({
  [CALL_API]: {
    types: [RENAME_FOLDER_REQUEST, RENAME_FOLDER_SUCCESS, RENAME_FOLDER_FAILURE],
    endpoint: 'folders',
    requestOptions,
  }
});

export const renameSelectedFolder = (id, newName) => dispatch => {
  dispatch(renameFolder({
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, name: newName}),
  }));
};
//---DELETE_FOLDER------------------------------------------------------------>
export const SELECT_DELETE_FOLDER = 'SELECT_DELETE_FOLDER';
export const selectDeleteFolder = (id) => ({
  type: SELECT_DELETE_FOLDER,
  id,
});

export const DELETE_FOLDER_REQUEST = 'DELETE_FOLDER_REQUEST';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';
export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE';

const deleteFolder = (requestOptions) => ({
  [CALL_API]: {
    types: [DELETE_FOLDER_REQUEST, DELETE_FOLDER_SUCCESS, DELETE_FOLDER_FAILURE],
    endpoint: 'folders',
    requestOptions,
  }
});

export const deleteSelectedFolder = (id) => dispatch => {
  dispatch(deleteFolder({
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  }));
};
//---MOVE_FOLDER-------------------------------------------------------------->
export const MOVE_FOLDER_IN_VIEW = 'MOVE_FOLDER_IN_VIEW';

export const moveSelectedFolder = (data) => ({
  type: MOVE_FOLDER_IN_VIEW,
  dragIndex: data.dragIndex,
  hoverIndex: data.hoverIndex,
});
