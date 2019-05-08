import Axios, { AxiosResponse } from 'axios';

// TODO: sync with api
interface IUserInitData {
  userKey: number;
}

export default class UserService {

  public static initUser(): Promise<number> {
    const extractKey = (response: AxiosResponse<IUserInitData>): number => response.data.userKey;

    return Axios.get<IUserInitData>('/api/user/init').then(extractKey);
  }
}
