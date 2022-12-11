import { InputListener } from './src/servises/InputListener.js';
import { StateManager } from './src/servises/StateManager.js';
import { CommandValidator } from './src/servises/CommandValidator.js';
import { CommandExecutor } from './src/servises/CommandExecutor.js';
// TODO make import dom index

import { FileManager } from './src/FileManager.js';

const fileManager = new FileManager(
  InputListener,
  StateManager,
  CommandValidator,
  CommandExecutor,
);

fileManager.run();
