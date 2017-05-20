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
} from '../actions/folders';

function remove(state, id) {
  state = state.filter(folder => folder.id !== id);
  const subFolder = state.find(folder => folder.parentId === id);
  if(subFolder) {
    state = remove(state, subFolder.id);
  } else {
    return state;
  }
  return remove(state, id);
}

const initialState = {
  isFetching: false,
  isCreating: false,
  isRenaming: false,
  isDeleting: false,
  error: null,
  lists: [],
  createId: null,
  renameId: null,
  deleteId: null,
};

export default (state = initialState, action) => {
  const {type, response, error, id, dragIndex, hoverIndex} = action;
  switch(type) {
    case FETCH_FOLDERS_REQUEST:
      return {...state, isFetching: true, error: null, lists: []};
    case FETCH_FOLDERS_SUCCESS:
      return {...state, isFetching: false, error: null, lists: response};
    case FETCH_FOLDERS_FAILURE:
      return {...state, isFetching: false, error, lists: []};

    case SELECT_CREATE_FOLDER:
      return {...state, createId: id};
    case CREATE_FOLDER_REQUEST:
      return {...state, isCreating: true};
    case CREATE_FOLDER_SUCCESS:
      return {...state, isCreating: false, error: null, lists: [response, ...state.lists]};
    case CREATE_FOLDER_FAILURE:
      return {...state, isCreating: false, error};

    case SELECT_RENAME_INPUT:
      return {...state, renameId: id};
    case RENAME_FOLDER_REQUEST:
      return {...state, isRenaming: true};
    case RENAME_FOLDER_SUCCESS:
      const lists = state.lists.map(folder => {
        if(folder.id !== response.id) {return folder;}
        return {
          ...folder,
          name: response.name,
        };
      });
      return {...state, isRenaming: false, error: null, lists};
    case RENAME_FOLDER_FAILURE:
      return {...state, isRenaming: false, error};

    case SELECT_DELETE_FOLDER:
      return {...state, deleteId: id};
    case DELETE_FOLDER_REQUEST:
      return {...state, isDeleting: true};
    case DELETE_FOLDER_SUCCESS:
      return {...state, isDeleting: false, error: null, lists: remove(state.lists, response.id)};
    case DELETE_FOLDER_FAILURE:
      return {...state, isDeleting: false, error};

    case MOVE_FOLDER_IN_VIEW:
      const dragFolder = state.lists[dragIndex];
      const newCopyFolders = state.lists.slice();
      newCopyFolders.splice(dragIndex, 1);
      newCopyFolders.splice(hoverIndex, 0, dragFolder);
      return {...state, lists: newCopyFolders};
    default:
      return state;
  }
};
