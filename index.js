#!/usr/bin/env node

'use strict'

const fs = require("fs")
const prompt = require('prompt');

const addToken = (token) => {
  if(process.argv.indexOf('--yes'.toLowerCase()) !== -1 || process.argv.indexOf('--yes'.toLowerCase()) !== -1){
    fs.appendFile('.env', `SECRET=${token}\n`, 'utf8');
  }
  else {
    let schema = {
      properties: {
        filename: {
          description: 'Enter the name of the file you would like to write the secret to \n Default is .env',
          default: '.env'
        },
        key: {
          description: 'Enter the name of the key you would like\n Default is SECRET',
          default: 'SECRET'
        }
      }
    };
    prompt.get(schema, function (err, result) {
      fs.appendFile(result.filename, `${result.key}=${token}\n`, 'utf8');
    })
  }
}

require('crypto').randomBytes(48, function(err, buffer) {
  if(err) console.log("Something went wrong: ", err)
  const token = buffer.toString('hex');
  addToken(token);
});