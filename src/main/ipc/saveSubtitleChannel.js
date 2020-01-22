import fs from 'fs'

import Decoder from '../utils/decoder'
import BuildSubtitle from '../utils/buildSubtitle'

export class SaveSubtitleChannel {
  constructor() {
    this.decoder = new Decoder()
    this.build = new BuildSubtitle()
  }

  name() {
    return 'save-sub'
  }

  async handle(_, { subID, path }) {
    const { data } = await Service.getSubtitle(subID)
    const $ = cheerio.load(data)

    const _iv = $('iv').text()
    const _data = $('data').text()

    const decoded = decode(subID, _iv, _data)
    const content = generateContent(decoded)

    writeFile(path + '.ass', content, error => {
      if (error) throw error
    })
  }
}
