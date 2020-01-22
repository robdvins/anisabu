import os from 'os'
import path from 'path'

export class DownloadDirChannel {
  name() {
    return 'download-dir'
  }

  async handle(e, _) {
    e.sender.send('download-path', path.join(os.homedir(), '/Desktop'))
  }
}
