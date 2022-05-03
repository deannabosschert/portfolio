const fs = require('fs')
module.exports =  function writeFile(filename, data) {
    let filepath = `src/_data/storyblok/${filename}.json`
    let json = JSON.stringify(data)

    fs.writeFile(filepath, json, (err) => {
        if (err) throw err
        console.log(`The data file has been generated at ${filepath} from storyblok data and saved!`)
    })
}