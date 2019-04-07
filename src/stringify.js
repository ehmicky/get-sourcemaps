import { Buffer } from 'buffer'

const { isBuffer } = Buffer

// Input is either string or buffer
export const stringifyContent = function({ fileContent }) {
  if (isBuffer(fileContent)) {
    return fileContent.toString()
  }

  if (typeof fileContent !== 'string') {
    throw new TypeError('input must be a string')
  }

  return fileContent
}
