import cheerio from 'cheerio'

export const generateContent = data => {
  const $ = cheerio.load(data, { xmlMode: true })

  const header =
    '[Script Info]\nTitle: ' +
    $('subtitle_script').attr('title') +
    '\nScriptType: v4.00+\nWrapStyle: ' +
    $('subtitle_script').attr('wrap_style') +
    '\nPlayResX: 624\nPlayResY: 366\n\n'

  let styles =
    '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'

  $('style').each((_, el) => {
    styles +=
      'Style: ' +
      $(el).attr('name') +
      ',' +
      $(el).attr('font_name') +
      ',' +
      $(el).attr('font_size') +
      ',' +
      $(el).attr('primary_colour') +
      ',' +
      $(el).attr('secondary_colour') +
      ',' +
      $(el).attr('outline_colour') +
      ',' +
      $(el).attr('back_colour') +
      ',' +
      $(el).attr('bold') +
      ',' +
      $(el).attr('italic') +
      ',' +
      $(el).attr('underline') +
      ',' +
      $(el).attr('strikeout') +
      ',' +
      $(el).attr('scale_x') +
      ',' +
      $(el).attr('scale_y') +
      ',' +
      $(el).attr('spacing') +
      ',' +
      $(el).attr('angle') +
      ',' +
      $(el).attr('border_style') +
      ',' +
      $(el).attr('outline') +
      ',' +
      $(el).attr('shadow') +
      ',' +
      $(el).attr('alignment') +
      ',' +
      $(el).attr('margin_l') +
      ',' +
      $(el).attr('margin_r') +
      ',' +
      $(el).attr('margin_v') +
      ',' +
      $(el).attr('encoding') +
      '\n'
  })

  let events =
    '\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'

  $('event').each((_, el) => {
    events +=
      'Dialogue: 0,' +
      $(el).attr('start') +
      ',' +
      $(el).attr('end') +
      ',' +
      $(el).attr('style') +
      ',' +
      $(el).attr('name') +
      ',' +
      $(el).attr('margin_l') +
      ',' +
      $(el).attr('margin_r') +
      ',' +
      $(el).attr('margin_v') +
      ',' +
      $(el).attr('effect') +
      ',' +
      $(el).attr('text') +
      '\n'
  })

  return header + styles + events
}
