export class FileManager {
  constructor(InputListener, StateManager, CommandIdentifier, CommandExecutor) {
    this.InputLisener = InputListener;
    this.StateManager = StateManager;
    this.CommandIdentifier = CommandIdentifier;
    this.CommandExecutor = CommandExecutor;
  }

  run() {
    const programState = new this.StateManager();
    this.CommandExecutor = new this.CommandExecutor(programState);

    this.InputLisener.init(this.handleUserInput);

    console.log(`Welcome to the File Manager, ${programState.userName}!`);
    console.log(`You are currently in ${programState.currentDirectory}`);

    process.on('exit', (code) => {
      if (!code) {
        console.log(`Thank you for using File Manager, ${programState.userName}, goodbye!`);
      }
    });
  }

  handleUserInput = async (input) => {
    try {
      const command = this.CommandIdentifier.defineCommand(input);
      await this.CommandExecutor.execute(command);
    } catch (error) {
      console.error(error.message || error, '\n');
    }
  };
}
