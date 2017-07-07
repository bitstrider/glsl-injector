const injector = require('./lib/injector.js')

const fs = require('fs')

const streamIn = fs.createReadStream('test/fixtures/test-in.glsl')

injector({streamIn})
