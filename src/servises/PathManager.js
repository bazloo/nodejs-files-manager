import { isAbsolute, resolve } from 'node:path';
import { access, constants } from 'node:fs/promises';

export default class PathManager {
  currentDirectory;
  getAbsolutePath = (path) => (isAbsolute(path) ? path : resolve(this.currentDirectory, path));

  checkIfAccessible = async (path) => {
    try {
      await access(path, constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  };
}
