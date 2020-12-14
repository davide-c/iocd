import 'reflect-metadata';
import { BaseDictionary } from './dictionaries/BaseDictionary';
import { ConstructorsDictionary } from './dictionaries/ConstructorsDictionary';

export interface IOCContainer {
  registerInstance<T>(token: InjectionToken, value: T): void;
  registerFactory<T>(token: InjectionToken, value: () => T): void;
  // TODO: isRegistered
  resolve<T>(token: InjectionToken<T>): T;
  getChildContainer(): IOCContainer;
  reset(): void;
}

export type Constructor<T = any> = { new (...args: any[]): T };

export type InjectionToken<T = any> = Constructor<T> | string;

export const getToken = (t: InjectionToken): string => {
  return typeof t === 'string' ? t : (t.prototype.constructor.name as string);
};

export class GenericDictionary extends BaseDictionary<any> {}

export class Container implements IOCContainer {
  protected instances: GenericDictionary;
  protected factories: BaseDictionary<() => any>;

  constructor() {
    this.instances = new GenericDictionary({});
    this.factories = new GenericDictionary({});
  }

  public registerInstance<T>(tokenOrRef: InjectionToken, value: T): void {
    this.instances.set(getToken(tokenOrRef), value);
  }

  public registerFactory<T>(tokenOrRef: InjectionToken, value: () => T): void {
    this.factories.set(getToken(tokenOrRef), value);
  }

  public isRegistered(): void {
    throw new Error('Not implemented.');
  }

  public resolve<T>(tokenOrRef: InjectionToken<T>): T {
    // TODO: split into smaller ones
    const token = getToken(tokenOrRef);

    const resolvedInstance = this.instances.get(token);

    if (resolvedInstance) {
      return resolvedInstance;
    }

    const resolvedFactory = this.factories.get(token);

    if (resolvedFactory) {
      // TODO: async factories resolution should be supported
      return resolvedFactory();
    }

    const classRef = ConstructorsDictionary.get(token);

    if (!classRef) {
      throw new Error(`Unable to resolve class \`${token}\``);
    }

    // Auto constr attempt:
    const params = Reflect.getMetadata('design:paramtypes', classRef);

    const args = params.map((p: Constructor) => {
      if (typeof p === 'undefined') {
        // decorators failing with circular deps:
        // https://github.com/microsoft/TypeScript/issues/4521
        // reverting to ts 3.9.7 didn't sort the issue
        // https://docs.microsoft.com/en-gb/archive/blogs/laurieatkinson/file-order-matters-with-typescript-inheritance
        // https://en.it1352.com/article/1996381.html
        // https://stackoverflow.com/questions/48080152/detecting-circular-dependencies-in-typescript
        // https://github.com/typestack/typedi/issues/96
        throw new Error('Circular dependency detected.');
      }
      return this.resolve(p);
    });

    const instance = new classRef(...args);
    this.instances.set(instance.constructor.name, instance);
    return instance;
  }

  public addClassRef<T>(classRef: Constructor<T>): void {
    ConstructorsDictionary.add(classRef);
  }

  public getChildContainer(): Container {
    // it should have no registered instances and factories
    return new Container();
  }

  public reset(): void {
    this.instances.empty();
    this.factories.empty();
  }
}

export const container = new Container();
