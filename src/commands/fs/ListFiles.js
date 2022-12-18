import { readdir } from 'node:fs/promises';

export default class ListFiles {
  async list(path) {
    const content = await readdir(path, { withFileTypes: true });
    return content.map((target) => ({ // TODO sort
      Name: target.name,
      Type: target.isDirectory() ? 'directory' : 'file',
    })); // TODO sort
  }
}
