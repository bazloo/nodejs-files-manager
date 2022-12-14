import { resolve, dirname } from 'node:path';

export default class Up {
  up(path) {
    return resolve(dirname(path), '../');
  }
}
