import fetch from 'isomorphic-fetch';
//---FETCH_FOLDERS------------------------------------------------------------>
export const REQUEST_FETCH_FOLDERS = 'REQUEST_FETCH_FOLDERS';
export const requestFetchFolders = () => ({
  type: REQUEST_FETCH_FOLDERS,
});

export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
export const fetchFoldersSuccess = (folders) => ({
  type: FETCH_FOLDERS_SUCCESS,
  payload: folders,
});

export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE';
export const fetchFoldersFailure = (error) => ({
  type: FETCH_FOLDERS_FAILURE,
  payload: error,
});

export const fetchAllFolders = () => dispatch => {
  dispatch(requestFetchFolders());
  return fetch('/notes')
    .then(response => {
      if(response.ok) {return response.json();}
      else {
        return response.json().then(error => {
          throw new Error(`There is an error and it says ${error.message}`);
        });
      }
    })
    .then(folders => dispatch(fetchFoldersSuccess(folders)))
    .catch(error => dispatch(fetchFoldersFailure(error.message)));
};

/*export const shouldFetchFolders = (state) => {
  if(!state.folders.length > 0) {
    return true;
  } else if(state.options.isFetching) {
    return false;
  } else {
    return false;
  }
};

export const fetchFoldersIfNeeded = () => (dispatch, getState) => {
  if(shouldFetchFolders(getState())) {
    return dispatch(fetchAllFolders());
  } else {
    return Promise.resolve();
  }
};*/
//---CREATE_FOLDER------------------------------------------------------------>
export const REQUEST_CREATE_FOLDER = 'REQUEST_CREATE_FOLDER';
export const requestCreateFolder = () => ({
  type: REQUEST_CREATE_FOLDER,
});

export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const createFolderSuccess = (newFolder) => ({
  type: CREATE_FOLDER_SUCCESS,
  payload: newFolder,
});

export const CREATE_FOLDER_FAILURE = 'CREATE_FOLDER_FAILURE';
export const createFolderFailure = (error) => ({
  type: CREATE_FOLDER_FAILURE,
  payload: error,
});

export const createNewFolder = (parentId = '', name = 'New Folder') => dispatch => {
  dispatch(requestCreateFolder());
  return fetch('/notes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, parentId}),
  })
    .then(response => {
      if(response.ok) {return response.json();}
      else {
        return response.json().then(error => {
          throw new Error(`There is an error and it says ${error.message}`);
        });
      }
    })
    .then(newFolder => dispatch(createFolderSuccess(newFolder)))
    .catch(error => dispatch(createFolderFailure(error.message)));
};
//---RENAME_FOLDER------------------------------------------------------------>
export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';
export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id,
});

export const REQUEST_RENAME_FOLDER = 'REQUEST_RENAME_FOLDER';
export const requestRenameFolder = () => ({
  type: REQUEST_RENAME_FOLDER,
});

export const RENAME_FOLDER_SUCCESS = 'RENAME_FOLDER_SUCCESS';
export const renameFolderSuccess = (renamedFolder) => ({
  type: RENAME_FOLDER_SUCCESS,
  payload: renamedFolder,
});

export const RENAME_FOLDER_FAILURE = 'RENAME_FOLDER_FAILURE';
export const renameFolderFailure = (error) => ({
  type: RENAME_FOLDER_FAILURE,
  payload: error,
});

export const renameSelectedFolder = (id, newName) => dispatch => {
  dispatch(requestRenameFolder());
  return fetch('/notes', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, name: newName}),
  })
    .then(response => {
      if(response.ok) {return response.json();}
      else {
        return response.json().then(error => {
          throw new Error(`There is an error and it says ${error.message}`);
        });
      }
    })
    .then(renamedFolder => dispatch(renameFolderSuccess(renamedFolder)))
    .catch(error => dispatch(renameFolderFailure(error.message)));
};
//---DELETE_FOLDER------------------------------------------------------------>
export const REQUEST_DELETE_FOLDER = 'REQUEST_DELETE_FOLDER';
export const requestDeleteFolder = () => ({
  type: REQUEST_DELETE_FOLDER,
});

export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';
export const deleteFolderSuccess = (id, payload) => ({
  type: DELETE_FOLDER_SUCCESS,
  id,
  payload,
});

export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE';
export const deleteFolderFailure = (error) => ({
  type: DELETE_FOLDER_FAILURE,
  payload: error,
});

export const deleteSelectedFolder = (id) => dispatch => {
  dispatch(requestDeleteFolder());
  return fetch('/notes', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  })
    .then(response => {
      if(response.ok) {return response.json();}
      else {
        return response.json().then(error => {
          throw new Error(`There is an error and it says ${error.message}`);
        });
      }
    })
    .then(payload => dispatch(deleteFolderSuccess(id, payload)))
    .catch(error => dispatch(deleteFolderFailure(error.message)));
};

export const MOVE_FOLDER = 'MOVE_FOLDER';
export const moveFolder = (dragIndex, hoverIndex) => ({
  type: MOVE_FOLDER,
  dragIndex,
  hoverIndex,
});
