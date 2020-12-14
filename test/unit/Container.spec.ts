import { Container } from '../../src/Container';

class Abc {
  constructor(public a: number, protected b: boolean) {}
}

describe('Container', () => {
  let container: Container;

  beforeEach(async () => {
    container = new Container();
  });

  describe('`registerInstance` method', () => {
    it('should register an instance ', () => {
      const spy = jest.spyOn((container as any).instances, 'set');

      const instToBeRegistered = new Abc(10, true);

      container.registerInstance(Abc, instToBeRegistered);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('Abc', instToBeRegistered);
    });
  });

  describe('`resolve` method', () => {
    it('should resolve a registered an instance ', () => {
      const instToBeRegistered = new Abc(10, true);

      container.registerInstance(Abc, instToBeRegistered);

      const spy0 = jest.spyOn((container as any).instances, 'get');
      const spy1 = jest.spyOn((container as any).factories, 'get');

      const resolved = container.resolve(Abc);

      expect(spy0).toHaveBeenCalledTimes(1);
      expect(spy0).toHaveBeenCalledWith('Abc');
      expect(spy1).not.toHaveBeenCalled();

      expect(resolved.constructor).toBe(Abc);
      expect(resolved).toEqual({ a: 10, b: true });
    });

    it('should resolve through a registered factory', () => {
      const factory = () => new Abc(25, true);
      const mockFactory = jest.fn(() => factory());
      const spy0 = jest.spyOn((container as any).factories, 'get');
      const spy1 = jest.spyOn((container as any).instances, 'get');

      container.registerFactory(Abc, mockFactory);
      const resolved = container.resolve(Abc);

      expect(mockFactory).toHaveBeenCalledTimes(1);
      expect(mockFactory).toHaveBeenCalledWith();
      expect(spy0).toHaveBeenCalledTimes(1);
      expect(spy0).toHaveBeenCalledWith('Abc');
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(resolved).toEqual(factory());
    });
  });

  // TODO: test all remaining methods
  // describe('`...` method', () => {});
});
