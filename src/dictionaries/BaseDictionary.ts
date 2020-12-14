export abstract class BaseDictionary<T, Keys = any> {
  protected instance: { [k in keyof Keys]: T };

  constructor(init: { [k in keyof Keys]: T } | null) {
    this.instance = init || ({} as any);
  }

  public has(k: string): boolean {
    return this.instance.hasOwnProperty(k);
  }

  public get(k: keyof Keys): T | undefined {
    return this.instance[k];
  }

  public set(k: keyof Keys, v: T): void {
    this.instance[k] = v;
  }

  public empty(): void {
    this.instance = {} as any;
  }
}
