const tap = require('tap')

const injector = require('../lib/injector.js')

const fs = require('fs')


tap.test("injector on float literals, ignoring globals", function (t) {

    const streamIn = fs.createReadStream('test/fixtures/test-in.glsl')
    const streamOut = fs.createWriteStream('test/fixtures/test-out.glsl')

    const onToken = token => {
        //TODO: change this to ignore float literals in global scope
        if (token.type=='float') {
            token.data = '1.0'; //replace all float literals with the value 1.0
        }
    }

    const onAST = ast => {
        //🔥🔥🔥
    }

    const onEnd = () => {
        const a = 'test/fixtures/test-out.glsl';
        const b = 'test/fixtures/floatLiteral-ignoreGlobal.glsl';
        const compareA = fs.readFileSync(a).toString().replace(/\s/g, "");
        const compareB = fs.readFileSync(b).toString().replace(/\s/g, "");

        t.ok(compareA == compareB, `${a} did not match ${b}`);
        t.end();
    }

    injector({streamIn, streamOut, onToken, onAST, onEnd})

})
