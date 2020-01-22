import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'

import { getSubtitle } from '../services/crunchyrollService'
import { decode } from '../utils/decoder'
import { generateContent } from '../utils/buildSubtitle'

const name = () => 'save-sub'

const handle = async (_, { subID, savePath }) => {
  const { data } = await getSubtitle(subID)
  const $ = cheerio.load(data)

  const _iv = $('iv').text()
  const _data = $('data').text()

  const decoded = decode(subID, _iv, _data)
  const content = generateContent(decoded)

  fs.writeFile(path.resolve(savePath) + '.ass', content, error => {
    if (error) throw error
  })
}

export { name, handle }
