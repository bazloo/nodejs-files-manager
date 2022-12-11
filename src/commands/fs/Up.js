import { resolve, dirname } from 'node:path';

export class Up {
  static goUp(path) {
    return resolve(dirname(path), '../');
  }
}
