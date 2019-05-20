import Axios, { AxiosResponse } from 'axios';
import { IUserKeyData } from '../../../shared/api.schemas';

export default class UserService {
  public static initUser(): Promise<number> {
    const extractKey = (response: AxiosResponse<IUserKeyData>): number => response.data.userKey;

    return Axios.get<IUserKeyData>('/api/user/init').then(extractKey);
  }

  public static removeUserDataBeforeUnload(userKey: number): void {
    navigator.sendBeacon('/api/user/tearDown/' + userKey);
  }
}
