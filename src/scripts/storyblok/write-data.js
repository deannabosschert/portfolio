const fs = require('fs')
const jsonToJS = require('../lib/json-to-js.js')

module.exports = function writeData(filename, data) {
    console.log('writeData called')
    console.log(filename)
    let json = JSON.stringify(data)


    writeFile(filename, json, 'json')
    jsonToJS(`${filename}`, data)
}


function writeFile(filename, data, type) {
    let filepath = `src/_data/storyblok/${filename}.${type}` // only for non-js files unless it's server side js

    fs.writeFile(filepath, data, (err) => {
        if (err) throw err
        console.log(`The ${type} file has been generated from storyblok data and saved at ${filepath}!`)
    })
}