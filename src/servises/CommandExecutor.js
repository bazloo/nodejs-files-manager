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

  execute(inputCommand) {
    const [command, args] = inputCommand;
    this.commands[command](args);
    console.log(`You are currently in ${this.programState.currentDirectory}`);
  }
}
