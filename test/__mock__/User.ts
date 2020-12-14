import { injectable } from '../../src/decorators/injectable';
import { Person } from './Person';

@injectable()
export class User {
  protected username!: string;
  protected password!: string;
  constructor(public person: Person) {}

  setUsername(n: string) {
    this.username = n;
  }

  setPassword(n: string) {
    this.username = n;
  }
}
