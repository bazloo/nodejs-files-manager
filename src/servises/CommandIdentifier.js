import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export default class CommandIdentifier {

    static #WRAPPED_COMMAND_PATTERN = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;
    static #WRAPPED_COMMAND_START = /^(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')\s/g;
    static #WRAPPING_QUOTES = /^["']|["']$/g;

    static defineCommand(inputString) {
    const command = availableCommands.find(({ input }) => {
      const re = new RegExp(`^${input}`, 'i'); // TODO check flag
      return re.test(inputString);
    });

    if (!command) {
      throw new Error('INVALID_INPUT: unknown command'); // TODO help
    }

    const commandArguments = CommandIdentifier.#parsArguments(command.input, inputString);

    return [command.input, commandArguments];
  }

    static #parsArguments(command, input) {
        const commandArguments = input
            .replace(command, '')
            .trim();

        let firstArgument;
        let secondArgument;

        const wrappedInQuotes = commandArguments.match(CommandIdentifier.#WRAPPED_COMMAND_PATTERN);

        if (wrappedInQuotes) {
            if (wrappedInQuotes.length === 1) {
                wrappedInQuotes[0] = wrappedInQuotes[0].replace(CommandIdentifier.#WRAPPING_QUOTES, '');
                return [wrappedInQuotes];
            } else {
                // recursively call
               return CommandIdentifier.#findWrappedArgs(commandArguments, []);
            }
        } else {
            const separatedOfIndex = commandArguments.indexOf(' ');

            if (separatedOfIndex === -1) return [[commandArguments]];

            firstArgument = commandArguments.substring(0, separatedOfIndex);
            secondArgument = commandArguments.substring(separatedOfIndex).trim();

            return [[firstArgument, secondArgument]];
        }
    }

    /**
     * Recursively finds arguments
     * @param {string} string
     * @param {Array<string>} results
     * @returns {Array[]}
     */
    static #findWrappedArgs(string, results) {
        if (this.#WRAPPED_COMMAND_START.test(string)) {
            results.push(
                string.match(this.#WRAPPED_COMMAND_START)[0].trim().replace(CommandIdentifier.#WRAPPING_QUOTES, ''));
            return CommandIdentifier.#findWrappedArgs(string.replace(this.#WRAPPED_COMMAND_START, ' ').trim(), results);
        } else {
            return [[...results, ...string.split(' ')]];
        }
    }
}
