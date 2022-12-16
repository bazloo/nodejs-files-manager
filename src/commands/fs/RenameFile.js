import { rename as renameFile } from 'node:fs/promises';
import { dirname, join } from 'path';
import PathManager from '../../servises/PathManager.js';

export default class RenameFile extends PathManager {
  rename(pathToFile, newFileName) {
    const targetFile = this.getAbsolutePath(pathToFile);
    const renamedFile = join(dirname(targetFile), newFileName);

    return renameFile(targetFile, renamedFile);
  }
}
