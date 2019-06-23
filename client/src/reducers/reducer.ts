import { AxiosError } from 'axios';
import { IErrorResponse, IWeekDayOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { ViewType } from '../enumerations/view-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';
import FileUploadService from '../services/file-upload.service';
import UserService from '../services/user.service';
import { store } from '../store';
import { DataActionCreators } from '../utilities/data-action.creators';
import { UserActionCreators } from '../utilities/user-action.creators';
import { ViewActionCreators } from '../utilities/view-action.creators';

export interface IAppState {
  userKey: number;
  isLoading: boolean;
  activeView: ViewType;
  heartRate: {
    data: IWeekDayOutputData;
    error: string;
  };
  sleep: {
    data: IWeekDayOutputData;
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
  },
  sleep: {
    data: null,
    error: null
  }
};

const reducer = (state: IAppState = defaultState, action: IAction): IAppState => {
  const dispatchFinished = (type: ActionType, data: IWeekDayOutputData): void => {
    store.dispatch(DataActionCreators.dataUploadFinished(type, data));
  };

  const dispatchError = (type: ActionType, error: AxiosError): void => {
    const response: IErrorResponse = error.response.data;
    store.dispatch(DataActionCreators.apiErrorReceived(type, response.error));
  };

  let uploadPaylod;

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
      uploadPaylod = action.payload as IFileUploadActionPayload;

      FileUploadService
        .uploadHeartRate(uploadPaylod.file, state.userKey, uploadPaylod.progressCallback)
        .then(dispatchFinished.bind(null, ActionType.HeartRateDataUploadFinished))
        .catch(dispatchError.bind(null, ActionType.HeartRateDataUploadError));

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
    case ActionType.SleepDataUploadStart:
      uploadPaylod = action.payload as IFileUploadActionPayload;

      FileUploadService
        .uploadSleep(uploadPaylod.file, state.userKey, uploadPaylod.progressCallback)
        .then(dispatchFinished.bind(null, ActionType.SleepDataUploadFinished))
        .catch(dispatchError.bind(null, ActionType.SleepDataUploadError));

      return {
        ...state
      };

    case ActionType.SleepDataUploadFinished:
      return {
        ...state,
        sleep: {
          data: action.payload,
          error: null
        }
      };
    case ActionType.SleepDataUploadError:
      return {
        ...state,
        sleep: {
          data: null,
          error: action.payload
        }
      };

    case ActionType.SleepDataReset:
      return {
        ...state,
        sleep: {
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
