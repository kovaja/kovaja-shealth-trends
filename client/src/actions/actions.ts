import { Action, ActionCreator } from 'redux';

export enum ActionType {
  UserKeyReceived = 'USER_KEY_RECEIVED'
}

export interface IAction extends Action<string> {
  type: ActionType;
  payload: any;
}

export const userKeyReceived: ActionCreator<IAction> = (key: number): IAction => {
  return {
    type: ActionType.UserKeyReceived,
    payload: key
  };
};
