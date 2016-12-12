#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const tasks = require('./tasks.js')

program
  .version(pkg.version)
  .option('-p, --port', 'custom server port')
  .arguments('[task] [appname]')
  .action((task, appname) => {
    const TASKS = ['create', 'dev', 'release']

    if (TASKS.indexOf(task) === -1) {
      console.log('Gon do not know what to do with your command')
    } else {
      tasks[task](appname || program.port)
    }
  })

program.parse(process.argv)
