import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'

import { CrunchyrollService } from '../services/crunchyrollService'
import { Decoder } from '../utils/decoder'
import { BuildSubtitle } from '../utils/buildSubtitle'

export class SaveSubtitleChannel {
  constructor() {
    this.service = new CrunchyrollService()
    this.decoder = new Decoder()
    this.build = new BuildSubtitle()
  }

  name() {
    return 'save-sub'
  }

  async handle(_, { subID, savePath }) {
    const { data } = await this.service.getSubtitle(subID)
    const $ = cheerio.load(data)

    const _iv = $('iv').text()
    const _data = $('data').text()

    const decoded = this.decoder.decode(subID, _iv, _data)
    const content = this.build.generateContent(decoded)

    fs.writeFile(path.resolve(savePath) + '.ass', content, error => {
      if (error) throw error
    })
  }
}
