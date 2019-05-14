import { FileUtility } from '../utilities/file.utility';

export interface IUserKeyData {
  userKey: number;
}

export class UserController {
  public generateUserKey(): Promise<IUserKeyData> {
    const key = new Date().getTime() * Math.floor(Math.random() * 1000);

    const mapToData = (): IUserKeyData => {
      return { userKey: key };
    };

    return FileUtility.initializeUserFolder(key).then(mapToData);
  }
}