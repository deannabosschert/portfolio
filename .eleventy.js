const htmlmin = require("html-minifier")
const fg = require('fast-glob')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('assets/')
  eleventyConfig.addPassthroughCopy('./src/favicon.ico')

  const randomIllustrations = fg.sync(['**/random/*', '!**/_site'])

  eleventyConfig.addCollection('random', (collection) => {
    return randomIllustrations
  })


  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html") && !outputPath.includes("posts")) { //  only for .html files outside of the `posts` directory
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }

    return content
  })

  return {
    dir: {
      input: 'src',
      data: '_data'
    },
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}