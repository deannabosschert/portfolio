require('dotenv').config()
const fetch = require("node-fetch")
const apiKey = process.env.API_KEY

module.exports = function getData(endpoint) {
    const apiLink = `${endpoint}&api_key=${apiKey}`

    return fetch(apiLink)
        .then(res => res.json())
}