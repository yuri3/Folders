import {
  FETCH_FOLDERS_REQUEST,
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_FAILURE,
  SELECT_CREATE_FOLDER,
  CREATE_FOLDER_REQUEST,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_FAILURE,
  SELECT_RENAME_INPUT,
  RENAME_FOLDER_REQUEST,
  RENAME_FOLDER_SUCCESS,
  RENAME_FOLDER_FAILURE,
  SELECT_DELETE_FOLDER,
  DELETE_FOLDER_REQUEST,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILURE,
  MOVE_FOLDER_IN_VIEW,
} from '../actions/folder_Actions';

export const folders = (state = [], action) => {
  switch(action.type) {
    case FETCH_FOLDERS_SUCCESS:
      return action.response;
    case CREATE_FOLDER_SUCCESS:
      return [action.response, ...state];
    case RENAME_FOLDER_SUCCESS:
      return state.map((folder) => {
        if(folder.id !== action.response.id) {return folder;}
        return {
          ...folder,
          name: action.response.name,
        };
      });
    case DELETE_FOLDER_SUCCESS:
      function deleteAllSubFolders(
        index = 0, newArr = state, id = action.response.id, parentId = action.response.parentId
      ) {
        if(index >= state.length) {
          return newArr;
        }
        newArr = newArr.filter(
          folder => folder.id !== action.response.id && folder.parentId !== id
        );
        if(newArr.length === state.length - 1) {
          return deleteAllSubFolders(state.length, newArr);
        }
        id = !parentId ? state[index].id : id;
        index = parentId ? state.length : index;
        return deleteAllSubFolders(index + 1, newArr, id);
      }
      return deleteAllSubFolders();
    case MOVE_FOLDER_IN_VIEW:
      const {dragIndex, hoverIndex} = action;
      const dragFolder = state[dragIndex];
      const newCopyFolders = state.slice();
      newCopyFolders.splice(dragIndex, 1);
      newCopyFolders.splice(hoverIndex, 0, dragFolder);
      return newCopyFolders;
    default:
      return state;
  }
};

export const folderOptions = (state = {
  isFetching: false,
  isCreating: false,
  isRenaming: false,
  isDeleting: false,
  createId: null,
  renameId: null,
  deleteId: null,
}, action) => {
  switch(action.type) {
    case FETCH_FOLDERS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_FOLDERS_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_FOLDERS_FAILURE:
      return {...state, isFetching: false, error: action.payload};

    case CREATE_FOLDER_REQUEST:
      return {...state, isCreating: true};
    case CREATE_FOLDER_SUCCESS:
      return {...state, isCreating: false};
    case CREATE_FOLDER_FAILURE:
      return {...state, isCreating: false, error: action.payload};

    case DELETE_FOLDER_REQUEST:
      return {...state, isDeleting: true};
    case DELETE_FOLDER_SUCCESS:
      return {...state, isDeleting: false};
    case DELETE_FOLDER_FAILURE:
      return {...state, isDeleting: false, error: action.payload};

    case RENAME_FOLDER_REQUEST:
      return {...state, isRenaming: true};
    case RENAME_FOLDER_SUCCESS:
      return {...state, isRenaming: false};
    case RENAME_FOLDER_FAILURE:
      return {...state, isRenaming: false, error: action.payload};

    case SELECT_CREATE_FOLDER:
      return {...state, createId: action.id};
    case SELECT_RENAME_INPUT:
      return {...state, renameId: action.id};
    case SELECT_DELETE_FOLDER:
      return {...state, deleteId: action.id};
    default:
      return state;
  }
};
