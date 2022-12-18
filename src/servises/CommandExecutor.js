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
    const [command, args] = inputCommand;
    return this.commands[command](args).then(() => {
      console.log(`You are currently in ${this.programState.currentDirectory}`);
    });
  }
}
