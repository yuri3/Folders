import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//import { routerReducer } from 'react-router-redux';
import {
  CREATE_FOLDER,
  SELECT_RENAME_INPUT,
  RENAME_FOLDER,
  REMOVE_FOLDER,
  CREATE_NOTE,
  REMOVE_NOTE,
  REMOVE_FOUND_NOTE,
  CHANGE_NOTE_NAME,
  ADD_TAG,
  REMOVE_TAG,
  CHANGE_DESCRIPTION,
  SEARCH_NOTES,
  SEARCH_NOTES_BY_TAG,
  MOVE_NOTE,
  MOVE_FOUND_NOTE,
  MOVE_FOUND_NOTE_BY_TAG
} from '../actions/actions';

const FOLDERS = [
  {
    id: '1',
    name: 'HTML',
    notes: [],
  },
  {
    id: '2',
    name: 'CSS',
    notes: [],
  },
  {
    id: '3',
    name: 'JavaScript',
    notes: [
      {
        parentId: '3',
        id: '4',
        name: 'ES6',
        description: '',
        tags: [{key: '0', label: 'JavaScriptES7'}, {key: '1', label: 'ES8'}],
      },
      {
        parentId: '3',
        id: '5',
        name: 'es7',
        description: '',
        tags: [{key: '2', label: 'ES8'}],
      }
    ]
  },
  {
    id: '6',
    name: 'React',
    notes: [],
  },
  {
    id: '7',
    name: 'Angular2',
    notes: [],
  },
  {
    id: '8',
    name: 'NodeJS',
    notes: [],
  },
  {
    id: '9',
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
      const {parentId, id, name} = action;
      return [
        {
          parentId,
          id,
          name,
          description: '',
          tags: [],
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
    case ADD_TAG:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            tags: [
              ...note.tags,
              {
                key: action.key,
                label: action.label,
              }
            ],
          };
        }
        return note;
      });
    case REMOVE_TAG:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            tags: note.tags.filter(tag => tag.key !== action.key),
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
          };
        }
        return folder;
      });
    case CHANGE_NOTE_NAME:
      return state.map(folder => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    case ADD_TAG:
      return state.map(folder => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    case REMOVE_TAG:
      return state.map(folder => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    case CHANGE_DESCRIPTION:
      return state.map(folder => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    case MOVE_NOTE:
      return state.map(folder => {
        if(folder.id === action.parentId) {
          return {
            ...folder,
            notes: note(folder.notes, action),
          };
        }
        return folder;
      });
    default:
      return state;
  }
};

const options = (state = {
  renameId: null,
  foundNotes: {
    searchText: '',
    matchInTitles: null,
    matchInTags: null,
    matchInDescriptions: null,
  },
  foundNotesByTag: null,
}, action) => {
  switch(action.type) {
    case SELECT_RENAME_INPUT:
      return {...state, renameId: action.id};
    case SEARCH_NOTES:
      const {notes, searchText} = action;
      const matchInTitles = (searchText !== '' && notes.filter(({name}) => {
        return name.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
      }));
      const matchInTags = [];
      (searchText !== '' && notes.forEach(({tags}) => {
        tags.forEach((tag) => {
          const isMatch = tag.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
          isMatch && matchInTags.push(tag);
        });
      }));
      return {
        ...state,
        foundNotes: {
          ...state.foundNotes,
          searchText,
          matchInTitles: matchInTitles || [],
          matchInTags: matchInTags || [],
        },
        foundNotesByTag: null,
      };
    case SEARCH_NOTES_BY_TAG:
      const foundNotesByTag = action.notes.reduce((prev, curr) => {
        const {tags} = curr;
        (tags.length > 0 && tags.forEach((tag) => {
          if(tag.label === action.label) {
            prev.push(curr);
          }
        }));
        return prev;
      }, []);
      return {
        ...state,
        foundNotes: {
          searchText: action.label,
          matchInTitles: null,
          matchInTags: null,
          matchInDescriptions: null,
        },
        foundNotesByTag,
      };
    case MOVE_FOUND_NOTE:
      const {foundNotes} = state;
      const {dragIndex, hoverIndex} = action;
      const dragNote = foundNotes.matchInTitles[dragIndex];
      const newCopyNotes = foundNotes.matchInTitles.slice();
      newCopyNotes.splice(dragIndex, 1);
      newCopyNotes.splice(hoverIndex, 0, dragNote);
      return {
        ...state,
        foundNotes: {
          ...state.foundNotes,
          matchInTitles: newCopyNotes,
        }
      };
    case MOVE_FOUND_NOTE_BY_TAG:
      const {foundNotesByTag: byTag} = state;
      const {dragIndexByTag, hoverIndexByTag} = action;
      const dragNoteByTag = byTag[dragIndexByTag];
      const newCopyNotesByTag = byTag.slice();
      newCopyNotesByTag.splice(dragIndexByTag, 1);
      newCopyNotesByTag.splice(hoverIndexByTag, 0, dragNoteByTag);
      return {
        ...state,
        foundNotesByTag: newCopyNotesByTag,
      };
    case REMOVE_FOUND_NOTE:
      return {
        ...state,
        foundNotes: {
          ...state.foundNotes,
          matchInTitles: state.foundNotes.matchInTitles &&
            state.foundNotes.matchInTitles.filter(note => (
              note.id !== action.id
            )),
          },
        foundNotesByTag: state.foundNotesByTag &&
          state.foundNotesByTag.filter(note => note.id !== action.id),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  folders,
  options,
  form: formReducer,
  //router: routerReducer,
});

export default rootReducer;
