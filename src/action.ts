import { createAction } from 'redux-actions';

export interface Action<Payload = undefined> {
  readonly type:string;
  readonly payload?:Payload;
}
export function create_action(action_type:string) : () => Action;
export function create_action<Payload>(
    action_type:string,
) : (payload:Payload) => Action<Payload> {
  return (createAction(action_type, (p:Payload) => p) as (payload?:Payload) => Action<Payload>);
}