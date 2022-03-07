const variables = require('../../../_data/styles/variable-naming.json')
const addUnit = require('./add-unit.js')

module.exports = async function generateVariableNames(data) {
    let allVariables = ''
    for (let property in data) { // each property (e.g. 'width' or 'height') inside type (e.g. 'spacing')
        let variableNames = ''
    
        let valueArray = data[property]
        let unit = await addUnit(property)
        let names

        if (property == 'tailwind') {
            names = variables.tailwind
        } else {
            names = variables.names
        }

        for (let i = 0; i < valueArray.length; i++) {
            variableNames += `\n $${property}-${names[i]}: ${valueArray[i]}${unit};`
        }
        allVariables += variableNames + '\n'
    }
    return allVariables
}