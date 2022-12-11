export class CommandValidator {
  static commands = [
    { input: '.exit', method: 'exit', description: 'exit' },
    { input: 'up', method: 'up', description: 'goes upper from curren' },
    { input: 'cd', method: 'cd', description: 'goes to dedicated folder from current directory (path_to_directory can be relative or absolute)' },
    { input: 'ls', method: 'ls', description: 'print in console list of all files' },
    { input: 'cat', method: 'cat', description: 'reads file and prints it\'s content' },
    { input: 'add', method: 'add', description: 'create file' },
    { input: 'rn', method: 'rn', description: 'rename file' },
    { input: 'cp', method: 'cp', description: 'copy fille' },
    { input: 'mv', method: 'mv', description: 'move file' },
    { input: 'rm', method: 'rm', description: 'delete file' },
    { input: 'os --EOL', method: 'eol', description: 'gets host machine CPUs' },
    { input: 'os --cpus', method: 'cpus', description: 'gets host machine CPUs info' },
    { input: 'os --homedir', method: 'homedir', description: 'gets home directory and print it to console' },
    { input: 'os --username', method: 'username', description: 'gets current system user name' },
    { input: 'os --architecture', method: 'architecture', description: 'gets CPU architecture' },
    { input: 'hash', method: 'hash', description: 'calculates hash for file and print it into console' },
    { input: 'compress', method: 'compress', description: 'compress file using Brotli algorithm' },
    { input: 'decompress', method: 'decompress', description: 'decompress file' },
  ];

  defineCommand(inputString) { // TODO static
    const command = CommandValidator.commands.find(({ input }) => {
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
      .split(' ');
  }
}
