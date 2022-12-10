import  { StateManager } from './src/servises/StateManager.js';

const userNameArgument = process.argv[2];
let programState;

if (/^--userName/.test(userNameArgument)) {
    const userName = userNameArgument.split('=')[1];
    programState = new StateManager(userName, null);
} else {
    throw new Error('no user name provided');
}

console.log(programState.userName);
// process.stdin.on('data', (data) => console.log(data.toString()));