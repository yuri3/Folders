import uuidV1 from 'uuid/v1';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  SELECT_CREATE_INPUT,
  CREATE_FOLDER,
  SELECT_RENAME_INPUT,
  RENAME_FOLDER,
  REMOVE_FOLDER,
  CREATE_NOTE,
  REMOVE_NOTE
} from '../actions/actions';

const FOLDERS = [
  {
    id: uuidV1(),
    name: 'HTML',
    notes: [],
  },
  {
    id: uuidV1(),
    name: 'CSS',
    notes: [],
  },
  {
    id: uuidV1(),
    name: 'JavaScript',
    notes: [
      {
        id: uuidV1(),
        name: 'ES6',
        description: '',
      },
      {
        id: uuidV1(),
        name: 'ES7',
        description: '',
      }
    ]
  },
  {
    id: uuidV1(),
    name: 'React',
    notes: [],
  },
  {
    id: uuidV1(),
    name: 'Angular2',
    notes: [],
  },
  {
    id: uuidV1(),
    name: 'NodeJS',
    notes: [],
  },
  {
    id: uuidV1(),
    name: 'Webpack',
    notes: [],
  },
];

const folder = (state = {}, action) => {
  switch(action.type) {
    case CREATE_FOLDER:
      if(action.name === 'New Folder') {
        return {
          id: action.id,
          name: action.name,
          parentId: action.parentId,
          notes: [],
        };
      }
      return {
        id: action.id,
        name: action.name,
        notes: [],
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

const note = (state = [], action) => {
  switch(action.type) {
    case CREATE_NOTE:
      const {id, name} = action;
      return [
        {
          id,
          name,
          description: '',
        },
        ...state,
      ];
    case REMOVE_NOTE:
      return state.filter((note) => note.id !== action.id);
    default:
      return state;
  }
};

const folders = (state = FOLDERS, action) => {
  switch(action.type) {
    case CREATE_FOLDER:
      return [
        folder(undefined, action),
        ...state
      ];
    case RENAME_FOLDER:
      return state.map((f) => folder(f, action));
    case REMOVE_FOLDER:
      return state.filter((f) => folder(f, action));
    case CREATE_NOTE:
      return state.map((folder) => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    case REMOVE_NOTE:
      return state.map((folder) => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          }
        }
        return folder;
      });
    default:
      return state;
  }
};

const options = (state = {
  renameId: null,
  isSelected: false,
}, action) => {
  switch(action.type) {
    case SELECT_CREATE_INPUT:
      return {...state, isSelected: action.isSelected};
    case SELECT_RENAME_INPUT:
      return {...state, renameId: action.id};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  folders,
  options,
  form: formReducer,
});

export default rootReducer;
