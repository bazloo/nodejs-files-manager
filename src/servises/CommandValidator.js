export class CommandValidator {
    static commands = [
        '.exit',
        'up', // goes upper from curren
        'cd', // goes to dedicated folder from current directory (path_to_directory can be relative or absolute)
        'ls', // print in console list of all files
        'cat', // reads file and prints it's content
        'add', // create file
        'rn', // rename file
        'cp' ,// copy fille
        'mv', // move file
        'rm', // delete file
        'os --EOL', // gets host machine CPUs    
        'os --cpus', // gets host machine CPUs info
        'os --homedir', // gets home directory and print it to console
        'os --username', // gets current system user name
        'os --architecture', // gets CPU architecture
        'hash', // calculates hash for file and print it into console
        'compress', // compress file using Brotli algorithm
        'decompress', // decompress file             
    ];

    defineСommand(input) { // TODO static        
        const command = CommandValidator.commands.find((command) => {
            const re = new RegExp(`^${command}`, 'i'); // TODO check flag
            return re.test(input);
        });

        if (!command) {
            throw new Error('Unknown command');
        }
        
        const commandArguments = this.parsArguments(command, input);

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