import { writeFile } from 'node:fs/promises';
import PathManager from '../../servises/PathManager.js';

export default class AddFile extends PathManager {

  constructor(programState) {
    super(programState);
  }
  add(filename) {
    return writeFile(this.getAbsolutePath(filename));
  }
}
