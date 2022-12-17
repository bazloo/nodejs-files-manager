import { rm } from 'node:fs/promises';
import PathManager from '../../servises/PathManager.js';

export default class DeleteFile extends PathManager { // TODO delete by filename without extension
  delete(pathToFile) {
    return rm(this.getAbsolutePath(pathToFile));
  }
}
