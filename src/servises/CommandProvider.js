import { Up } from '../commands/fs/Up.js';

export class CommandProvider {
  constructor(programState) {
    this.programState = programState;

    this.Up = new Up();
  }

  exit = () => {
    process.exit(0);
  };

  up = () => {
    const newDirectory = this.Up.goUp(this.programState.currentDirectory);
    this.programState.currentDirectory = newDirectory;
  };

  cd = () => {
    console.log('cd');
  };

  ls = () => {
    console.log('ls');
  };

  cat = () => {
    console.log('cat');
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
