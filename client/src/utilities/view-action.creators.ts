import { ActionType } from '../enumerations/action-type';
import { ViewType } from '../enumerations/view-type';
import { IAction } from '../interfaces/action.interface';

export class ViewActionCreators {
  public static changeActiveView(newView: ViewType): IAction {
    return {
      type: ActionType.ActiveViewChange,
      payload: newView
    };
  }
}
