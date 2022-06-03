const fs = require('fs')

module.exports = function makeFile (filename, data) {
    console.log(`now writing file...${filename}`)
    // console.log(data)

    let stringData = JSON.stringify(data)
    let file = ''
    file += ''
    file += '\n'
    file += 'let '
    file += filename
    file += ' = '
    file += stringData
    file += ';'
    file += '\n'
    file += '\n'
    file += ''
    file += 'module.exports = '
    file += filename
    file += '\n'

    writeFile(filename, file, 'js')
    
}

function writeFile(filename, data, type) {
    let filepath = `assets/js/storyblok/JS/${filename}.${type}` // can't put this in '_data' because otherwise this client-side code would be executed on the server and everything will break
    fs.writeFile(filepath, data, (err) => {
        if (err) throw err
        console.log(`The ${type} file has been generated from storyblok data and saved at ${filepath}!`)
    })
}