import { InjectionToken } from './InjectionToken';

export interface IOCContainer {
  registerInstance<T>(token: InjectionToken, value: T): void;
  registerFactory<T>(token: InjectionToken, value: () => T): void;
  // TODO: isRegistered
  resolve<T>(token: InjectionToken<T>): T;
  getChildContainer(): IOCContainer;
  reset(): void;
}
