import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export class CommandIdentifier {
    static defineCommand(inputString) { // TODO static
    const command = availableCommands.find(({ input }) => {
      const re = new RegExp(`^${input}`, 'i'); // TODO check flag
      return re.test(inputString);
    });

    if (!command) {
      throw new Error('Unknown command');
    }

    const commandArguments = CommandIdentifier.#parsArguments(command.input, inputString);

    return [command.input, commandArguments];
  }

  static #parsArguments(command, input) {
    return input
        .replace(command, '')
        .trim()
        .split(/\s/)
        .filter((argument) => argument);
  }
}
