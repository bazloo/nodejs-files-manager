import { isAbsolute, resolve } from 'node:path';
import { access, constants } from 'node:fs/promises';

export default class PathManager {
  constructor(programState) {
    this.programState = programState;
  }

  getAbsolutePath = (path) => (isAbsolute(path) ? path : resolve(this.programState.currentDirectory, path));

  checkIfExist = async (path) => {
    try {
      await access(path, constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  };
}
