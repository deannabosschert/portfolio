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
                "descriptions": mapArray(item.content.description, 'description'),
                "technologies": {
                    "html": item.content.html,
                    "css": item.content.css,
                    "js": item.content.js
                }
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
                "descriptions": mapArray(item.content.description, 'description'),
                "technologies": {
                    "html": item.content.html,
                    "css": item.content.css,
                    "js": item.content.js
                }
            }
        } else {
            console.log('leftovers')
        }
    })
}

function mapArray(array, key) {
    return array.map(item => item[key])
}

function upFolderLevel(data) { // remove the first folder from the path
    let path = data.split('/')
    path.shift()
    return path.join('/')

}