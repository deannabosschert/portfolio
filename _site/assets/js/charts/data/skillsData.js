import skills from './content/skills.js'

// loop over the skills object and add a slug to each item
const skillsData = cleanData(skills)

function cleanData(data) {
    // loop over the skills object and add a slug to each item
    Object.keys(data).map(key => addSlug(data[key]))
    Object.keys(data).map(key => addType(data[key], key))
    Object.keys(data).map(key => addDisplayName(data[key]))
    
    Object.keys(data).map(key => {
        if (key != 'teaching') {
            return addLogo(data[key])
        } else {
            return
        }
    })

    // for loop with index over the data keys and give each item a group property with the index number
    for (let i = 0; i < Object.keys(data).length; i++) {
        addGroup(data[Object.keys(data)[i]], i)
    }

    return data
}

function addSlug(data) {
    return data.map(item => {
        item.slug = item.name.toLowerCase().replace(/ /g, '-')
        return item
    })
}
function addType(data, type) {
    return data.map(item => {
        item.type = type.toLowerCase()
        return item
    })
}

function addDisplayName(data) {
    return data.map(item => {
        item.displayName = item.name.replace(/Adobe /g, '') // remove the Adobe prefix from the display name
        item.displayName = item.displayName.replace(/Microsoft /g, '') 
        item.displayName = item.displayName.replace(/Dropbox /g, '') 
        return item
    })
}

function addLogo(data) {
    return data.map(item => {
        const extension = checkExtension(item.slug)
        item.logo = `/assets/img/logos/${item.slug}.${extension}`
        return item
    })
}

function addGroup(data, group) {
    return data.map(item => {
        item.group = (group + 4)
        return item
    })
}

function checkExtension(slug) {
    // should contain a decent workaround to do this client-side but for now...
    if (slug == 'figma' || slug == 'weebly') {
        return 'svg'
    } else {
        return 'png'
    }
}

export {
    skillsData
}