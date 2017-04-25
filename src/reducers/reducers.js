import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
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
  CREATE_NOTE,
  REMOVE_NOTE,
  CHANGE_NOTE_NAME,
  UPDATE_TAG_FLAG,
  ADD_TAG,
  REMOVE_TAG,
  CHANGE_DESCRIPTION,
  SEARCH_NOTES,
  MOVE_NOTE
} from '../actions/folders';

/*const FOLDERS = [
  {
    id: '7',
    name: 'HTML',
  },
  {
    id: '6',
    name: 'CSS',
  },
  {
    id: '5',
    name: 'JavaScript',
  },
  {
    id: '4',
    name: 'React',
  },
  {
    id: '3',
    name: 'Angular',
  },
  {
    id: '2',
    name: 'NodeJS',
  },
  {
    id: '1',
    name: 'Webpack',
  },
];*/
/*
const NOTES = [
  {
    parentFolderId: '5',
    id: '8',// 1
    name: 'ES6',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '5',
    id: '9',// 2
    name: 'es7',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '4',
    id: '10',// 3
    name: 'React Native',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '4',
    id: '11',// 4
    name: 'React Router',
    description: '',
    hasTags: false,
  },
  {
    parentFolderId: '3',
    id: '12',// 5
    name: 'Angular Native',
    description: '',
    hasTags: true,
  }
];

const TAGS = [
  {
    parentNoteId: '8',// 1
    key: '1',
    label: 'ES6',
  },
  {
    parentNoteId: '9',// 2
    key: '2',
    label: 'ES7',
  },
  {
    parentNoteId: '10',// 3
    key: '3',
    label: 'NATIVE',
  },
  {
    parentNoteId: '10',// 3
    key: '4',
    label: 'ES7'
  },
  {
    parentNoteId: '12',// 5
    key: '5',
    label: 'ES7'
  }
];*/

const tags = (state = [], action) => {
  switch(action.type) {
    case ADD_TAG:
      return [
        ...state,
        {
          parentNoteId: action.parentNoteId,
          key: action.key,
          label: action.label,
        }
      ];
    case REMOVE_TAG:
      const {parentNoteId} = action;
      return parentNoteId ?
        (state.filter(tag => tag.parentNoteId !== parentNoteId)) :
        (state.filter(tag => tag.key !== action.key));
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch(action.type) {
    case CREATE_NOTE:
      const {parentFolderId, id, name} = action;
      return [
        {
          parentFolderId,
          id,
          name,
          description: '',
          hasTags: false,
        },
        ...state,
      ];
    case REMOVE_NOTE:
      return state.filter((note) => note.id !== action.id);
    case CHANGE_NOTE_NAME:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            name: action.newName,
          };
        }
        return note;
      });
    case CHANGE_DESCRIPTION:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            description: action.description,
          };
        }
        return note;
      });
    case UPDATE_TAG_FLAG:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            hasTags: !note.hasTags,
          }
        }
        return note;
      });
    case MOVE_NOTE:
      const {dragIndex, hoverIndex} = action;
      const dragNote = state[dragIndex];
      const newCopyNotes = state.slice();
      newCopyNotes.splice(dragIndex, 1);
      newCopyNotes.splice(hoverIndex, 0, dragNote);
      return newCopyNotes;
    default:
      return state;
  }
};

const folders = (state = [], action) => {
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
      function deleteAllSubFolders(index = 0, newArr = []) {
        if(index >= state.length) {
          const parentFolderIndex = newArr.findIndex(
            folder => folder.id === action.response.id
          );
          newArr.splice(parentFolderIndex, 1);

          return newArr;
        }
        if(state[index].parentId !== action.response.id) {
          newArr.push(state[index]);
        }
        return deleteAllSubFolders(index + 1, newArr);
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

const options = (state = {
  isFetching: false,
  isCreating: false,
  isRenaming: false,
  isDeleting: false,
  createId: null,
  renameId: null,
  deleteId: null,
  foundNotes: {
    searchText: '',
    matchInTitles: [],
    matchInTags: [],
    matchInDescriptions: [],
  }
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
    case SEARCH_NOTES:
      const {notes, tags, searchText} = action;
      const matchInTitles = (searchText !== '' &&
        notes.filter(({name}) => {
          return name.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
        })
      );
      const matchInTags = (searchText !== '' && tags.reduce((matchInTags, tag) => {
        const isMatch = !matchInTags.some(({label}) => label === tag.label) &&
          tag.label.indexOf(searchText.toUpperCase()) > -1;
        return isMatch ? matchInTags.push(tag) && matchInTags : matchInTags;
      }, []));
      return {
        ...state,
        foundNotes: {
          ...state.foundNotes,
          searchText,
          matchInTitles: matchInTitles || [],
          matchInTags: matchInTags || [],
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  folders,
  notes,
  tags,
  options,
  form: formReducer,
});

export default rootReducer;
