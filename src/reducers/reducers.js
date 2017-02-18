

import { SET_STATUS, CREATE_SUBFOLDER, STATUS } from '../actions/actions';

//import { combineReducers } from 'redux';

const FOLDERS = [
  {
    id: 1,
    name: 'HTML',
    isRename: false,
  },
  {
    id: 2,
    name: 'CSS',
    isRename: false,
  },
  {
    id: 3,
    name: 'JavaScript',
    isRename: false,
    subfolders: [
      {
        id: 31,
        name: 'ES6',
        isRename: false,
      },
      {
        id: 32,
        name: 'ES7',
        isRename: false,
      }
    ]
  },
  {
    id: 4,
    name: 'React',
    isRename: false,
  },
  {
    id: 5,
    name: 'Angular2',
    isRename: false,
  },
  {
    id: 6,
    name: 'NodeJS',
    isRename: false,
  },
  {
    id: 7,
    name: 'Webpack',
    isRename: false,
  }
];

const status = (state = '', action) => {
  switch(action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return state;
  }
}

const folder = (state = {}, action) => {
  switch(action.type) {
    case STATUS.IS_CREATE_DONE:
      return {
        id: action.id,
        name: action.name,
        isRename: false,
        defaultValue: action.name,
      }
    case STATUS.IS_RENAME: 
      if(state.id !== action.id) {return state;}

      return Object.assign({}, state, {isRename: true});
    case STATUS.IS_RENAME_CANCEL:
      if(!state.isRename) {return state;}

      return Object.assign({}, state, {isRename: false});
    case STATUS.IS_RENAME_DONE:
      if(state.id !== action.id) {return state;}

      return Object.assign({}, state, {name: action.newName});
    case STATUS.IS_REMOVE_DONE:
      if(state.id !== action.id) {
        return state;
      }
      break;
    default:
      return state;
  }
}

const subfolders = (state = [], action) => {
  switch(action.type) {
    case CREATE_SUBFOLDER:
      if(!state['subfolders']) {
        state['subfolders'] = [];
      }
      state.subfolders = state.subfolders.concat([
        {
          id: state.subfolders.length + 1,
          name: action.name,
          isRename: false,
        }
      ]);
      break;
    default:
      return state;
  }
}

const folders = (state = FOLDERS, action) => {
  switch(action.type) {
    case STATUS.IS_CREATE_DONE:
      return [
        ...state,
        folder(undefined, action)
      ];
    case STATUS.IS_RENAME:
      return state.map((f) => folder(f, action));
    case STATUS.IS_RENAME_CANCEL:
      return state.map((f) => folder(f, action));
    case STATUS.IS_RENAME_DONE:
      return state.map((f) => folder(f, action));
    case STATUS.IS_REMOVE_DONE:
      return state.filter((f) => folder(f, action));
    case CREATE_SUBFOLDER:
      state.forEach((f) => {
        if(f.id === action.parentFolderId) {
          subfolders(f, action);
        }
      });
      return state;
    default:
      return state;
  }
}

const foldersApp = (state = {}, action) => {
  return {
    status: status(state.status, action),
    folders: folders(state.folders, action),
  }
}
/*
const foldersApp = combineReducers({
  folders
});
*/
export default foldersApp;
