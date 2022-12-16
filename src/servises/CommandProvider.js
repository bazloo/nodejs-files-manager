import AddFile from '../commands';
import Cat from '../commands';
import ChangeDirectory from '../commands';
import CopyFile from '../commands';
import DeleteFile from '../commands';
import ListFiles from '../commands';
import MoveFile from '../commands';
import RenameFile from '../commands';
import Up from '../commands';

export class CommandProvider {
  constructor(programState) {
    this.programState = programState;
    
    this.addFile = new AddFile();
    this.concat = new Cat();
    this.changeDirectory = new ChangeDirectory(programState);
    this.copyFile = new CopyFile(programState);
    this.deleteFile = new DeleteFile();
    this.listFiles = new ListFiles();
    this.moveFile = new MoveFile(programState);
    this.renameFile = new RenameFile(programState);   
    this.goUp = new Up();  
  }

  exit = () => {
    process.exit(0);
  };

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

  add = ([filename]) => {
    return this.addFile.add(filename);
  };

  rn = ([pathToFile, newFileName]) => {
    return this.renameFile.rename(pathToFile, newFileName);
  };

  cp = ([pathToFile, pathToNewDirectory]) => {
    return this.copyFile.copy(pathToFile, pathToNewDirectory);
  };

  mv = () => {
    console.log('mv');
  };

  rm = () => {
    console.log('rm');
  };

  eol = () => {
    console.log('eol');
  };

  cpus = () => {
    console.log('cpus');
  };

  homedir = () => {
    console.log('homedir');
  };

  username = () => {
    console.log('username');
  };

  architecture = () => {
    console.log('architecture');
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
