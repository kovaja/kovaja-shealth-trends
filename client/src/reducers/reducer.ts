import { ActionType, IAction } from '../actions/actions';

export interface IAppState {
  userKey: string;
}

const defaultState: IAppState = {
  userKey: null
};

const reducer = (state: IAppState = defaultState, action: IAction): IAppState => {
  switch (action.type) {

    case ActionType.UserKeyReceived: {
      return { ...state, userKey: action.payload };
    }

    default: return {
      ...state
    };
  }
};

export default reducer;
