export default class Communicator {
  constructor(programState) {
    this.programState = programState;
  }

  WELCOME = () => process.stdout.write(`Welcome to the File Manager, ${this.programState.userName}!\n\n`);

  YOU_ARE_IN = () => process.stdout.write(`You are currently in ${this.programState.currentDirectory}\n\n`);

  GOODBYE = () => process.stdout.write(`Thank you for using File Manager, ${this.programState.userName}, goodbye!\n\n`);

  PROVIDE_USER_NAME = () => process.stdout.write('Enter your name please,\nwrite: \'userName {your_name}\'\n\n');

  ERROR = (error) => process.stdout.write(`${error.message || error.toString()}\n\n`);
}
