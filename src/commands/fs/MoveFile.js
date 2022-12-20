import CopyFile from './CopyFile.js';
import DeleteFile from './DeleteFile.js';

export default class MoveFile {
  constructor(programState) {
    this.copyFile = new CopyFile(programState);
    this.deleteFile = new DeleteFile(programState);
  }

  async move(pathToFile, pathToNewDirectory) {
    await this.copyFile.copy(pathToFile, pathToNewDirectory);
    await this.deleteFile.delete(pathToFile);
    // TODO success logs?
  }
}
