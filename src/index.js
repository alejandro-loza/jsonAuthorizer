#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program.command('authorize')
  .description('Operations authorizer CLI from JSON file input')
  .argument('<path>', 'the json file path')
  .action((str, options) => {
    console.log(str);
    console.log(options);
  });

program.parse();
