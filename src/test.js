'use strict'

const { COMMENT_REGEXP } = require('./regexp')
const { stringifyContent } = require('./stringify')

// Check if a file's content contains a source map comment
const test = function(fileContent) {
  const fileContentA = stringifyContent({ fileContent })
  return COMMENT_REGEXP.test(fileContentA)
}

module.exports = {
  test,
}
