import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import PathManager from '../../servises/PathManager.js';

export default class CopyFile extends PathManager {
  constructor(programState) {
    super(programState);
    this.programState = programState;
  }

  async copy(pathToFile, copyToDirectory) {
    const fromFile = createReadStream(this.getAbsolutePath(pathToFile));

    const fileName = fileURLToPath(pathToFile);

    const newFile = await this.checkIfExist(this.getAbsolutePath(`${copyToDirectory}${fileName}`))
      ? this.getAbsolutePath(`${copyToDirectory}${fileName}_copy_${Date.now()}`)
      : this.getAbsolutePath(`${copyToDirectory}${fileName}`);

    const toFile = createWriteStream(newFile);

    return new Promise((resolve, reject) => {
      fromFile.on('error', (err) => reject(err));
      toFile.on('error', (err) => reject(err));

      toFile.on('end', () => resolve());

      fromFile.pipe(toFile);
    });
  }
}
