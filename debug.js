const injector = require('./lib/injector.js')

const fs = require('fs')

const streamIn = fs.createReadStream('test/fixtures/test-in.glsl')
const streamOut = fs.createWriteStream('test/fixtures/debug.glsl')

// let buffer = ''
// const onToken = token => {buffer+=token.data;}
// const onEnd = () => {fs.writeFileSync('parseout.glsl',buffer)}

injector({streamIn, streamOut})

// process.on('exit',onEnd)
