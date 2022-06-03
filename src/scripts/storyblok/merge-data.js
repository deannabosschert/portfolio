module.exports = function mergeData(data) {
    let projectData = data[0]
    let linkData = data[1]

    // match and merge the two data arrays by slug 
    projectData.forEach(project => {
         linkData.forEach(link => {
            if (project.slug === link.slug) {
                project.links = {
                    "site": link.site.url,
                    "detail": project.full_slug,
                    "repository": link.repo.url,
                    "documentation": link.documentation.url
                }
            }
        })
    })

    return projectData
}