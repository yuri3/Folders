import {
  SET_STATUS,
  CREATE_FOLDER,
  SELECT_RENAME_INPUT,
  RENAME_FOLDER,
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
          id: action.id,
          name: action.name,
          parentId: action.parentId,
        };
      }
      return {
        id: action.id,
        name: action.name,
      };
    case RENAME_FOLDER:
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
    case RENAME_FOLDER:
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
    case SELECT_RENAME_INPUT:
      return {...state, renameId: action.id};
    default:
      return state;
  }
};

const status = (state = '', action) => {
  switch(action.type) {
    case SET_STATUS:
      return action.status;
    case CREATE_FOLDER:
      return action.type;
    case SELECT_RENAME_INPUT:
      return action.type;
    case REMOVE_FOLDER:
      return action.type;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  folders,
  options,
  status,
});

export default rootReducer;
