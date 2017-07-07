var tokenizer = require('glsl-tokenizer/stream')
var parser = require('glsl-parser/stream')
var deparser = require('glsl-deparser')
var fs = require('fs')

var stream = require('stream')

const badParamMsg = 'You must pass in options with streamIn property to function injector!'

const injector = options => {
    if(!options) throw new Error(badParamMsg)

    let {streamIn, streamOut, onToken, onAST, onEnd} = options
    if(!streamIn) throw new Error(badParamMsg)
    if(!streamOut) streamOut = process.stdout

    streamIn
      .pipe(tokenizer())
      .on('data', function(token) { //analyze each token coming in
          debugger;
          if(onToken) onToken(token);
          debugger;
      })
      .pipe(parser())
      .on('data', function(ast) { //analyze each ast coming in
          debugger;
          if(onAST) onAST(ast);
          debugger;
      })
      .pipe(deparser())
      .pipe(streamOut)
      .on('close', function() {
          if(onEnd) onEnd();
      })

}

module.exports = injector;
