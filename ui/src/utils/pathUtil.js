/**
 *
 * @param {*} path
 */
export function getPath(path) {
  if (!path || path.length === 0 || path == 'undefined') {
    return path
  }
  let newPath = path.replace('//', '/').replace('\\', '/')
  if (newPath[newPath.length - 1] === '/') {
    return newPath.slice(0, newPath.length - 1)
  }
  return newPath
}
