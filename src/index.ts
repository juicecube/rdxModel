import { createAction as _createAction, ReduxCompatibleReducer, handleActions } from 'redux-actions';

export const Raw = <T extends string>(a:T) => a;
export type FirstArgument<T> = T extends (arg1:infer U, ...args:any[]) => any ? U : undefined;
export type SecondArgument<T> = T extends (arg1:any, arg2:infer U, ...args:any[]) => any ? U : undefined;
type PickActionType<T> = T extends Action<infer U> ? U : T;
type PickTypeNotUndefined<T, U> = T extends undefined ? U : T;
export const createModel = <T, U extends {[name:string]:{
  name:string;
  reducer?:(state:T, action:Action<any>) => any;
  action?:(payload) => any;
}}>(models:{state:T; reducers:U}) : {
  actions:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:CreateActionType<PickActionType<PickTypeNotUndefined<FirstArgument<{
    [k in {[kk in keyof U]:U[kk]['name']}[keyof U]]:{
      [p in keyof U]: U[p]['name'] extends k ? U[p]['action'] : never
    }[keyof U]
  }[key]>, SecondArgument<{
    [k in {[kk in keyof U]:U[kk]['name']}[keyof U]]:{
      [p in keyof U]: U[p]['name'] extends k ? U[p]['reducer'] : never
    }[keyof U]
  }[key]>>>>};
  reducer:ReduxCompatibleReducer<T, T>;
  keys:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:
  {[kk in keyof U]: U[kk]['name'] extends key ? kk : never}[keyof U]};
} => {
  const _reducers = {} as any;
  const _actions = {} as any;
  const reducers = models.reducers;
  const keys = Object.keys(reducers) as any;
  const _keys = {} as any;
  keys.map((item) => {
    _actions[reducers[item].name] = createAction<string>(item, reducers[item].action);
    _keys[reducers[item].name] = item;
    if (reducers[item].reducer) {
      _reducers[item] = reducers[item].reducer;
    }
  });
  return {
    actions: _actions,
    reducer: handleActions(_reducers, models.state) as any,
    keys: _keys,
  };
};

export type CreateActionType<Payload> = (payload?:Payload) => Action<Payload>;
export type ApiCallBack = {
  callback?:(status:number, error_code?:string) => void;
};
export interface Action<Payload = undefined> {
  readonly type:string;
  readonly payload?:Payload;
  error?:boolean;
}

export function createAction(action_type:string) : () => Action;
export function createAction<Payload>(
  action_type:string,
  payloadCreator?:(p:Payload) => Payload,
) : (payload:Payload) => Action<Payload>;
export function createAction<Payload>(
    actionType:string,
    payloadCreator?:(p:Payload) => Payload,
) : (payload:Payload) => Action<Payload> {
  if (payloadCreator) {
    return (_createAction(actionType, payloadCreator) as (payload:Payload) => Action<Payload>);
  }
  return (_createAction(actionType, (p:Payload) => p) as (payload?:Payload) => Action<Payload>);
}