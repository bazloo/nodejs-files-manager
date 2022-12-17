import { CommandProvider } from './CommandProvider.js';
import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export class CommandExecutor extends CommandProvider {
  constructor(programState) {
    super(programState);
    this.commands = availableCommands.reduce((availableCommands, { input, method }) => {
      availableCommands[input] = this[method];
      return availableCommands;

      this.programState = programState;
    }, {});
  }

  async execute(inputCommand) {
    try {
      const [command, args] = inputCommand;
      await this.commands[command](args);
    } catch (error) {
      console.error(error.message || error, '\n');
    }

    console.log(`You are currently in ${this.programState.currentDirectory}`);
  }
}
