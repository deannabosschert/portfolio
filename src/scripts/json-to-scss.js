// note: tried to put this in .eleventy.js for immediate reload, but it didn't work and it's not really necessary unless the json file itself is updated
const fs = require('fs')
const getData = require('./lib/get-data.js')
const cleanData = require('./lib/clean-data.js')
const mapToScss = require('./lib/map-to-scss.js')
const writeScss = require('./lib/write-to-scss.js')
const writeDocs = require('./lib/write-to-docs.js')

module.exports = function jsonToScss() {
    // toScss('color', 'variables', getData('styles/design-tokens')) // fetch data from design-tokens.json, which is generated by figma
    // toScss('font', 'selectors', getData('styles/design-tokens'))
    
    let myVariables = getData('styles/variables') //  fetch data from file i've assembled myself for now
    for (let key in myVariables) {
        toScss(key, 'list', myVariables) // generate scss-file for each variable in variables.json
    }
}

async function toScss(type, output, jsonData) {
    try {
        return cleanedData = await cleanData(type, output, jsonData)
            .then(data => mapToScss(type, output, data))
            .then(data => writeScss(type, data))
            .then(data => writeDocs(type, data))
    } catch (error) {
        console.log(error)
    }
}