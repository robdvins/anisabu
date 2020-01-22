const options = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

if (process.env.NODE_ENV === 'production') {
  options.plugins.push(
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.vue', './public/index.html'],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:]+/g) || [],
    })
  )
}

module.exports = options
