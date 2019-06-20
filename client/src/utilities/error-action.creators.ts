import { IHeartRateOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { IAction } from '../interfaces/action.interface';

export class ErrorActionCreators {
  public static apiErrorReceived(type: ActionType.HeartRateDataUploadError, payload: string): IAction {
    return { type, payload };
  }

  public static hearRateDataUploadFinished(data: IHeartRateOutputData): IAction {
    return {
      type: ActionType.HeartRateDataUploadFinished,
      payload: data
    };
  }
}
