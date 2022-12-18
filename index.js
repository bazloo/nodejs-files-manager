import InputListener from './src/servises/InputListener.js';
import StateManager from './src/servises/StateManager.js';
import CommandIdentifier from './src/servises/CommandIdentifier.js';
import CommandExecutor from './src/servises/CommandExecutor.js';
import Communicator from "./src/servises/Communicator.js";

import FileManager from './src/FileManager.js';

const fileManager = new FileManager(
  InputListener,
  StateManager,
  CommandIdentifier,
  CommandExecutor,
  Communicator,
);

fileManager.run();
