import { createAction } from 'redux-actions';

export const Raw = <T extends string>(a:T) => a;
export type FirstArgument<T> = T extends (arg1:infer U, ...args:any[]) => any ? U : any;
export type SecondArgument<T> = T extends (arg1:any, arg2:infer U, ...args:any[]) => any ? U : any;
type PickActionType<T extends Action<any>> = T extends Action<infer U> ? U : any;
export const createModel = <U extends {[name:string]:{
  name:string;
  reducer?:(state:any, action:Action<any>) => any;
}}>(models:U) : {
  actions:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:CreateAction<PickActionType<SecondArgument<{
    [k in {[kk in keyof U]:U[kk]['name']}[keyof U]]:{
      [p in keyof U]: U[p]['name'] extends k ? U[p]['reducer'] : never
    }[keyof U]
  }[key]>>>};
  reducers:{[k in {[key in keyof U]:unknown extends U[key]['reducer'] ? never : key}[keyof U]]: U[k]['reducer']};
  keys:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:
  {[kk in keyof U]: U[kk]['name'] extends key ? kk : never}[keyof U]}[];
} => {
  const _reducers = {} as any;
  const _actions = {} as any;
  const keys = Object.keys(models) as any;
  keys.map((item) => {
    _actions[models[item].name] = create_action(item);
  });
  keys.map((item) => {
    if (models[item].reducer) {
      _reducers[item] = models[item].reducer;
    }
  });
  return {
    actions: _actions,
    reducers: _reducers,
    keys,
  };
};

export type CreateAction<Payload> = (payload?:Payload) => Action<Payload>;
export type ApiCallBack = {
  callback?:(status:number, error_code?:string) => void;
};
export interface Action<Payload = undefined> {
  readonly type:string;
  readonly payload?:Payload;
  error?:boolean;
}

export function create_action(action_type:string) : () => Action;
export function create_action<Payload>(
    action_type:string,
) : (payload:Payload) => Action<Payload> {
  return (createAction(action_type, (p:Payload) => p) as (payload?:Payload) => Action<Payload>);
}