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

    let $ = cheerio.load(metadataResponse.data, { xmlMode: true })

    const listResponse = await this.service.getList($('media_id').text())

    const metadata = {
      mediaID: $('media_id').text(),
      animeTitle: $('series_title').text(),
      episodeTitle: $('episode_title').text(),
      episodeNumber: $('episode_number').text(),
    }

    $ = cheerio.load(listResponse.data, { xmlMode: true })

    const langs = []

    $('subtitle').each((_, el) => {
      langs.push({
        subID: $(el).attr('id'),
        lang: $(el)
          .attr('title')
          .match(/\[(.*?)\]/)[0]
          .replace(/\[|\]/g, ''),
      })
    })

    return {
      ...metadata,
      langs,
    }
  }
}
