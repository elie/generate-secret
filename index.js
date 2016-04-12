#!/usr/bin/env node

const fs = require("fs")
const prompt = require('prompt');

const addToken = (token) => {
  prompt.start();
  var schema = {
    properties: {
      filename: {
        description: 'Enter the name of the file you would like to write the secret to \n Default is .env',
        default: '.env'
      },
    }
  };
  prompt.get(schema, function (err, result) {
    fs.appendFile(result.filename, `SECRET=${token}\n`, 'utf8');
  })
}

require('crypto').randomBytes(48, function(err, buffer) {
  if(err) console.log("Something went wrong: ", err)
  const token = buffer.toString('hex');
  addToken(token);
});