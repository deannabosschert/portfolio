const storyblokToData = require('./storyblok-to-data.js')
const mergeData = require('./merge-data.js')
const writeJsonData = require('./write-json-data.js')

module.exports = function storyblokData() {
  writeStoryblokData(["projects", "links"], 'projectpages')
  writeStoryblokData(["boilerplates", "links"], 'boilerplatepages')
}

function writeStoryblokData(folders, mergedFilename) {
    return storyblokToData(folders)
        .then(res => {
            return mergeData(res)
        })
        .then(data => {
            writeJsonData(mergedFilename, data)
        })
        .catch(error => {
            console.log(error)
        })
}