// RegExp for `sourceMappingURL`, i.e. the comment inserted in source files to
// declare either the URI of their source maps. The URI can be a data URI.
// Matches either:
//   //# sourceMappingURL=URI
//   //# sourceMappingURL=data:[application/json][;charset=utf-8],base64=BASE64
// We also allow:
//  - /* */ instead of //
//  - deprecated syntax //@ instead of //#
//  - spaces around tokens
//  - case insensitiveness
// TODO: once platform support allows it, use RegExp named groups (?<name>)
const COMMENT_REGEXP = /^\s*((?:\/\*)|(?:\/\/))\s*[#@]\s*sourceMappingURL\s*=\s*(?:(?:data:([^;]+)?(?:;charset=([^;]+))?;base64,([^\s*]+))|([^\s*]+))(?:\s*\*\/)?\s*$/imu

const parseComment = function({
  parts: [, commentSlashes, mime, charset, base64Content, url],
}) {
  const multiline = commentSlashes === '/*'
  return { multiline, mime, charset, base64Content, url }
}

module.exports = {
  COMMENT_REGEXP,
  parseComment,
}
