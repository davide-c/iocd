# iocd
This is a simple **IoC/DI** implementation.
The api is similar to tsyringe's.

&nbsp;

## How it works
A default `Container` instance named `container` is exported by the library.

A new container can also be instantiated as below:
```ts
const cnt: Container = new Container();
```

Calling the `container.resolve(ClassName)` method will attempt to resolve or construct the requested instance with its dependencies through one of the available sources:

- Registered instances
- Registered factories
- Registered constructors

&nbsp;
  
## Instances
A class instance can be registered with the `container.registerInstance` method:

```ts
container.registerInstance(SampleClass, sampleClassInstance)
```
The first argument of  can either be a class constructor or a string.

&nbsp;

## Factories
A class factory can be registered with the `container.registerFactory` method:

```ts
container.registerInstance(SampleClass, sampleClassInstance)
```
The first argument of  can either be a class constructor or a string.

&nbsp;

## Constructors
The library can auto register classes through the following options:
* manually: `ConstructorsDictionary.add(YourClassConstructor)`
* or through the class decorator: `@injectable()`

&nbsp;

## Decorators
### injectable
Classes decorated with `injectable` will be resolved given their dependencies are registered / can be provided through one of the available sources.


## Tests:
```bash
# Unit and feature tests can be executed by running:
npm run test 

# watch:
npm run test:watch

# verbose output
npm run test:loud

# both
npm run test:watch:loud
```

