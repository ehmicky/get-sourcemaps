import {
  Buffer: { isBuffer },
} from 'buffer'

// Input is either string or buffer
const stringifyContent = function({ fileContent }) {
  if (isBuffer(fileContent)) {
    return fileContent.toString()
  }

  if (typeof fileContent !== 'string') {
    throw new TypeError('input must be a string')
  }

  return fileContent
}

module.exports = {
  stringifyContent,
}
