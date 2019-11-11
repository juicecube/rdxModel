/// <reference types="redux-actions" />

export declare const Raw:<T extends string>(a:T) => T;

export type FirstArgument<T> = T extends (arg1:infer U, ...args:any[]) => any ? U : any;
export type SecondArgument<T> = T extends (arg1:any, arg2:infer U, ...args:any[]) => any ? U : any;
type PickActionType<T extends Action<any>> = T extends Action<infer U> ? U : any;

export type CreateAction<Payload> = (payload?:Payload) => Action<Payload>;
export type ApiCallBack = {
  callback?:(status:number, error_code?:string) => void;
};
export interface Action<Payload = undefined> {
  readonly type:string;
  readonly payload?:Payload;
  error?:boolean;
}

export declare const createModel:<T, U extends {[name:string]:{
  name:string;
  reducer?:(state:T, action:Action<any>) => any;
}}>(models:{state:T; reducers:U}) => {
  actions:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:CreateAction<PickActionType<SecondArgument<{
    [k in {[kk in keyof U]:U[kk]['name']}[keyof U]]:{
      [p in keyof U]: U[p]['name'] extends k ? U[p]['reducer'] : never
    }[keyof U]
  }[key]>>>};
  reducer:ReduxActions.ReduxCompatibleReducer<T, T>;
  reducers:{[k in keyof U]:U[k]['reducer']};
  keys:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:
  {[kk in keyof U]: U[kk]['name'] extends key ? kk : never}[keyof U]};
};

export default createModel;