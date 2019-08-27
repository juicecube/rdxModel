import { createModel, Raw, Action } from '../src/index';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const a = createModel({
  'num/add': {
    name: Raw('add_num'),
    reducer: (state:number, action:Action<number>) => {
      return state + action.payload;
    },
  },
  'num/nothing': {
    name: Raw('nothing'),
  },
});

combineReducers(a.reducers);
handleActions(a.reducers, 1);