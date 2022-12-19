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

import { default as availableCommands } from '../commands.json' assert { type: 'json' };


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

  cd = async (directory) => {
    this.programState.currentDirectory = await this.changeDirectory
      .cd(directory);
  };

  ls = async () => {
    const content = await this.listFiles.list(this.programState.currentDirectory);
    console.table(content);
  };

  cat = ([filePath]) => this.concat.readFile(filePath)
    .then((content) => process.stdout.write(content.toString()));

  add = ([filename]) => this.addFile.add(filename);

  rn = ([pathToFile, newFileName]) => this.renameFile.rename(pathToFile, newFileName);

  cp = ([pathToFile, pathToNewDirectory]) => this.copyFile.copy(pathToFile, pathToNewDirectory);

  mv = ([pathToFile, pathToNewDirectory]) => this.moveFile.move(pathToFile, pathToNewDirectory);

  rm = ([pathToFile]) => this.deleteFile.delete(pathToFile);

  eol = () => {
    process.stdout.write(JSON.stringify(this.programState.EOL));
  };

  cpus = () => {
    process.stdout.write(this.programState.CPUS);
  };

  homedir = () => {
    process.stdout.write(this.programState.HOMEDIR);
  };

  username = () => {
    process.stdout.write(this.programState.USER_NAME);
  };

  architecture = () => {
    process.stdout.write(this.programState.ARCH);
  };

  hash = ([filePath]) => this.getHash.hash(filePath).then((hash) => process.stdout.write(hash));

  compress = ([pathToFile, pathToDestination]) => this.zip.compress(pathToFile, pathToDestination, 'compress');

  decompress = ([pathToFile, pathToDestination]) => this.zip.compress(pathToFile, pathToDestination, 'decompress');

  help = () => console.table(availableCommands.map(({ input, description }) => ({ input, description })));

  userName = (name) => {
    if (!this.programState.userName) {
      this.programState.userName = name.join(' ');
    }
  };
}
