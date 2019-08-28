import { createModel, Raw, Action } from '../src/index';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const a = createModel({
  state: 1,
  reducers:{
    'num/add': {
      name: Raw('add_num'),
      reducer: (state:number, action:Action<number>) => {
        return state + action.payload;
      },
    },
    'num/nothing': {
      name: Raw('nothing'),
    },
  },
});
const b = a.reducer;
combineReducers({num: a.reducer});
// combineReducers({sta: handleActions(a.reducers, 1)});