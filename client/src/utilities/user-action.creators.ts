import { ActionType } from '../enumerations/action-type';
import { IAction } from '../interfaces/action.interface';

export class UserActionCreators {
  public static userKeyFetch(): IAction {
    return {
      type: ActionType.UserKeyFetch,
      payload: null
    };
  }

  public static userKeyReceived(key: number): IAction {
    return {
      type: ActionType.UserKeyReceived,
      payload: key
    };
  }

  public static userKeyRemove(): IAction {
    return {
      type: ActionType.UserKeyRemove,
      payload: null
    };
  }
}
