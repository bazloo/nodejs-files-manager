import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export class CommandIdentifier {
   commands = availableCommands;

  defineCommand(inputString) { // TODO static
    const command = availableCommands.find(({ input }) => {
      const re = new RegExp(`^${input}`, 'i'); // TODO check flag
      return re.test(inputString);
    });

    if (!command) {
      throw new Error('Unknown command');
    }

    const commandArguments = this.parsArguments(command, inputString);

    return [command, commandArguments];
  }

  parsArguments(command, input) {
    console.log(input);
    return input
      .replace(command, '')
      .trim()
      .split(' '); //TODO handle
  }
}
