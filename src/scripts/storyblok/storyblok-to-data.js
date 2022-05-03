const getStoryblokData = require('./get-storyblok-data.js')
const cleanStoryblokData = require('./clean-storyblok-data.js')
const writeJsonData = require('./write-json-data.js')

module.exports = function storyblokToData(folders) {
    return Promise.all(folders.map(folder => {
        return getStoryblokData(folder)
            .then(res => {
                return cleanStoryblokData(folder, res.data.stories)
            })
            .then(data => {
                writeJsonData(folder, data)
                return data
            })
            .catch(error => {
                console.log(error)
            })
    }))
}