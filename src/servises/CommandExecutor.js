import { CommandProvider } from './CommandProvider.js';
import { CommandValidator } from './CommandValidator.js';

export class CommandExecutor extends CommandProvider {
  constructor() {
    super();
    this.commands = CommandValidator.commands.reduce((availableCommands, { input, method }) => {
      availableCommands[input] = this[method];
      return availableCommands;
    }, {});
  }

  execute(inputCommand) {
    const [{ input: command }, args] = inputCommand;
    this.commands[command](args);
  }
}
