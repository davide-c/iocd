import { injectable } from '../../src/decorators/injectable';
import { Passport } from './Passport';

@injectable()
export class Person {
  protected name!: string;
  protected surname!: string;
  protected age!: number;
  constructor(public passport: Passport) {}
}
