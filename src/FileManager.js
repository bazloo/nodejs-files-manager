export class FileManager {
    
    constructor(inputLisener, stateManager, commandValidator, commandExecutor) {
        this.inputLisener = inputLisener;
        this.stateManager = stateManager;
        this.commandValidator = commandValidator;
        this.commandExecutor = commandExecutor;
    }
    
    run() {
        const userNameArgument = process.argv[2];
        let programState;
        if (/^--userName/.test(userNameArgument)) {
            const userName = userNameArgument.split('=')[1];
            programState = new this.stateManager(userName);
        } else {
            throw new Error('no user name provided'); // TODO handle
        }

        this.inputLisener.init(this.handleUserInput);
        
        console.log(`Welcome to the File Manager, ${programState.userName}!`);
    };

    handleUserInput = (input) => {
        const command = new this.commandValidator().defineСommand(input);
        this.commandExecutor.run(command);        
    }
}