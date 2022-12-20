import { rm } from 'node:fs/promises';
import PathManager from '../../servises/PathManager.js';

export default class DeleteFile extends PathManager {
  constructor(programState) {
    super(programState);
  }

  delete(pathToFile) {
    return rm(this.getAbsolutePath(pathToFile)).then(() => {
      process.stdout.write(`Successfully deleted: ${pathToFile}\n`);
    });
  }
}
