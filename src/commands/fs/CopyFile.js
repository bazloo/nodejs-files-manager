import { createWriteStream, createReadStream } from 'node:fs';
import { parse, join } from 'node:path';
import PathManager from '../../servises/PathManager.js';

export default class CopyFile extends PathManager {
  constructor(programState) {
    super(programState);
  }

  async copy(pathToFile, copyToDirectory) {
    const fromFile = createReadStream(this.getAbsolutePath(pathToFile));

    const { name, ext, base } = parse(this.getAbsolutePath(pathToFile)); // ??

    const toDirectory = this.getAbsolutePath(copyToDirectory);

    const newFile = await this.checkIfExist(join(toDirectory, base))
      ? this.getAbsolutePath(`${toDirectory}/${name}_copy_${Date.now()}${ext}`)
      : this.getAbsolutePath(`${toDirectory}/${name}${ext}`);

    const toFile = createWriteStream(newFile);

    return new Promise((resolve, reject) => {
      fromFile.on('error', (err) => reject(err));
      toFile.on('error', (err) => reject(err));

      toFile.on('end', () => resolve());

      fromFile.pipe(toFile);
    });
  }
}
