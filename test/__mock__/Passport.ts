import { injectable } from '../../src/decorators/injectable';

@injectable()
export class Passport {
  protected valid: boolean = true;
  constructor(public number: number) {}
}
