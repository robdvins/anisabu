import { getMetadata, getList } from '../services/crunchyrollService'
import cheerio from 'cheerio'

const name = () => 'subtitle-channel'

const handle = async (_, episodeID) => {
  const metadataResponse = await getMetadata(episodeID)
  let $ = cheerio.load(metadataResponse.data, { xmlMode: true })

  const metadata = {
    mediaID: $('media_id').text(),
    animeTitle: $('series_title').text(),
    episodeTitle: $('episode_title').text(),
    episodeNumber: $('episode_number').text(),
  }

  const listResponse = await getList($('media_id').text())
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

export { name, handle }
