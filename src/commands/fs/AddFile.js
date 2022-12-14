import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default class AddFile {
    add(cd, filename) {
        return writeFile(resolve(cd, filename));
    }
}