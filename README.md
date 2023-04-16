# Node.js Files Manager

This is a simple command-line tool for managing files and directories written in Node.js for RS School Node.js course. The tool provides a set of commands for navigating the file system, creating, reading, updating, and deleting files, as well as getting system information.

## Usage

To use the tool, you need to have Node.js installed on your computer. The minimum required version is 19.0.0.
Clone this repository to your local machine and just run it:

`git clone https://github.com/<username>/<repo>.git`  
`cd <repo>`  
`npm run start`  

This will start the file manager and display a prompt where you can enter commands. To see a list of available commands, type "help" and press Enter.

Here are the available commands:

- `up`: Goes up one directory from the current directory.
- `cd <path>`: Goes to the directory specified by the path. The path can be relative or absolute.
- `ls`: Lists all files in the current directory.
- `cat <file>`: Reads the specified file and prints its contents to the console.
- `add <file>`: Creates a new file with the specified name in the current directory.
- `rn <file> <newName>`: Renames the specified file to the new name.
- `cp <file> <newFile>`: Copies the specified file to the new file.
- `mv <file> <newPath>`: Moves the specified file to the new path.
- `rm <file>`: Deletes the specified file.
- `os --EOL`: Gets the host machine's end-of-line character.
- `os --cpus`: Gets information about the host machine's CPUs.
- `os --homedir`: Gets the host machine's home directory.
- `os --username`: Gets the current system user name.
- `os --architecture`: Gets the host machine's CPU architecture.
- `hash <file>`: Calculates the hash for the specified file and prints it to the console.
- `compress <file>`: Compresses the specified file using the Brotli algorithm.
- `decompress <file>`: Decompresses the specified file.
- `help`: Shows the available commands.
- `userName <name>`: Sets the user name to the specified name.

## Architecture
The Node.js Files Manager is built using a modular architecture. The project is split into several modules that handle different aspects of the program, follows the SOLID principles and help in keeping the code modular, maintainable, and testable.. Here's a breakdown of the modules:

- **CommandExecutor**: This module is responsible for executing commands that are entered by the user. It uses other modules like PathManager and Communicator to perform the necessary actions.

- **CommandIdentifier**: This module is responsible for identifying the command that the user has entered and returning the corresponding command class.

- **CommandProvider**: This module is responsible for providing a list of available commands.

- **Communicator**: This module is responsible for communicating with the user by printing messages to the console.

- **InputListener**: This module is responsible for listening to user input and passing it to the CommandExecutor.

- **PathManager**: This module is responsible for managing file paths and providing useful functions for working with paths.

- **StateManager**: This module is responsible for keeping track of the program state, such as the current working directory and the user's name.

