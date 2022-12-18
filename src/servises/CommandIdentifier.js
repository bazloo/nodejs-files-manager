import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export default class CommandIdentifier {
    static defineCommand(inputString) {
    const command = availableCommands.find(({ input }) => {
      const re = new RegExp(`^${input}`, 'i'); // TODO check flag
      return re.test(inputString);
    });

    if (!command) {
      throw new Error('ERROR: unknown command');
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
