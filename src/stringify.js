'use strict'

const assert = require('assert')
const {
  Buffer: { isBuffer },
} = require('buffer')

// Input is either string or buffer
const stringifyContent = function({ fileContent }) {
  if (isBuffer(fileContent)) {
    return fileContent.toString()
  }

  assert(typeof fileContent === 'string', 'input must be a string')

  return fileContent
}

module.exports = {
  stringifyContent,
}
