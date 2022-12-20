import { createHmac } from 'node:crypto';
import { createReadStream } from 'node:fs';

import PathManager from '../../servises/PathManager.js';

export default class Hash extends PathManager {
  constructor(programState) {
    super(programState);
  }

  hash(pathToFile) {
    const readStream = createReadStream(this.getAbsolutePath(pathToFile));

    return new Promise((resolve, reject) => {
      const hmac = createHmac('sha256', 'a secret');

      readStream.on('readable', () => {
        const data = readStream.read();
        if (data) hmac.update(data);
        else {
          resolve(hmac.digest('hex'));
        }
      });

      readStream.on('error', reject);
    });
  }
}
