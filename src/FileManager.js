export default class FileManager {
  constructor(
    InputListener,
    StateManager,
    CommandIdentifier,
    CommandExecutor,
    Communicator,
  ) {
    this.InputLisener = InputListener;
    this.StateManager = StateManager;
    this.CommandIdentifier = CommandIdentifier;
    this.CommandExecutor = CommandExecutor;
    this.Communicator = Communicator;
  }

  run() {
    this.programState = new this.StateManager();
    this.CommandExecutor = new this.CommandExecutor(this.programState);

    this.InputLisener.init(this.handleUserInput);

    this.Communicator = new this.Communicator(this.programState);

    this.Communicator.WELCOME();
    this.Communicator.YOU_ARE_IN();

    process.on('exit', (code) => {
      if (!code) {
        this.Communicator.GOODBYE();
      }
    });
  }

  handleUserInput = async (input) => {
    try {
      const command = await this.CommandIdentifier.defineCommand(input);
      this.Communicator.SEPARATE();

      if (!this.programState.userName && command[0] !== 'userName') {
        this.Communicator.PROVIDE_USER_NAME();
        return;
      }

      await this.CommandExecutor.execute(command);

      this.Communicator.YOU_ARE_IN();
    } catch (error) {
      this.Communicator.ERROR(error);
    }
  };
}
