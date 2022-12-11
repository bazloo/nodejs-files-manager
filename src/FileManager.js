export class FileManager {
  constructor(InputListener, StateManager, CommandValidator, CommandExecutor) {
    this.InputLisener = InputListener;
    this.StateManager = StateManager;
    this.CommandValidator = CommandValidator;
    this.CommandExecutor = new CommandExecutor();
  }

  run() {
    const userNameArgument = process.argv[2];
    let programState;
    if (/^--userName/.test(userNameArgument)) {
      const userName = userNameArgument.split('=')[1];
      programState = new this.StateManager(userName);
    } else {
      throw new Error('no user name provided'); // TODO handle
    }

    this.InputLisener.init(this.handleUserInput);

    console.log(`Welcome to the File Manager, ${programState.userName}!`);
  }

  handleUserInput = (input) => {
    const command = new this.CommandValidator().defineCommand(input);
    this.CommandExecutor.execute(command);
  };
}
