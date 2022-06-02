const htmlmin = require("html-minifier")
const fg = require('fast-glob')
// const projectData = require('src/_data/storyblok/projects.js')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('assets/')
  eleventyConfig.addPassthroughCopy('./src/favicon.ico')
  // eleventyConfig.addPassthroughCopy({'./assets/_data/storyblok': 'assets/js/storyblok'})

  const randomIllustrations = fg.sync(['**/random/*', '!**/_site'])



  eleventyConfig.addCollection('random', (collection) => {
    return randomIllustrations
  })

  // eleventyConfig.addGlobalData("techList", function () {
  //   // get data from storyblok.projectpages.project.technologies.html
  //   });
  const nunjucks = require('nunjucks');
  const env = new nunjucks.Environment(/* loaders etc... */);
  env.addFilter('unique', arr => arr instanceof Array && arr.filter((e, i, arr) => arr.indexOf(e) == i) || arr);
  
  // let out = env.renderString(`{{[1, 2, 3, 2] | unique }}`);
  // console.log(out);


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