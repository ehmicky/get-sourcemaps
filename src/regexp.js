// RegExp for `sourceMappingURL`, i.e. the comment inserted in source files to
// declare either the URI of their source maps. The URI can be a data URI.
// Matches either:
//   //# sourceMappingURL=URI
//   //# sourceMappingURL=data:[application/json][;charset=utf-8];base64,BASE64
// We also allow:
//  - /* */ instead of //
//  - deprecated syntax //@ instead of //#
//  - spaces around tokens
//  - case insensitiveness
export const COMMENT_REGEXP = /^\s*(?<commentSlashes>(\/\*)|(\/\/))\s*[#@]\s*sourceMappingURL\s*=\s*((data:(?<mime>[^;]+)?(;charset=(?<charset>[^;]+))?;base64,(?<base64Content>[^\s*]+))|(?<url>[^\s*]+))(\s*\*\/)?\s*$/imu

export const parseComment = function ({
  groups: { commentSlashes, mime, charset, base64Content, url },
}) {
  const multiline = commentSlashes === '/*'
  return { multiline, mime, charset, base64Content, url }
}
