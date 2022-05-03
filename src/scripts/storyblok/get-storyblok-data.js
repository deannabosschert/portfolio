const StoryblokClient = require('storyblok-js-client')
require('dotenv').config()

module.exports = function getStoryblokData(folder) {
    const Storyblok = new StoryblokClient({    // init with access token
        accessToken: process.env.STORYBLOK_KEY,
        cache: {
            clear: 'auto',
            type: 'memory'
        }
    })

    let folderPath 
    if (folder == 'projects' || folder == 'boilerplates') {
        folderPath = `repositories/${folder}`
    } else if (folder == 'links') {
        folderPath = `${folder}`
    } else {
        console.log('folder path to fetch unknown')
    }
    
    // use the universal js client to perform the request
    return Storyblok.get('cdn/stories', {
            "starts_with": `${folderPath}/`,
            "token": "XQW7EW1DzEsPWBCssNui6Att"
        })
        .then(response => {
            return response
        }).catch(error => {
            console.log(error)
        })

}