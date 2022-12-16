import PathManager from '../../servises/PathManager.js';
import { rename as renameFile } from 'node:fs/promises';
import { dirname, join } from 'path';

export default class RenameFile extends PathManager {   
    constructor (programState) {
        super(programState);
    }

    rename(pathToFile, newFileName) {
        const targetFile = this.getAbsolutePath(pathToFile);
        const renamedFile = join(dirname(targetFile), newFileName);

        return renameFile(targetFile, renamedFile);
    }
}