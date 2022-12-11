import { InputListener } from './src/servises/InputListener.js';
import { StateManager } from './src/servises/StateManager.js';
import { CommandIdentifier } from './src/servises/CommandIdentifier.js';
import { CommandExecutor } from './src/servises/CommandExecutor.js';
// TODO make import dom index

import { FileManager } from './src/FileManager.js';

const fileManager = new FileManager(
  InputListener,
  StateManager,
  CommandIdentifier,
  CommandExecutor,
);

fileManager.run();
