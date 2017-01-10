#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const tasks = require('./tasks.js')

program
  .version(pkg.version)
  .option('-v, --version', pkg.version)
  .arguments('<task> [appname]')
  .action((task, appname) => {
    const TASKS = ['create', 'dev', 'release']

    if (TASKS.indexOf(task) === -1) {
      console.log('Gon do not know what to do.')
    } else {
      tasks[task](appname)
    }
  })

program.parse(process.argv)
