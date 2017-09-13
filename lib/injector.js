var tokenizer = require('glsl-tokenizer/stream')
var detokenizer = require('glsl-detokenizer')
var parser = require('glsl-parser/stream')
var deparser = require('glsl-deparser')

const badParamMsg = 'Missing streamIn property in options param'

const injector = options => {
    if(!options) throw new Error(badParamMsg)

    let {streamIn, streamOut, parse, onToken, onAST, onEnd} = options
    if(!streamIn) throw new Error(badParamMsg)
    if(!streamOut) streamOut = process.stdout

    if(onAST) {
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
      }else{
          streamIn
            .pipe(tokenizer())
            .on('data', function(token) { //analyze each token coming in
                debugger;
                if(onToken) onToken(token);
                debugger;
            })
            .pipe(detokenizer())
            .pipe(streamOut)
            .on('close', function() {
                if(onEnd) onEnd();
            })
      }

}

module.exports = injector;
