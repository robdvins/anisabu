import { CrunchyrollService } from '../services/crunchyrollService'
import cheerio from 'cheerio'

export class SubtitleChannel {
  constructor() {
    this.service = new CrunchyrollService()
  }

  name() {
    return 'subtitle-channel'
  }

  async handle(_, episodeID) {
    const metadataResponse = await this.service.getMetadata(episodeID)
    const listResponse = await this.service.getList(episodeID)

    let $ = cheerio.load(metadataResponse.data, { xmlMode: true })

    const metadata = {
      mediaID: $('media_id').text(),
      animeTitle: $('series_title').text(),
      episodeTitle: $('episode_title').text(),
      episodeNumber: $('episode_number').text(),
    }

    $ = cheerio.load(listResponse.data, { xmlMode: true })

    const list = []

    $('subtitle').each((_, el) => {
      list.push({
        subID: $(el).attr('id'),
        lang: $(el)
          .attr('title')
          .match(/\[(.*?)\]/)[0]
          .replace(/\[|\]/g, ''),
      })
    })

    return {
      ...metadata,
      list,
    }
  }
}
