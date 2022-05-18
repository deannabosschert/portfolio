/* eslint-disable no-unused-lets */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// source: https://d3-graph-gallery.com/graph/circularpacking_group.html
import {
    techData
} from './data/techData.js'

import {
    skillsData
} from './data/skillsData.js'

console.log(skillsData)

// create the svg container
let svg = d3.select("#bubble_graph")
let svgWidth = svg.node().parentNode.clientWidth // relative to the parent container
let svgHeight = svg.node().parentNode.clientHeight // relative to the parent container
// console.log(svgHeight2)
// let svgHeight = 600
const margins = {
    top: 25,
    right: 50,
    bottom: 25,
    left: 50
}
let width = svgWidth - margins.left - margins.right
let height = svgHeight - margins.top - margins.bottom
svg.attr("width", width)
svg.attr("height", height)

const xGroups = {
    'html': ((width / 5) * 1.5), // x position
    'css': ((width / 5) * 3),
    'js': ((width / 5) * 4),
    'collaboration': (width / 2),
    'design': (width / 2),
    'teaching': (width / 2),
    'documentation': (width / 2)
}

const dataGroups = {
    'html': techData.filter(d => d.group === 1),
    'css': techData.filter(d => d.group === 2),
    'js': techData.filter(d => d.group === 3),
    'collaboration': skillsData.collaboration,
    'design': skillsData.design,
    'teaching': skillsData.teaching,
    'documentation': skillsData.documentation
}

const colorArray = ["hsl(300, 32%, 69%)", "hsl(351, 100%, 86%)", "hsl(240, 100%, 81%)"]

let allData = []

// CREATE CONTAINERS AND ELEMENTS
// set an ordinal scale and set/divide (in)to 3 groups
let x = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range([xGroups.html, xGroups.css, xGroups.js]) // place the groups in the svg

// set the color scale
const color = d3.scaleOrdinal()
    .domain([1, 2, 3]) // apply to the 3 groups
    .range(colorArray)

let simulation = d3.forceSimulation() // create the force simulation

function updateData(data) {
    svg.selectAll(`.group-${data[0].group}`).remove() //  remove all existing groups from the svg
    allData.push(...data) // add the new data to the allData array
    return data // we only return the new data to update the graph with
}

function renderGraph(data) {
    const randoColor = colorArray[Math.floor(Math.random() * colorArray.length)]
    // console.log(randoColor)

    let radius = 50
    let t = d3.transition()
        .duration(200)

    // CREATE ELEMENTS
    // append the container group for all circles to the svg
    let circlesAll = svg.append("g") // group for the circleContainers
        .attr("class", "circles-all") // class for the group/container
        .attr("class", `group-${data[0].group}`) // class for the group/container: type included
        // .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("circle") // select all circles
        .data(data) // bind the data to the circles
        .enter() // enter the data as elements 

    circlesAll.exit()
        .attr("class", "exit")
        .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();

    // add a circle container element for each data element and apply drag behavior
    let circleContainer = circlesAll
        .append("g") // append a container for each data element
        .attr("class", "circle-container") // class for the group/container
        .attr("x", svgWidth / 2) // set the x position
        .attr("y", height / 2) // set the y position
        .style('cursor', 'pointer') // change pointer to hand to suggest that the circle can be interacted with (dragged)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", startDrag) // on start of drag gesture
            .on("drag", currentDrag) // while dragging
            .on("end", endDrag)) // on end of drag gesture


    if (data[0].logo) { // if a logo can be used as background, use it
        radius = 60

        let circleContainerDefs = circleContainer // add pattern to link to the circle
            .append("defs")
            .attr("class", "circle-container__defs")

        let circleContainerDefsPattern = circleContainerDefs
            .append("pattern")
            .attr("class", "circle-container__defs__pattern")
            .attr("id", (d) => d.slug)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("height", (radius * 2))
            .attr("width", (radius * 2))

        circleContainerDefsPattern
            .append("rect")
            .attr("class", "circle-container__defs__pattern__rect")
            .attr("height", (radius * 2))
            .attr("width", (radius * 2))
            .attr("fill", "white")
            .style("fill-opacity", 1) // set the opacity of the background

        circleContainerDefsPattern
            .append("image")
            .attr("class", "circle-container__defs__pattern__image")
            .attr("height", radius)
            .attr("width", radius)
            .attr("xlink:href", (d) => d.logo)
            .style("fill-opacity", 0.1) // set the opacity

        circleContainerDefsPattern // add another white bg on top of the image to simulate transparency on the image
            .append("rect")
            .attr("class", "circle-container__defs__pattern__rect2")
            .attr("height", (radius * 2))
            .attr("width", (radius * 2))
            .attr("fill", "white")
            .style("fill-opacity", 0.75) // set the opacity of the white overlay


        const linearGradient = circleContainer
            .append("linearGradient")
            .attr("class", "circle-container__gradient")
            .attr("id", (d) => ('lineargradient-' + d.slug))



        linearGradient
            .append("stop")
            .attr("class", "gradient-1")
            .attr("offset", "0%")
            .attr("stop-color", (d) => {
                // get random color from colorArray
                return color(randoColor)
            })
            .style("stop-opacity", 0.1)

        linearGradient
            .append("stop")
            .attr("class", "gradient-2")
            .attr("offset", "50%")
            .attr("stop-color", (d) => {
                return color(randoColor)

                return color(colorArray[Math.floor(Math.random() * colorArray.length)])
                return color(d.group)
            })
            .style("stop-opacity", 0.8)

        linearGradient
            .append("stop")
            .attr("class", "gradient-3")
            .attr("offset", "99%")
            .attr("stop-color", (d) => {
                return color(randoColor)

                return color(colorArray[Math.floor(Math.random() * colorArray.length)])
                return color(d.group)
            })
            .style("stop-opacity", 0.1)

        linearGradient
            .append("stop")
            .attr("class", "gradient-4")
            .attr("offset", "100%")
            .attr("stop-color", (d) => {
                return color(randoColor)

                return color(colorArray[Math.floor(Math.random() * colorArray.length)])
                return color(d.group)
            })
            .style("stop-opacity", 0.05)

        // add the circle to the circleContainer(s)
        circleContainer
            .append("circle")
            .attr("class", "circle-container__circle")
            .attr("r", radius) // set the radius
            .attr("stroke-width", 0.25) // set the outline width
            .style("fill", (d) => (`url(#lineargradient-${d.slug})`)) // set the color
            // .style("fill", (d) => `url(#${d.slug})`) 
            .transition(t)

    } else {
        // just add the circle to the circleContainer(s)
        radius = 52.5


        const radialGradient = circleContainer
            .append("radialGradient")
            .attr("class", "circle-container__radialgradient")
            .attr("id", (d) => ('radialgradient-' + d.slug))
            .attr("r", "100%")
            .attr("fx", "18%")
            .attr("fy", "40%")


        radialGradient
            .append("stop")
            .attr("stop-color", (d) => {
                const hsl1 = d3.hsl(color(d.group))
                // return d3.hsl(hsl1.h - 10, 1, hsl1.l)
                return d3.hsl(hsl1.h, hsl1.s, hsl1.l + 0.25)
            })
            .attr("offset", "0%")

        radialGradient
            .append("stop")
            .attr("stop-color", (d) => {
                const hsl2 = d3.hsl(color(d.group))
                // return d3.hsl(hsl2.h, 0.7, 0.4)
                return d3.hsl(hsl2.h, hsl2.s, hsl2.l)

            })
            .attr("offset", "30%")

        radialGradient
            .append("stop")
            .attr("stop-color", (d) => {
                const hsl3 = d3.hsl(color(d.group))
                // return d3.hsl(hsl3.h + 10, 1, 0.4)

                return d3.hsl(hsl3.h, hsl3.s, hsl3.l)

            })

            .attr("offset", "60%")
            .attr("stop-opacity", "0")

        radialGradient
            .append("animate")
            .attr("attributeName", "fx")
            .attr("dur", "7s")
            .attr("values", "18%;79%;21%")
            .attr("repeatCount", "indefinite")

        radialGradient
            .append("animate")
            .attr("attributeName", "fy")
            .attr("dur", "7s")
            .attr("values", "47%;31%;22%;31%;52%;71%;82%;69%;52%")
            .attr("repeatCount", "indefinite")






        circleContainer
            .append("circle") // append a circle for each data element
            .attr("class", "circle-container__circle")
            .attr("r", radius) // set the radius
            // .attr("stroke", "#595959b3") // set the outline color
            // .attr("stroke-width", 0.25) // set the outline width
            // .style("stroke", (d) => (`url(#lineargradient-${d.slug})`)) // set the color
            .style("fill", (d) => (`url(#radialgradient-${d.slug})`)) // set the color
            .transition(t) // apply a transition
            .style("fill-opacity", 1) // set the opacity
    }


    // add the text to the circleContainer(s)
    circleContainer
        .append("text")
        .attr("class", "circle-container__text")
        .text((d) => {
            if (d.displayName) {
                return d.displayName.split(' ')[0]
            } else {
                return d.name
            }
        })
        .attr('alignment-baseline', (d) => 'middle') // center vertically
        .attr('transform', (d) => 'translate(0, -5)') // move the text up a bit

    circleContainer
        .append("text")
        .attr("class", "circle-container__text")
        .text((d) => {
            if (d.displayName) {
                return d.displayName.split(' ')[1]
            } else {
                return d.name
            }
        })
        .attr('alignment-baseline', (d) => 'text-before-edge')
        .attr('transform', (d) => 'translate(0, 5)') // move the text down a bit


    // apply to both text elements
    circleContainer
        .selectAll('.circle-container__text')
        .each(function (d) {
            if (d.displayName) {
                if (d.displayName.split(' ').length == 1) {
                    d3.select(this).attr('alignment-baseline', 'middle')
                    d3.select(this).attr('transform', 'translate(0, 3)')
                } else if (d.displayName.split(' ').length > 1) {}
            }
            d3.select(this)
                .attr('font-size', (d) => ((radius == '52.5') ? '16px' : '17px'))
                .attr('fill', (d) => ((radius == '52.5') ? '#202020' : '#202020'))
                .attr("fill-opacity", 1) // set the opacity
                .attr('text-anchor', (d) => 'middle') // center horizontally
                .attr('font-weight', (d) => ((radius == '52.5') ? '400' : '500'))
                .style('user-select', 'none') // don't let the text be selectable
        })

    addSimulation(svg, radius)

    return circleContainer
}

function removeFromGraph() {
    let t = d3.transition()
        .duration(200)

    svg.selectAll('.circle-container')
        .remove()
        .exit()
        .attr("class", "exit")
        .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();

    allData = []
}

function removeGroupFromGraph(group) {
    let t = d3.transition()
        .duration(200)

    svg.selectAll(`.group-${group}`)
        .remove()
        .exit()
        .attr("class", "exit")
        .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6) // set the opacity to 0; due to a bug in Chrome, this needs to be set to 1e-6
        .remove();

}

function addSimulation(svg, radius) {
    const circleContainer__all = svg.selectAll(".circle-container")
    const circleContainer__circle_all = svg.selectAll(".circle-container__circle")
    const circleContainer__defs__pattern_all = svg.selectAll(".circle-container__defs__pattern")
    const circleContainer__text_all = svg.selectAll(".circle-container__text")

    // CREATE FORCE LAYOUT
    // reset/remove any existing force layout
    simulation.alphaTarget(.03) // if there is an active simulation, stop it (alpha < 1)
    simulation.alpha(0.5).restart() // set the alpha to 0.5 and restart the simulation
    circleContainer__all.fx = null // remove the fixed x position
    circleContainer__all.fy = null // set the node to fixed so that it doesn't move

    // create simulation that will be used to move the circles
    simulation
        .force("x", d3.forceX().strength(0.2).x((d) => x(d.group))) // set force to move circles horizontally
        .force("y", d3.forceY().strength(0.1).y(height / 2)) // set force to move circles vertically
        .force("center", d3.forceCenter().x(svgWidth / 2).y(height / 2)) // set force to center the circles
        .force("charge", d3.forceManyBody().strength(1)) // set force to repel circles from each other
        .force("collide", d3.forceCollide().strength(.9).radius((radius * 1.25)).iterations(1)) // set force to prevent circles from overlapping

    simulation
        .nodes([...new Set(allData)])
        .on("tick", ticked) // this is called each time the simulation ticks (which is at each iteration)

    function ticked() {
        circleContainer__circle_all // select the circles
            .attr("cx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the circleContainer in the svg)
            .attr("cy", (d) => d.y) // set the y position to the current y position
        circleContainer__text_all // select text in each circle
            .attr("dx", (d) => d.x) // dx is the x position of the text
            .attr("dy", (d) => d.y) // dy is the y position of the text

        circleContainer__defs__pattern_all // select the pattern
            .attr("x", (d) => (d.x - 30)) // set the x position to the current position of the node in the force layout simulation (which is the x position of the circleContainer in the svg)
            .attr("y", (d) => (d.y - 30)) // set the y position to the current y position
    }
}

// CREATE DRAG FUNCTIONALITY
function startDrag(d) { // when a circle is dragged
    if (!d3.event.active) simulation.alphaTarget(.03).restart() // if the simulation isn't running, start it
    d.fx = d.x // assign the current x position of the circle to be the fixed x position that we're dragging
    d.fy = d.y // assign the current y position of the circle to be the fixed y position that we're dragging
}

function currentDrag(d) { // when a circle is dragged
    d.fx = d3.event.x // set the fixed x position to be wherever the user is dragging the circle
    d.fy = d3.event.y // set the fixed y position to be wherever the user is dragging the circle
}

function endDrag(d) { // if the circle is no longer being dragged
    if (!d3.event.active) simulation.alphaTarget(.03) // if there is an active simulation, stop it
    d.fx = null // remove the fixed x position
    d.fy = null // set the node to fixed so that it doesn't move
}

// CREATE SCROLL FUNCTIONALITY
function showSection() { // when a section is visible to the user, show the graph and text
    let chapters = document.querySelectorAll(".chapter")

    chapters.forEach((chapter) => {
        let chapterSectionRect = chapter.getBoundingClientRect()
        let chapterRect = chapter.getBoundingClientRect()
        // let parentHeight = chapterRect.node().parentNode.clientHeight // relative to the parent container


        if (chapterSectionRect.top < chapterRect.height * 2) {
            chapter.classList.add("active")
        }

        if (chapterSectionRect.top > chapterRect.height * 2) { // if the top of the section is greater than the height of the chapter
            chapter.classList.remove("active")
        }

        if (chapterSectionRect.bottom < chapterRect.height * 1.2) {
            chapter.classList.remove("active")
        }

        if (chapterSectionRect.top < chapterRect.height * 1 && chapterSectionRect.bottom > chapterRect.height * .8) {
            let chapterName = chapter.id.split("__")[1]
            addToChart(chapterName)
        }

    })
}

window.addEventListener("scroll", showSection)

function addToChart(type) {
    if (type == 'html' || type == 'css' || type == 'js') {
        removeGroupFromGraph(4)
        if (!tellGroup(allData).includes(type)) { // if the group is not already in the graph   
            updateGraph(type)
        } else {
            // console.log('graph is up-to-date')
        }
    } else if (type == 'collaboration' || type == 'design' || type == 'documentation' || type == 'teaching') {
        if (!tellGroup(allData).includes(type)) {

            removeFromGraph()
            updateGraph(type)
        } else {
            // console.log('graph is up-to-date')
        }

    } else if (type == 'skills-tools') {
        removeFromGraph()
    }
}

async function updateGraph(type) {
    let data = await updateData(dataGroups[type])
    renderGraph(data)
}

function tellGroup(data) {
    return [...new Set(data.map(d => d.type))]
}