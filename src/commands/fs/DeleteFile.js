import { rm } from 'node:fs/promises';
import PathManager from '../../servises/PathManager.js';

export default class DeleteFile extends PathManager {
  delete(pathToFile) {
    return rm(this.getAbsolutePath(pathToFile));
  }
}
