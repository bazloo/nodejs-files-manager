import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream';
import PathManager from '../../servises/PathManager.js';

export default class Compress extends PathManager {
  constructor(programState) {
    super(programState);
  }

  compress(pathToFile, pathToDestination, option) {
    if (!option && !(option === 'compress' || option === 'decompress')) {
      throw new Error('Wrong option parameter');
    }

    const gzip = option === 'compress'
      ? zlib.createBrotliCompress()
      : zlib.createBrotliDecompress();

    const readStream = createReadStream(this.getAbsolutePath(pathToFile));
    const writeStream = createWriteStream(this.getAbsolutePath(pathToDestination));
    // TODO handle extension

    return new Promise((resolve, reject) => {
      pipeline(
        readStream,
        gzip,
        writeStream,
        (error) => {
          if (error) reject(error);
          resolve();
        },
      );
    });
  }
}
