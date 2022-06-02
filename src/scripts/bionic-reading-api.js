const fetch = require('node-fetch')
const endpoint = "https://bionic-reading1.p.rapidapi.com"
let mode = "html" // the data format I want to get back

let textContent =
  "To be fair, you have to have a very high IQ to understand Rick and Morty. The humour is extremely subtle, and without a solid grasp of theoretical physics most of the jokes will go over a typical viewers head. There's also Rick's nihilistic outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Narodnaya Volya literature, for instance. The fans understand this stuff they have the intellectual capacity to truly appreciate the depths of these jokes, to realise that they're not just funny- they say something deep about LIFE." // the text I want to convert

getBionicData() // yes, can be an IIFE

function getBionicData() {
const encodedParams = new URLSearchParams()
encodedParams.append("content", textContent)
encodedParams.append("response_type", "html")
encodedParams.append("request_type", "html")
encodedParams.append("fixation", "1")
encodedParams.append("saccade", "40")

const options = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.: but we will use POST because we want to throw data to this API
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com", // API host
    "X-RapidAPI-Key": "ba0e5b5532mshb3b94c36c5b626ap1ccc9ejsn6f63239fae6f" // my personal API key
  },
  body: encodedParams
}

  let apiLink = `${endpoint}/convert` // the assembled link to the API (usually more complex)

  fetch(apiLink, options) // fetching data from the API with the options above
    .then((res) => res.text()) // converting the data to text (html)
    .then((data) => makeHTML(data)) // making the HTML
    .catch((err) => console.error(err)) // logging any errors
}

function makeHTML(data) {
  return `<p>${data}</p>`  // assemble HTML from the data
}

