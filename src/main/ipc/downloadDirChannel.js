import os from 'os'
import path from 'path'

const name = () => 'download-dir'

const handle = (e, _) => {
  e.sender.send('download-path', path.join(os.homedir(), '/Desktop'))
}

export { name, handle }
