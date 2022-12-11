import { resolve, dirname } from 'node:path';

export class Up {
  goUp(path) {
    return resolve(dirname(path), '../');
  }
}
