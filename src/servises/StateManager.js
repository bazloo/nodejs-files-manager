import os from 'os';

export class StateManager {
  constructor(userName, currentDirectory) {
    this.userName = userName;
    this.currentDirectory = currentDirectory;
    this.EOL = os.EOL;
    this.CPUS = this.parseCpusData();
    this.HOMEDIR = os.homedir();
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
}
