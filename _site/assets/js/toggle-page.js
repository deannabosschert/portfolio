// stuff for a single page application (SPA)
export default function togglePage(pageID) {
    const inputElement = selectElement(`.${pageID}`)

  
    inputElement.addEventListener('click', event => {
        removeAllClasses('.categoryPage', 'pageActive')
        addClass(`${pageID}-page`, 'pageActive')
        document.getElementById("menu-btn").checked = false
        window.scrollTo(0, 0)
    })
}

function selectElement(selector) {
    return document.querySelector(`${selector}`)
}

function selectAllElements(selector) {
    return document.querySelectorAll(`${selector}`)
}

function removeAllClasses(selector, classname) {
    document.querySelectorAll(`${selector}`).forEach(element => {
        element.classList.remove(`${classname}`)
    })
}

function addClass(selector, classname) {
    document.getElementById(`${selector}`).classList.add(`${classname}`)
}



// useful for a nested dropdown menu/hamburger submenu
function hideAll(selector) {
    selectAllElements(selector).forEach(element => {
        element.style.display = "none"
    })
}

function fontWeightNormal(selector){
    selectAllElements(`${selector}`).forEach(element => {
        element.style.fontWeight = "normal"
    })
}

function resetDropdowns(pageID) {
    hideAll(".optionsToggled")
    fontWeightNormal(".toggleHeading")
    selectElement(`.${pageID}-options`).style.display = "block"
    selectElement(`.${pageID}-heading`).style.fontWeight = "bold"
}