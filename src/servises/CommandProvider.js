import AddFile from '../commands/fs/AddFile.js';
import Cat from '../commands/fs/Cat.js';
import ChangeDirectory from '../commands/fs/ChangeDirectory.js';
import CopyFile from '../commands/fs/CopyFile.js';
import DeleteFile from '../commands/fs/DeleteFile.js';
import ListFiles from '../commands/fs/ListFiles.js';
import MoveFile from '../commands/fs/MoveFile.js';
import RenameFile from '../commands/fs/RenameFile.js';
import Up from '../commands/fs/Up.js';

export class CommandProvider {
  constructor(programState) {
    this.programState = programState;

    this.addFile = new AddFile(programState);
    this.concat = new Cat();
    this.changeDirectory = new ChangeDirectory(programState);
    this.copyFile = new CopyFile(programState);
    this.deleteFile = new DeleteFile(programState);
    this.listFiles = new ListFiles();
    this.moveFile = new MoveFile(programState);
    this.renameFile = new RenameFile(programState);
    this.goUp = new Up();
  }

  exit = () => process.exit(0);

  up = () => {
    const newDirectory = this.goUp.up(this.programState.currentDirectory);
    this.programState.currentDirectory = newDirectory;
  };

  cd = async ([directory]) => {
    this.programState.currentDirectory = await this.changeDirectory
      .cd(directory);
  };

  ls = async () => {
    const content = await this.listFiles.list(this.programState.currentDirectory);
    console.table(content);
  };

  cat = async ([filePath]) => {
    const content = await this.concat.readFile(filePath);
    console.log(content.toString());
  };

  add = ([filename]) => this.addFile.add(filename);

  rn = ([pathToFile, newFileName]) => this.renameFile.rename(pathToFile, newFileName);

  cp = ([pathToFile, pathToNewDirectory]) => this.copyFile.copy(pathToFile, pathToNewDirectory);

  mv = ([pathToFile, pathToNewDirectory]) => this.moveFile.move(pathToFile, pathToNewDirectory);

  rm = ([pathToFile]) => this.deleteFile.delete(pathToFile);

  eol = () => {
    console.log(this.programState.EOL); // TODO fix
  };

  cpus = () => {
    console.log(this.programState.CPUS);
  };

  homedir = () => {
    console.log(this.programState.HOMEDIR);
  };

  username = () => {
    console.log(this.programState.USER_NAME);
  };

  architecture = () => {
    console.log(this.programState.ARCH);
  };

  hash = () => {
    console.log('hash');
  };

  compress = () => {
    console.log('compress');
  };

  decompress = () => {
    console.log('decompress');
  };
}
