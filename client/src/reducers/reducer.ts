import { AxiosError } from 'axios';
import { IErrorResponse, IHeartRateOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { ViewType } from '../enumerations/view-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';
import FileUploadService from '../services/file-upload.service';
import UserService from '../services/user.service';
import { store } from '../store';
import { DataActionCreators } from '../utilities/data-action.creators';
import { ErrorActionCreators } from '../utilities/error-action.creators';
import { UserActionCreators } from '../utilities/user-action.creators';
import { ViewActionCreators } from '../utilities/view-action.creators';

export interface IAppState {
  userKey: number;
  isLoading: boolean;
  activeView: ViewType;
  heartRate: {
    data: IHeartRateOutputData;
    error: string;
  };
}

const defaultState: IAppState = {
  userKey: null,
  isLoading: false,
  activeView: null,
  heartRate: {
    data: null,
    error: null
  }
};

const reducer = (state: IAppState = defaultState, action: IAction): IAppState => {
  switch (action.type) {
    case ActionType.UserKeyFetch:
      const dispatchReceived = (key: number): void => {
        store.dispatch(UserActionCreators.userKeyReceived(key));
        store.dispatch(ViewActionCreators.changeActiveView(ViewType.HeartRate));
      };

      UserService.initUser()
        .then(dispatchReceived);

      return {
        ...state,
        isLoading: true
      };

    case ActionType.UserKeyReceived:
      return {
        ...state,
        userKey: action.payload,
        isLoading: false
      };

    case ActionType.UserKeyRemove:
      UserService.removeUserDataBeforeUnload(state.userKey);
      return {
        ...state,
        isLoading: true
      };

    case ActionType.HeartRateDataUploadStart:
      const dispatchFinished = (data: IHeartRateOutputData): void => {
        store.dispatch(DataActionCreators.heartRateDataUploadFinished(data));
      };

      const dispatchError = (error: AxiosError): void => {
        const response: IErrorResponse = error.response.data;
        store.dispatch(ErrorActionCreators.apiErrorReceived(ActionType.HeartRateDataUploadError, response.error));
      };

      const uploadPaylod = action.payload as IFileUploadActionPayload;

      FileUploadService
        .uploadHeartRate(uploadPaylod.file, state.userKey, uploadPaylod.progressCallback)
        .then(dispatchFinished)
        .catch(dispatchError);

      return {
        ...state
      };

    case ActionType.HeartRateDataUploadFinished:
      return {
        ...state,
        heartRate: {
          data: action.payload,
          error: null
        }
      };
    case ActionType.HeartRateDataUploadError:
      return {
        ...state,
        heartRate: {
          data: null,
          error: action.payload
        }
      };

    case ActionType.HeartRateDataReset:
      return {
        ...state,
        heartRate: {
          data: null,
          error: null
        }
      };
    case ActionType.ActiveViewChange:
      return {
        ...state,
        activeView: action.payload
      };

    default: return {
      ...state
    };
  }
};

export default reducer;
