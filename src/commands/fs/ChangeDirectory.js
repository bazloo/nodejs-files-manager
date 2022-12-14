import { isAbsolute, resolve } from 'node:path';
import { access, constants } from "node:fs/promises";

export default class ChangeDirectory {
    async cd(currentDirectory, path) {
        let targetDirectory;

        if (path.isAbsolute()) {
            targetDirectory = path;
        } else {
            targetDirectory = resolve(currentDirectory, path);
        }

        let isAccesible = await await access(targetDirectory, constants.R_OK);
        
        if (isAbsolute) {
            return targetDirectory;
        } else {
            throw new Error(`Can not reach '${path}' directory`);
        }
    }
}