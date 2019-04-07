import { COMMENT_REGEXP } from './regexp.js'
import { stringifyContent } from './stringify.js'

// Check if a file's content contains a source map comment
export const test = function(fileContent) {
  const fileContentA = stringifyContent({ fileContent })
  return COMMENT_REGEXP.test(fileContentA)
}
