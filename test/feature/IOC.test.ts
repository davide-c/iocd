import { container } from '../../src/Container';
import { injectable } from '../../src/decorators/injectable';
import { A } from '../__mock__/A';
import { Passport } from '../__mock__/Passport';
import { User } from '../__mock__/User';

describe('IOC features', () => {
  beforeEach(() => {
    container.reset();
  });

  describe('Create an object by recursively resolving instances (registered manually and auto)', () => {
    it('it should resolve an object with multiple dependencies', () => {
      container.registerInstance(Passport, new Passport(12345678));

      const resolved = container.resolve(User);

      resolved.setUsername('mockUsername');

      expect(resolved).toEqual({
        username: 'mockUsername',
        person: { passport: { number: 12345678, valid: true } },
      });

      expect(resolved.constructor).toBe(User);
    });
  });

  describe('Factory', () => {
    const AFactory = () => new A(7, 11);

    it('it should throw', () => {
      expect(() => container.resolve(A)).toThrowError();
    });

    it('it should resolve an entity through a registered factory', () => {
      container.registerFactory(A, AFactory);
      const resolved = container.resolve(A);
      expect(resolved).toEqual({ a: 7, b: 11 });
      expect(resolved.constructor).toBe(A);
    });

    it('it should resolve and run a registered factory as a dependency', () => {
      container.registerFactory(A, AFactory);

      @injectable()
      class Test {
        constructor(protected someFactoryProvidedArg: A) {}
      }

      const resolved = container.resolve(Test);
      expect(resolved).toEqual({ someFactoryProvidedArg: { a: 7, b: 11 } });
      expect(resolved.constructor).toBe(Test);
      expect((resolved as any).someFactoryProvidedArg.constructor).toBe(A);
    });
  });

  describe('Instance', () => {
    it('it should resolve a registered instance', () => {
      const originalPassportInstance = new Passport(123456789);
      container.registerInstance(Passport, originalPassportInstance);
      expect(container.resolve(Passport)).toBe(originalPassportInstance);
    });
  });

  it('it should resolve a registered instance as a dependency', () => {
    const originalPassportInstance = new Passport(101010101010);
    container.registerInstance(Passport, originalPassportInstance);

    @injectable()
    class B {
      constructor(public p: Passport) {}
    }

    const resolved = container.resolve(B);

    expect(resolved.constructor).toBe(B);
    expect(resolved.p.constructor).toBe(Passport);
    expect(resolved).toEqual({
      p: {
        number: 101010101010,
        valid: true,
      },
    });
  });

  describe('Injectable decorator', () => {
    it('it should auto construct a class registered through the `injectable` and return the instance.', () => {
      @injectable()
      class Mock {
        public enabled: boolean;
        constructor() {
          this.enabled = true;
        }
      }

      expect(container.resolve(Mock)).toStrictEqual(new Mock());
    });
  });

  // TODO: childContainer, etc
});
