import { CommandProvider } from './CommandProvider.js';
import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export default class CommandExecutor extends CommandProvider {
  constructor(programState) {

    super(programState);

    this.commands = availableCommands.reduce((availableCommands, { input, method }) => {
      availableCommands[input] = this[method];
      return availableCommands;
    }, {});
  }

  async execute(inputCommand) {
    const [command, args] = inputCommand;
    return this.commands[command](args);
  }
}
