export default class Communicator {
  constructor(programState) {
    this.programState = programState;
  }

  WELCOME = () => process.stdout.write(`Welcome to the File Manager, ${this.programState.userName}!\n\n`);

  YOU_ARE_IN = () => process.stdout.write(`\nYou are currently in ${this.programState.currentDirectory}\n\n`);

  GOODBYE = () => process.stdout.write(`Thank you for using File Manager, ${this.programState.userName}, goodbye!\n\n`);

  PROVIDE_USER_NAME = () => process.stdout.write('Enter your name please,\nwrite: \'userName {your_name}\'\n\n');

  SEPARATE = () => process.stdout.write('\n');

  USE_HELP = () => process.stdout.write('You can use \'help\' command, to see the list of available commands \n\n');

  ERROR = (error) => {
    switch (true) {
      case error?.code === 'ENOENT':
        process.stdout.write(`INVALID_INPUT: ${error?.message.replace('ENOENT: ', '') || error.toString()}\n\n`);
        this.USE_HELP();
        break;
      case error?.message.includes('unknown command'):
        process.stdout.write(`${error.message || error.toString()}\n\n`);
        this.USE_HELP();
        break;
      case error?.message.includes('can not reach'):
        process.stdout.write(`${error.message || error.toString()}\n\n`);
        break;
      default:
        process.stdout.write(`OPERATION FAILED: ${error.message || error.toString()}\n\n`);
    }
  };
}
