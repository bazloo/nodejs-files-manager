import { resolve, dirname } from 'node:path';

export default class Up {
  goUp(path) {
    return resolve(dirname(path), '../');
  }
}
