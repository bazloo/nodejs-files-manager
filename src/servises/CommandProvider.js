import AddFile from '../commands/fs/AddFile.js';
import Cat from '../commands/fs/Cat.js';
import ChangeDirectory from '../commands/fs/ChangeDirectory.js';
import CopyFile from '../commands/fs/CopyFile.js';
import DeleteFile from '../commands/fs/DeleteFile.js';
import ListFiles from '../commands/fs/ListFiles.js';
import MoveFile from '../commands/fs/MoveFile.js';
import RenameFile from '../commands/fs/RenameFile.js';
import Up from '../commands/fs/Up.js';

import Hash from '../commands/hash/hash.js';
import Compress from '../commands/zip/compress.js';

export class CommandProvider {
  constructor(programState) {
    this.programState = programState;

    this.addFile = new AddFile(programState);
    this.concat = new Cat(programState);
    this.changeDirectory = new ChangeDirectory(programState);
    this.copyFile = new CopyFile(programState);
    this.deleteFile = new DeleteFile(programState);
    this.listFiles = new ListFiles();
    this.moveFile = new MoveFile(programState);
    this.renameFile = new RenameFile(programState);
    this.goUp = new Up();

    this.getHash = new Hash(programState);

    this.zip = new Compress(programState);
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

  cat = ([filePath]) => this.concat.readFile(filePath)
    .then((content) => console.log(content.toString()));

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

  hash = async ([filePath]) => {
    const hash = await this.getHash.hash(filePath);
    console.log(hash);
  };

  compress = ([pathToFile, pathToDestination]) => this.zip.compress(pathToFile, pathToDestination, 'compress');

  decompress = ([pathToFile, pathToDestination]) => this.zip.compress(pathToFile, pathToDestination, 'decompress');
}
