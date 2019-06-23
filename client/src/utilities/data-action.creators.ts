import { IWeekDayOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { ViewType } from '../enumerations/view-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';

export class DataActionCreators {
  public static dataUploadStart(type: ActionType, payload: IFileUploadActionPayload): IAction {
    return { type, payload };
  }

  public static dataUploadFinished(type: ActionType, payload: IWeekDayOutputData): IAction {
    return { type, payload };
  }

  public static dataReset(viewType: ViewType): IAction {
    let actionType: ActionType = null;

    switch (viewType) {
      case ViewType.HeartRate:
        actionType = ActionType.HeartRateDataReset;
        break;
      case ViewType.Sleep:
        actionType = ActionType.SleepDataReset;
        break;
    }

    return {
      type: actionType,
      payload: null
    };
  }

  public static apiErrorReceived(type: ActionType, payload: string): IAction {
    return { type, payload };
  }
}
