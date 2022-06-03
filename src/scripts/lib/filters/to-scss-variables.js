const sanitizeString = require('./sanitize-string.js')

// map array of objects to list of ready-to-use scss variables
module.exports = async function toScssVariables(type, data) {
    return scssVariables = data.map(async function (item) {
        let variableArray = []
        for (let key in item) {
            return new Promise((resolve, reject) => {
                let scssLine = constructScss(key, item, type)
                    .then(data => {
                        variableArray.push(data)
                        return variableArray
                    })
                    .then(data => {
                        return data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                resolve(scssLine)
            })
        }
    })
}
async function constructScss(key, item, type) {
    let selector = await sanitizeString(key)
    return new Promise((resolve, reject) => {
        let properties = item[key]
        let scss = `$${selector}: ${properties[type]};`
        resolve(scss)
    })
}