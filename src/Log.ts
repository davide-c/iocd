import * as util from 'util';

export class Log {
  protected static cfg: any = { showHidden: false, depth: 0, colors: true };

  public static do(o: any, depth: number = 0): void {
    console.log(util.inspect(o, { ...Log.cfg, depth }));
  }
}
