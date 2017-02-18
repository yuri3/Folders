

import { 
  SET_STATUS, 
  FOLDER_STATUS,
  SWITCH_RENAME_INPUT 
} from '../actions/actions';

import { combineReducers } from 'redux';

const FOLDERS = [
  {
    id: 1,
    name: 'HTML',
  },
  {
    id: 2,
    name: 'CSS',
  },
  {
    id: 3,
    name: 'JavaScript',
  },
  {
    id: 4,
    name: 'React',
  },
  {
    id: 5,
    name: 'Angular2',
  },
  {
    id: 6,
    name: 'NodeJS',
  },
  {
    id: 7,
    name: 'Webpack',
  }
];

const folder = (state = {}, action) => {
  switch(action.type) {
    case FOLDER_STATUS.IS_CREATE_DONE:
      return {
        id: action.id,
        name: action.name,
      }
    case FOLDER_STATUS.IS_RENAME_DONE:
      if(state.id !== action.id) {return state;}
      return {...state, name: action.newName};
    case FOLDER_STATUS.IS_REMOVE_DONE:
      if(state.id !== action.id) {
        return state;
      }
      break;
    default:
      return state;
  }
}

const folders = (state = FOLDERS, action) => {
  switch(action.type) {
    case FOLDER_STATUS.IS_CREATE_DONE:
      return [
        ...state,
        folder(undefined, action)
      ];
    case FOLDER_STATUS.IS_RENAME_DONE:
      return state.map((f) => folder(f, action));
    case FOLDER_STATUS.IS_REMOVE_DONE:
      return state.filter((f) => folder(f, action));
    default:
      return state;
  }
}

const options = (state = {
  selected: null
}, action) => {
  switch(action.type) {
    case SWITCH_RENAME_INPUT:
      return {...state, selected: action.id};
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
