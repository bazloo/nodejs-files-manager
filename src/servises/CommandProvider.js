import Up from '../commands/fs/Up.js';
import ListFiles from '../commands/fs/ListFiles.js';
import Cat from '../commands/fs/Cat.js';
import ChangeDirectory from '../commands/fs/ChangeDirectory.js';

export class CommandProvider {
  constructor(programState) {
    this.programState = programState;
    this.goUp = new Up();
    this.listFiles = new ListFiles();
    this.concat = new Cat();
    this.changeDirectory = new ChangeDirectory(programState);
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

  add = () => {
    console.log('add');
  };

  rn = () => {
    console.log('rn');
  };

  cp = () => {
    console.log('executed cp');
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
