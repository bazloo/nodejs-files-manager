import { CommandProvider } from './CommandProvider.js';
import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export class CommandExecutor extends CommandProvider {
  constructor() {
    super();
    this.commands = availableCommands.reduce((availableCommands, { input, method }) => {
      availableCommands[input] = this[method];
      return availableCommands;
    }, {});
  }

  execute(inputCommand) {
    const [{ input: command }, args] = inputCommand;
    this.commands[command](args);
  }
}
