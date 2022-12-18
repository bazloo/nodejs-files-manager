import { access, constants } from 'node:fs/promises';
import PathManager from '../../servises/PathManager.js';

export default class ChangeDirectory extends PathManager {
  constructor(programState) {
    super();
    this.programState = programState;
  }

  async cd(path) {
    const { currentDirectory } = this.programState;
    if (!path || !path.trim()) return currentDirectory;

    const targetDirectory = this.getAbsolutePath(path);

    try {
      await access(targetDirectory, constants.R_OK);
      return targetDirectory;
    } catch (e) {
      throw new Error(`ERROR: Can not reach '${path}' directory`);
    }
  }
}
