// ja, ik weet dat ze async moeten en dat het een troep is, nee heeft geen prio want niemand gaat toch in mn code loeren deze week lol, zal het omgooien naar sockets voor realtime functionality anyways
// async (variable) => {
//   try {
//     return cleanColors = await getData(questionnaire, variable) // wait for data
//       .then(data => removeWhitespace(data, variable)) // remove whitespace
//       .then(trimmed => addHash(trimmed, variable)) // add hashtag
//       .then(withHash => wordToHex(withHash, variable)) // convert text to hex
//       .then(allColors => rgbToHex(allColors, variable)) // convert rgb to hex
//       .then(cleanHEX => toUpperCase(cleanHEX, variable)) // make uppercase
//   } catch (err) {
//     console.error(err)
//   }

// const Masonry = require("masonry-layout")

// }
flickr()

function flickr() {
  const endpoint = "https://www.flickr.com/services/rest/"
  const method = "flickr.photosets.getPhotos"
  const api_key = "daae0f655b02ece802021848177b2903"
  const user_id = "169241155%40N05"
  const format = "format=json&nojsoncallback=1"
  const photoset_id = "72157717231770806"
  const extras = "extras=license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_l"
  const apiLink = `${endpoint}?method=${method}&api_key=${api_key}&photoset_id=${photoset_id}&user_id=${user_id}&extras=${extras}&${format}`

  const albumname = document.querySelector('.albumname')
  const owner = document.querySelector('.owner')
  const amount = document.querySelector('.amount')
  const album = document.querySelector('.flickr')


  fetch(apiLink)
    .then(res => res.json())
    .then(data => renderPhotos(data))

  function renderPhotos(data) {
    const photoset = Object.values(data)[0]
    // console.log(photoset.photo[0])

    albumname.innerHTML += photoset.title
    amount.innerHTML += photoset.total + ' photos'
    owner.innerHTML += 'by ' + `<em>${photoset.ownername}</em>`


    return photoset.photo.map(data => {
      // console.log(data.height_l)
      album.innerHTML +=
        `
        <article>
        <figure>
            <img src="${data.url_l}" alt="${data.title}">
            <figcaption>${data.title}</figcaption>
        </figure>
        <p>hier komt een bijschrift</p>
        <ul>
         <li>${data.tags}</li>
        </ul>
        </article>`
    })
  }

}

const searchUnsplash = document.querySelector('.searchUnsplash');
searchUnsplash.addEventListener('submit', unsplash);

function unsplash() {
  const input = document.getElementById("unsplash-search")
  const searchTerm = input.value.toUpperCase()

  const endpoint = "https://api.unsplash.com"
  // const searchTerm = "trees"
  const count = "18"
  const clientID = "WgCeJ15nZWDOCklDsGksqOag8Xb4TvCILMy5datSx7w"
  const apiLink = `${endpoint}/photos/random/?count=${count}&query=${searchTerm}&client_id=${clientID}`
  
  
  // const username = "deannabosschert"
  // const clientId = "client_id=WgCeJ15nZWDOCklDsGksqOag8Xb4TvCILMy5datSx7w"
  // const apiLink = `${endpoint}users/${username}/photos/?${clientId}`
  
  const gallery = document.querySelector('.unsplashGallery')

  fetch(apiLink)
    .then(res => res.json())
    .then(data => renderPhotos(data))
    .then(data => fillMasonry(data))

  function renderPhotos(data) {
    console.log(data)
    return data.map(data => {
      // console.log(data.urls.regular)
      gallery.innerHTML += 
      `
      <article>
      <figure>
        <img style="border-bottom: 10px solid ${data.color};" src="${data.urls.regular}" alt="${data.alt_description}">
      </figure>
      </article>
      `
    })
  }


  // `
  // <article>
  // <figure>
  //   <img  style="border-bottom: 10px solid ${data.color};" src="${data.urls.regular}" alt="${data.alt_description}">
  //   <figcaption>${data.description}</figcaption>
  // </figure>
  // <p>${data.alt_description}</p>
  // </article>
  // `
  event.preventDefault();
}

function fillMasonry() {
  return

}

function hangSlingersOp() {
  var slingers = document.querySelector(".slingers");
  if (slingers.style.display === "none") {
    slingers.style.display = "block";
  } else {
    slingers.style.display = "none";
  }
}

// update page from route
function updatePageUI(route) {
  // console.log(route)
  const tabs = document.querySelectorAll('.tab')
  tabs.forEach(tab => {
    tab.classList.remove('active')
  })

  const activeSection = document.querySelector(`[data-route="${route}"]`)
  // console.log(activeSection)
  activeSection.classList.add('active')
}