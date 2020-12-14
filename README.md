# iocd
This is a simple IoC/DI implementation.

&nbsp;

## How it works
A default `Container` instance named `container` in exported by the library.

Calling the `container.resolve(ClassName)` method will attempt to resolve or construct the requested instance with its dependencies through one of the available sources:

- Registered instances
- Registered factories
- Registered constructors

&nbsp;
  
### **Instances**
A class instance can be registered with the `container.registerInstance` method:

```
container.registerInstance(SampleClass, sampleClassInstance)
```
The first argument of  can either be a class constructor or a string.

&nbsp;

### **Factories**
A class factory can be registered with the `container.registerFactory` method:

```
container.registerInstance(SampleClass, sampleClassInstance)
```
The first argument of  can either be a class constructor or a string.

&nbsp;

### **Constructors**
The library can auto register classes through the following options:
* manually: `ConstructorsDictionary.add(YourClassConstructor)`
* or through the class decorator: `@injectable()`


&nbsp;

## Decorators
### **injectable**
Classes decorated with `injectable` will be resolved given their dependencies are registered / can be provided through one of the available sources.

