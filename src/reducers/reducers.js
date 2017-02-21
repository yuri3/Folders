

import { 
  SET_STATUS, 
  FOLDER_STATUS,
  SWITCH_CREATE_INPUT,
  SWITCH_RENAME_INPUT,
  CREATE_FOLDER,
  REMOVE_FOLDER
} from '../actions/actions';

import { combineReducers } from 'redux';

const FOLDERS = [
  {
    id: 'HTML',
    name: 'HTML',
  },
  {
    id: 'CSS',
    name: 'CSS',
  },
  {
    id: 'JavaScript',
    name: 'JavaScript',
  },
  {
    id: 'React',
    name: 'React',
  },
  {
    id: 'Angular2',
    name: 'Angular2',
  },
  {
    id: 'NodeJS',
    name: 'NodeJS',
  },
  {
    id: 'Webpack',
    name: 'Webpack',
  },
];

const folder = (state = {id: 0}, action) => {
  switch(action.type) {
    case CREATE_FOLDER:
      if(/New Folder/.test(action.name)) {
        return {
          id: state.id,
          name: action.name,
          parentId: action.id,
        };
      }
      return {
        id: action.id,
        name: action.name,
      };
    case FOLDER_STATUS.IS_RENAME_DONE:
      if(state.id !== action.id) {return state;}
      return {...state, name: action.newName};
    case REMOVE_FOLDER:
      if(state.id !== action.id) {
        return state;
      }
      break;
    default:
      return state;
  }
};

const folders = (state = FOLDERS, action) => {
  switch(action.type) {
    case CREATE_FOLDER:
      return [
        ...state,
        folder(undefined, action)
      ];
    case FOLDER_STATUS.IS_RENAME_DONE:
      return state.map((f) => folder(f, action));
    case REMOVE_FOLDER:
      return state.filter((f) => folder(f, action));
    default:
      return state;
  }
};

const options = (state = {
  renameId: null,
}, action) => {
  switch(action.type) {
    case SWITCH_CREATE_INPUT:
      return {...state, createId: action.id};
    case SWITCH_RENAME_INPUT:
      return {...state, renameId: action.id};
    default:
      return state;
  }
};

const status = (state = '', action) => {
  switch(action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return state;
  }
};

/*
const rootReducer = (state = {}, action) => ({
  status: status(state.status, action),
  options: options(state.options, action),
  folders: folders(state.folders, action),
});*/

const rootReducer = combineReducers({
  status,
  options,
  folders,
});

export default rootReducer;
