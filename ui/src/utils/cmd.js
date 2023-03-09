export function setCmd(obj) {
  let cmd = sessionStorage.getItem('cmd')
  if (!cmd) {
    cmd = []
  } else {
    cmd = JSON.parse(cmd)
  }
  cmd.push(obj)
  sessionStorage.setItem('cmd', JSON.stringify(cmd))
}
export function popCmd() {
  let cmd = sessionStorage.getItem('cmd')
  if (cmd) {
    cmd = JSON.parse(cmd)
    let obj = cmd.pop()
    sessionStorage.setItem('cmd', JSON.stringify(cmd))
    return obj
  }
  return null
}
export const cmdCode = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
}
