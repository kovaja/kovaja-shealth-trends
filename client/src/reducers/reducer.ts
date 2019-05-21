import { ActionType } from '../enumerations/action-type';
import { IAction } from '../interfaces/action.interface';
import UserService from '../services/user.service';
import { store } from '../store';
import { UserActionCreators } from '../utilities/user-action.creators';

export interface IAppState {
  userKey: number;
  isLoading: boolean;
}

const defaultState: IAppState = {
  userKey: null,
  isLoading: false
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

    default: return {
      ...state
    };
  }
};

export default reducer;
