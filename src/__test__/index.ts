import { createModel, Raw, Action } from '../index';
import { combineReducers } from 'redux';
import {  createStore } from 'redux';

const numModel = createModel({
  state: 1,
  reducers: {
    'num/add': {
      name: Raw('add_num'),
      reducer: (state:number, action:Action<number>) => {
        return state + action.payload;
      },
    },
    'num/minus': {
      name: Raw('minus_num'),
      reducer: (state:number, action:Action<number>) => {
        return state - action.payload;
      },
    },
    'num/set': {
      name: Raw('set_num'),
      reducer: (state:number, action:Action<number>) => {
        return action.payload;
      },
    },
    'num/autoAddOne': {
      name: Raw('autoAddOne'),
      action: (num:number) => +num + 1,
      reducer: (state:number, action:Action<number>) => {
        return state + action.payload;
      },
    },
    'num/nothing': {
      name: Raw('nothing'),
    },
  },
});

numModel.actions;

const rootReducer = combineReducers({num: numModel.reducer});
const store = createStore(rootReducer);

test('keys', () => {
  expect(numModel.keys).toStrictEqual({
    add_num: 'num/add',
    nothing: 'num/nothing',
    minus_num: 'num/minus',
    set_num: 'num/set',
    autoAddOne: 'num/autoAddOne',
  });
});

test('store add', () => {
  store.dispatch(numModel.actions.set_num(0));
  store.dispatch(numModel.actions.add_num(10));
  expect(store.getState().num).toBe(10);
});

test('store minus', () => {
  store.dispatch(numModel.actions.set_num(0));
  store.dispatch(numModel.actions.minus_num(1));
  expect(store.getState().num).toBe(-1);
});

test('store payloadCreator', () => {
  store.dispatch(numModel.actions.set_num(0));
  store.dispatch(numModel.actions.autoAddOne(10));
  expect(store.getState().num).toBe(11);
});