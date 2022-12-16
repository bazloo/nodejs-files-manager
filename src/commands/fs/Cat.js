import { createReadStream } from 'node:fs';

export default class Cat {
  readFile(filePath) { //TODO limitation
    const readStream = createReadStream(filePath);
    return new Promise((resolve, reject) => {
      const buffer = [];

      readStream.on('data', (chunk) => buffer.push(chunk));
      readStream.on('end', () => resolve(Buffer.concat(buffer).toString()));
      readStream.on('error', (err) => reject(err));
    });
  }
}
