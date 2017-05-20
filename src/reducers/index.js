import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import folders from './folders';
import notes from './notes';
import note from './note';
import { tags, tagOptions } from './tags';

const rootReducer = combineReducers({
  folders,
  notes,
  note,
  tags,
  tagOptions,
  form: formReducer,
});

export default rootReducer;
