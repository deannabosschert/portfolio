module.exports = function cleanStoryblokData(folder, data) {
    return data.map(item => {
        if (folder == 'projects') {
            return {
                "id": item.id,
                "parent_id": item.parent_id,
                "name": item.name,
                "slug": item.slug,
                "full_slug": upFolderLevel(item.full_slug),
                "title": item.content.title,
                "summary": item.content.summary,
                "description": mapArray(item.content.description, 'description'),
                "technologies": item.content.technologies,
            }
        } else if (folder == "links") {
            return {
                "id": item.id,
                "parent_id": item.parent_id,
                "name": item.name,
                "slug": item.slug,
                "full_slug": item.full_slug,
                "title": item.content.case,
                "site": item.content.site,
                "detail": item.content.detail,
                "repo": item.content.repository,
                "documentation": item.content.documentation
            }
        } else if (folder == "boilerplates") {
            return {
                "id": item.id,
                "parent_id": item.parent_id,
                "name": item.name,
                "slug": item.slug,
                "full_slug": upFolderLevel(item.full_slug),
                "title": item.content.title,
                "summary": item.content.summary,
                "description": mapArray(item.content.description, 'description'),
                "technologies": item.content.technologies
            }
        } else {
            console.log('leftovers')
        }
    })
}

function mapArray(array, key) {
    return array.map(item => item[key])
    // let cleanDescriptions = descriptions.map(item => {})
    // console.log(cleanDescriptions)
}

function upFolderLevel(data) {
    // remove the first folder from the path
    let path = data.split('/')
    path.shift()
    return path.join('/')

}