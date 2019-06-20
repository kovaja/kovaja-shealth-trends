import { IHeartRateOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { ViewType } from '../enumerations/view-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';

export class DataActionCreators {
  public static dataUploadStart(actionType: ActionType, actionPayload: IFileUploadActionPayload): IAction {
    return {
      type: actionType,
      payload: actionPayload
    };
  }

  public static heartRateDataUploadFinished(data: IHeartRateOutputData): IAction {
    return {
      type: ActionType.HeartRateDataUploadFinished,
      payload: data
    };
  }

  public static dataReset(viewType: ViewType): IAction {
    let actionType: ActionType = null;

    switch (viewType) {
      case ViewType.HeartRate:
        actionType = ActionType.HeartRateDataReset;
        break;
    }

    return {
      type: actionType,
      payload: null
    };
  }
}
