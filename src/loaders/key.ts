// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promises: fs } = require('fs');

export interface IKeyLoader {
  load(path): Promise<Uint8Array>;
}
const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

export class FSKeyLoader implements IKeyLoader {
  constructor(public readonly dir: string) {}
  public async load(path: string): Promise<Uint8Array> {
    if (isBrowser()) {
      throw new Error('can not use fs loader in the browser');
    }
    const data = await fs.readFileSync(`${this.dir}/${path}`);
    return new Uint8Array(data);
  }
}
