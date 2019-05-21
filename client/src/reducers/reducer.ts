import { IHeartRateOutputData } from '../../../shared/api.schemas';
import { ActionType } from '../enumerations/action-type';
import { IFileUploadActionPayload } from '../interfaces/action-upload-payload.interface';
import { IAction } from '../interfaces/action.interface';
import FileUploadService from '../services/file-upload.service';
import UserService from '../services/user.service';
import { store } from '../store';
import { DataActionCreators } from '../utilities/data-action.creators';
import { UserActionCreators } from '../utilities/user-action.creators';

export interface IAppState {
  userKey: number;
  isLoading: boolean;
  heartRate: {
    data: IHeartRateOutputData;
    error: string;
  };
}

const defaultState: IAppState = {
  userKey: null,
  isLoading: false,
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
        store.dispatch(DataActionCreators.hearRateDataUploadFinished(data));
      };
      const uploadPaylod = action.payload as IFileUploadActionPayload;
      FileUploadService
        .uploadHeartRate(uploadPaylod.file, state.userKey, uploadPaylod.progressCallback)
        .then(dispatchFinished);

      return {
        ...state,
        heartRate: {
          data: null,
          error: null
        }
      };

    case ActionType.HeartRateDataUploadFinished:
      return {
        ...state,
        heartRate: {
          data: action.payload,
          error: null
        }
      };

    default: return {
      ...state
    };
  }
};

export default reducer;
