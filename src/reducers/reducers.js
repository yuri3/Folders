import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//import { routerReducer } from 'react-router-redux';
import {
  CREATE_FOLDER,
  SELECT_RENAME_INPUT,
  RENAME_FOLDER,
  REMOVE_FOLDER,
  MOVE_FOLDER,
  CREATE_NOTE,
  REMOVE_NOTE,
  CHANGE_NOTE_NAME,
  UPDATE_TAG_FLAG,
  ADD_TAG,
  REMOVE_TAG,
  CHANGE_DESCRIPTION,
  SEARCH_NOTES,
  MOVE_NOTE
} from '../actions/actions';

const FOLDERS = [
  {
    id: '1',
    name: 'HTML',
  },
  {
    id: '2',
    name: 'CSS',
  },
  {
    id: '3',
    name: 'JavaScript',
  },
  {
    id: '4',
    name: 'React',
  },
  {
    id: '5',
    name: 'Angular',
  },
  {
    id: '6',
    name: 'NodeJS',
  },
  {
    id: '7',
    name: 'Webpack',
  },
];

const NOTES = [
  {
    parentFolderId: '3',
    id: '8',
    name: 'ES6',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '3',
    id: '9',
    name: 'es7',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '4',
    id: '10',
    name: 'React Native',
    description: '',
    hasTags: true,
  },
  {
    parentFolderId: '4',
    id: '11',
    name: 'React Router',
    description: '',
    hasTags: false,
  },
  {
    parentFolderId: '5',
    id: '12',
    name: 'Angular Native',
    description: '',
    hasTags: true,
  }
];

const TAGS = [
  {
    parentNoteId: '8',
    key: '1',
    label: 'ES6',
  },
  {
    parentNoteId: '9',
    key: '2',
    label: 'ES7',
  },
  {
    parentNoteId: '10',
    key: '3',
    label: 'NATIVE',
  },
  {
    parentNoteId: '10',
    key: '4',
    label: 'ES7'
  },
  {
    parentNoteId: '12',
    key: '5',
    label: 'ES7'
  }
];

const tags = (state = TAGS, action) => {
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

const notes = (state = NOTES, action) => {
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

const folders = (state = FOLDERS, action) => {
  switch(action.type) {
    case CREATE_FOLDER:
      if(action.name === 'New Folder') {
        return [
          {
            parentId: action.parentId,
            id: action.id,
            name: action.name,
          },
          ...state
        ];
      }
      return [
        {
          id: action.id,
          name: action.name,
          notes: [],
        },
        ...state
      ];
    case RENAME_FOLDER:
      return state.map((folder) => {
        if(folder.id !== action.id) {return folder;}
        return {
          ...folder,
          name: action.newName,
        };
      });
    case REMOVE_FOLDER:
      return state.filter((folder) => folder.id !== action.id);
    case MOVE_FOLDER:
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
  renameId: null,
  foundNotes: {
    searchText: '',
    matchInTitles: [],
    matchInTags: [],
    matchInDescriptions: [],
  }
}, action) => {
  switch(action.type) {
    case SELECT_RENAME_INPUT:
      return {...state, renameId: action.id};
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
  //router: routerReducer,
});

export default rootReducer;
