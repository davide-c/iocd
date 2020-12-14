import { ConstructorsDictionary } from '../dictionaries/ConstructorsDictionary';

export const injectable = () => {
  return (target: any) => {
    ConstructorsDictionary.add(target);
  };
};
