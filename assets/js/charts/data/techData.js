import projectData from './storyblok/projects.js'

// clean the data; this is the data that will be used to create the circles. One element per circle.
const allData = projectData.map(project => project.technologies) // get the technologies from each project
const techTypes = [...new Set(allData.map(tech => Object.keys(tech)).flat())] // get the unique types of technologies
const techData = forEachType(techTypes, technologiesToObject).flat()

function forEachType(array) {
    let resultArray = []
    for (let i = 0; i < array.length; i++) {
        let objectThing = technologiesToObject(array[i], (i + 1)) // create an object for each type, with the group number being the index of the type in the array + 1
        resultArray.push(objectThing)
    }
    return resultArray
}

function technologiesToObject(tech, groupNumber) {
    const techArray = mapTech(allData, tech) //
    const techNames = reduceArray(techArray).filter(item => item) // get the unique tech names and remove undefined from array
    return techToObject(techNames, tech, groupNumber)
}

function mapTech(data, tech) {
    return data.map(data => data[tech])
}

function reduceArray(data) {
    return [...new Set(data.flat())]
}

function techToObject(array, tech, groupNumber) {
    return array.map(item => {
        return {
            name: item,
            displayName: item,
            slug: item.toLowerCase().replace(/ /g, '-'),
            type: tech,
            group: groupNumber
        }
    })
}

export { techData }
