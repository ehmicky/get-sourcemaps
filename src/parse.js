import { Base64 } from 'js-base64'

import { COMMENT_REGEXP, parseComment } from './regexp.js'
import { stringifyContent } from './stringify.js'

const { decode: decodeBase64 } = Base64

// Parse the source map comment from a file's content.
// Returns `{ url, multiline }` if source map is another file (URL or path).
// Returns `{ sourcemap, multiline }` if source map is inline (data URI).
// `multiline` is a boolean indicating whether the comment uses `//` or `/*`
// comment style.
// Returns `undefined` if none found.
// Either return `undefined` or throw an error if source map comment is invalid.
export const parse = function (fileContent) {
  const fileContentA = stringifyContent({ fileContent })

  const parts = COMMENT_REGEXP.exec(fileContentA)

  // Either no source map comment or comment has invalid syntax
  if (parts === null) {
    return
  }

  const { multiline, mime, charset, base64Content, url } = parseComment(parts)

  if (url !== undefined) {
    return parseUrlComment({ url, multiline })
  }

  return parseDataUriComment({ multiline, mime, charset, base64Content })
}

// When the source map comment uses an external URI
const parseUrlComment = function ({ url, multiline }) {
  validateUrl({ url })
  return { url, multiline }
}

const validateUrl = function ({ url }) {
  try {
    // eslint-disable-next-line no-new
    new URL(url, 'http://localhost')
  } catch {
    throw new Error(`Source map's URL '${url}' is invalid`)
  }
}

// When the source map comment uses a data URI
const parseDataUriComment = function ({
  multiline,
  mime,
  charset,
  base64Content,
}) {
  // Source map specification only allows JSON and UTF-8
  if (!JSON_MIME_TYPES.has(mime)) {
    throw new Error(
      `Source map's MIME type must be 'application/json' not '${mime}'`,
    )
  }

  if (!UTF8_CHARSETS.has(charset)) {
    throw new Error(`Source map's charset must be 'utf-8' not '${charset}'`)
  }

  const content = parseBase64(base64Content)
  const sourcemap = parseJson({ content })
  return { sourcemap, multiline }
}

const JSON_MIME_TYPES = new Set([undefined, 'application/json', 'text/json'])
const UTF8_CHARSETS = new Set([undefined, 'utf-8', 'utf8'])

const parseBase64 = function (base64Content) {
  try {
    return decodeBase64(base64Content)
  } catch {
    throw new Error("Source map's data URI contains invalid base64")
  }
}

const parseJson = function ({ content }) {
  try {
    return JSON.parse(content)
  } catch {
    throw new Error("Source map's data URI contains invalid JSON")
  }
}
