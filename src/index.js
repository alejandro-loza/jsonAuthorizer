#! /usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program.command('authorize')
  .description('Operations authorizer CLI from JSON file input')
  .argument('<path>', 'the json file path')
  .action((str, options) => {
    console.log(str);
    console.log(options);
  });

program.parse();
