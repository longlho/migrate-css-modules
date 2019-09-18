#!/usr/bin/env node

import * as program from 'commander'
import {compile} from './compile'

program
  .option('--css <path>', 'css folder path')
  .option('--ts <path>', 'ts folder path')

  program.parse(process.argv);

  compile({
      cssPathPattern: program.css,
      srcPathPattern: program.ts
  })