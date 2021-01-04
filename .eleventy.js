module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy('src/assets/img')
  // eleventyConfig.addPassthroughCopy('src/index.js')

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
