import { InjectionToken } from '../types/InjectionToken';
import { Utils } from '../utils';
import { BaseDictionary } from './BaseDictionary';

export class ConstructorsDictionary extends BaseDictionary<any> {
  private static instance: ConstructorsDictionary;

  private constructor() {
    super({});
  }

  public static getInstance(): ConstructorsDictionary {
    if (!ConstructorsDictionary.instance) {
      ConstructorsDictionary.instance = new ConstructorsDictionary();
    }

    return ConstructorsDictionary.instance;
  }

  public static get(k: string) {
    return this.getInstance().get(k);
  }

  public static set<T>(k: string, v: T) {
    return this.getInstance().set(k, v);
  }

  public static add<T = any>(t: InjectionToken) {
    return this.getInstance().set(Utils.getToken(t), t);
  }
}
