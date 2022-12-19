import { createReadStream } from 'node:fs';
import PathManager from '../../servises/PathManager.js';

export default class Cat extends PathManager {
  readFile(filePath) {
    const readStream = createReadStream(this.getAbsolutePath(filePath)); // TODO limitation
    return new Promise((resolve, reject) => {
      const buffer = [];

      readStream.on('data', (chunk) => buffer.push(chunk));
      readStream.on('end', () => resolve(Buffer.concat(buffer).toString()));
      readStream.on('error', (err) => reject(err));
    });
  }
}
