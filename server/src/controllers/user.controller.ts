import { IUserKeyData } from '../../../shared/api.schemas';
import { FileUtility } from '../utilities/file.utility';
import { Logger } from '../utilities/logger';

export class UserController {
  public generateUserKey(): Promise<IUserKeyData> {
    const key = new Date().getTime() * Math.floor(Math.random() * 1000);

    const mapToData = (): IUserKeyData => {
      return { userKey: key };
    };

    return FileUtility.initializeUserFolder(key).then(mapToData);
  }

  public clearAfterUser(userKey: string): void {
    Logger.log('Removing data of user with key', userKey);
    FileUtility.clearFolder(userKey);
  }
}