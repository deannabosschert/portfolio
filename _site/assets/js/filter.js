// when a checkbox is checked, the corresponding filter is added to the filter array
// when a checkbox is unchecked, the corresponding filter is removed from the filter array
const techList = document.querySelectorAll(".techList li")
const techCheckboxes = document.querySelectorAll(".project-filters input")
const projectCards = document.querySelectorAll(".projects-list>ul>li")
const projectCards_tech = document.querySelectorAll(".techList")
let activeFilters = []
let classCount = []

checkBoxes()
function checkBoxes() {
    techCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const filter = checkbox.value.toLowerCase()
            
            if (checkbox.checked) {
                activeFilters.push(filter)
                filterProjects('add', filter)
            } else {
                activeFilters.splice(activeFilters.indexOf(filter), 1)
                filterProjects('remove', filter)
            }
            showProjects(classCount)
        })
    })
}

function filterProjects(change, item) {
    if (activeFilters.length === 0) { // if no filters are active
        classCount = []
    } else {
        projectCards_tech.forEach(techList => {
            const techListItems = techList.querySelectorAll("li")
            techListItems.forEach(techListItem => {
                let parentProject = techListItem.parentElement.parentElement.parentElement.parentElement
                if (change == 'add') {
                    if (techListItem.innerText.toLowerCase() == item) {
                        classCount.push(parentProject.classList[0].toLowerCase())
                    }
                } else if (change == 'remove') {
                    if (techListItem.innerText.toLowerCase() == item) {
                        let index = classCount.indexOf(parentProject.classList[0].toLowerCase())
                        if (index > -1) {
                            classCount.splice(index, 1)
                        }
                    }
                }
            })
        })
    }
}

function showProjects(projects) {
    if (projects.length > 0) {
        const uniqueProjects = [...new Set(projects)]
        projectCards.forEach(card => {
            if (uniqueProjects.includes(card.classList[0])) {
                card.classList.remove("u-hidden")
            } else {
                card.classList.add("u-hidden")
            }
        })
    } else { // show all projects if no filters are active
        projectCards.forEach(card => {
            card.classList.remove("u-hidden")
        })
    }
}

function getParentElement(element, nodes) {
    let nodesUpward = `${'.parentElement'.repeat(nodes)}`
    return element[nodesUpward]
}