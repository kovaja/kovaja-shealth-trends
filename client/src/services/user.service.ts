import Axios, { AxiosResponse } from 'axios';

// TODO: sync with api
interface IUserKeyData {
  userKey: number;
}

export default class UserService {

  public static getUserKey(): Promise<number> {
    const extractKey = (response: AxiosResponse<IUserKeyData>): number => response.data.userKey;

    return Axios.get<IUserKeyData>('/api/user/key').then(extractKey);
  }
}
