module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "src/assets/fonts" })
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "src/assets/img" })
  // eleventyConfig.addPassthroughCopy('src/index.js')

  // src for below code: https://github.com/11ty/eleventy/issues/440
  // Import fast-glob package
  const fg = require('fast-glob')

  const randomIllustrations = fg.sync(['**/random/*', '!**/_site'])
  const dnataIllustrations = fg.sync(['**/workplace_illustrations/*', '!**/_site'])

  eleventyConfig.addCollection('random', (collection) => {
    return randomIllustrations
  })

  eleventyConfig.addCollection('workplace', (collection) => {
    return dnataIllustrations
  })


  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
