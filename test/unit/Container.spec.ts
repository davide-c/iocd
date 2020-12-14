import { Container } from '../../src/Container';

describe('Container', () => {
  let container: Container;

  describe('`registerInstance` method', () => {
    it('should register an instance ', async () => {
      container = new Container();

      const spy = jest.spyOn((container as any).instances, 'set');

      class Abc {
        constructor(public a: number, protected b: boolean) {}
      }

      const instToBeRegistered = new Abc(10, true);

      container.registerInstance(Abc, instToBeRegistered);

      const resolved = container.resolve(Abc);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        Abc.prototype.constructor.name,
        instToBeRegistered
      );

      expect(resolved.constructor).toBe(Abc);
      expect(resolved).toEqual({ a: 10, b: true });
    });
  });

  // TODO: test all methods
  describe('`...` method', () => {});
});
