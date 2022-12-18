import os from 'os';

export default class StateManager {
  constructor(userName) {
    this.userName = this.parseUserName();
    this.HOMEDIR = os.homedir();
    this.currentDirectory = this.HOMEDIR;

    this.EOL = os.EOL;
    this.CPUS = this.parseCpusData();
    this.USER_NAME = os.userInfo().username;
    this.ARCH = os.arch();
  }

  parseCpusData() {
    const cpus = os.cpus();
    return 'CPUs info:\n'
        + `Amount of CPUS - ${cpus.length}\n`
        + `Model - ${cpus[0].model}\n`
        + `Speed - ${cpus[0].speed}\n`;
  }

  parseUserName() {
    const userNameArgument = process.argv[2];

    if (/^--userName/.test(userNameArgument)) {
      return userNameArgument.split('=')[1];
    }
    throw new Error('ERROR: no user name provided'); // TODO handle, put new username?
  }
}
