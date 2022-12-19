import { default as availableCommands } from '../commands.json' assert { type: 'json' };

export default class CommandIdentifier {

    static #WRAPPED_COMMAND_PATTERN = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;
    static #WRAPPED_COMMAND_START = /^(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;
    static #WRAPPING_QUOTES = /^["']|["']$/g;

    static defineCommand(inputString) {
    const command = availableCommands.find(({ input }) => {
      const re = new RegExp(`^${input}`, 'i');
      return re.test(inputString);
    });

    if (!command) {
      throw new Error('INVALID_INPUT: unknown command'); // TODO help
    }

    const commandArguments = CommandIdentifier.#parsArguments(command.input, inputString)
        .map((argument) => CommandIdentifier.#sanitizeQuotes(argument));

    return [command.input, commandArguments];
  }

    static #parsArguments(command, input) {
        const commandArguments = input
            .replace(command, '')
            .trim();

        const wrappedInQuotes = commandArguments.match(CommandIdentifier.#WRAPPED_COMMAND_PATTERN);

        if (wrappedInQuotes) {
            if (
                wrappedInQuotes.length === 1
                && !commandArguments.replace(wrappedInQuotes[0], '')
            ) {
                return wrappedInQuotes;
            }
            return CommandIdentifier.#findWrappedArgs(commandArguments, []);
        } else {
            return CommandIdentifier.#splitByFirstSpace(commandArguments);
        }
    }

    /**
     * Recursively finds arguments
     * @param {string} argumentsString
     * @param {Array<string>} results
     * @returns {Array[]}
     */
    static #findWrappedArgs(argumentsString, results) {
        if (this.#WRAPPED_COMMAND_START.test(argumentsString)) {
            results.push(
                argumentsString
                    .match(CommandIdentifier.#WRAPPED_COMMAND_START)[0]
                    .trim()
            )

            const restArguments = argumentsString
                .replace(CommandIdentifier.#WRAPPED_COMMAND_START, '')
                .trim();

            return CommandIdentifier.#findWrappedArgs(restArguments, results);
        } else {
            return [...results, ...CommandIdentifier.#splitByFirstSpace(argumentsString)];
        }
    }

    static #splitByFirstSpace(string) {
        const separatorIndex = string.indexOf(' ');

        if (separatorIndex === -1) return [string];

        const firstArgument = string.substring(0, separatorIndex);
        const secondArgument = string.substring(separatorIndex).trim();

        return [firstArgument, secondArgument];
    }

    static #sanitizeQuotes(argument) {
        //const sanitizedArgument = argument.replace(CommandIdentifier.#WRAPPING_QUOTES, '');
        const toSanitize = argument.match(CommandIdentifier.#WRAPPED_COMMAND_PATTERN);
        if (toSanitize) {
            toSanitize.forEach((wrongPattern) => {
                const sanitized = wrongPattern.replace(CommandIdentifier.#WRAPPING_QUOTES, '')
                argument = argument.replace(wrongPattern, sanitized);
            });
        }
        return argument;
    }
}
