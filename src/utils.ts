import { InjectionToken } from './types/InjectionToken';

export class Utils {
  public static getToken = (t: InjectionToken): string => {
    return typeof t === 'string' ? t : (t.prototype.constructor.name as string);
  };
}
