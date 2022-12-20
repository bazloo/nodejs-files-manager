import { readdir } from 'node:fs/promises';

export default class ListFiles {
  async list(path) {
    const content = await readdir(path, { withFileTypes: true });
    return content
      .map((target) => ({
        Name: target.name,
        Type: target.isDirectory() ? 'directory' : 'file',
      }))
      .sort((a, b) => {
        const firstValue = a.Name.toLowerCase().replace(/\s+/g, '');
        const secondValue = b.Name.toLowerCase().replace(/\s+/g, '');

        return firstValue.localeCompare(secondValue, false, { numeric: true });
      })
      .sort((a, b) => (b.Type === 'directory') - (a.Type === 'directory'));
  }
}
