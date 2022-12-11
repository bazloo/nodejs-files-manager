import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const currentDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../');

export class FileManager {
  constructor(InputListener, StateManager, CommandValidator, CommandExecutor) {
    this.InputLisener = InputListener;
    this.StateManager = StateManager;
    this.CommandValidator = CommandValidator;
    this.CommandExecutor = CommandExecutor;
  }

  run() {
    const userNameArgument = process.argv[2];
    let programState;
    if (/^--userName/.test(userNameArgument)) {
      const userName = userNameArgument.split('=')[1];
      programState = new this.StateManager(userName, currentDirectory);
      this.CommandExecutor = new this.CommandExecutor(programState);

      process.on('exit', (code) => {
        if (!code) console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      });
    } else {
      throw new Error('no user name provided'); // TODO handle
    }

    this.InputLisener.init(this.handleUserInput);

    console.log(`Welcome to the File Manager, ${programState.userName}!`);
    console.log(`You are currently in ${programState.currentDirectory}`);
  }

  handleUserInput = (input) => {
    const command = new this.CommandValidator().defineCommand(input);
    this.CommandExecutor.execute(command);
  };
}
