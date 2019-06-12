import { IHeartRateOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';

export class DataActionCreators {
  public static dataUploadStart(actionType: ActionType, actionPayload: IFileUploadActionPayload): IAction {
    return {
      type: actionType,
      payload: actionPayload
    };
  }

  public static hearRateDataUploadFinished(data: IHeartRateOutputData): IAction {
    return {
      type: ActionType.HeartRateDataUploadFinished,
      payload: data
    };
  }
}
