#! /usr/bin/env node
import { Command } from 'commander';
import { executor } from './commands/authorizeExecutor.js'
const program = new Command();

program.command('authorize')
  .description('Operations authorizer CLI from JSON file input')
  .argument('<path>', 'the json file path')
  .action((str, options) => {
    console.log(str);
    executor(str);
  });

program.parse();
