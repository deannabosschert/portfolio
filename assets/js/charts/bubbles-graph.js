/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// source: https://d3-graph-gallery.com/graph/circularpacking_group.html

import {
    cleanData
} from './techData.js'

// create the svg container
let svg = d3.select("#bubble_graph")
let svgWidth = svg.node().parentNode.clientWidth // set the width of the svg
let svgHeight = 600 // set the width of the svg
let margins = {
    top: 25,
    right: 50,
    bottom: 25,
    left: 50
}
let width = svgWidth - margins.left - margins.right
let height = svgHeight - margins.top - margins.bottom
// let height = svg.node().parentNode.clientHeight - margins.top - margins.bottom

svg.attr("width", width)
svg.attr("height", height)

let htmlG = ((width / 5) * 1.5) // placement of the first group of circles
let cssG = ((width / 5) * 3) // placement of the second group of circles
let jsG = ((width / 5) * 4) // placement of the third group of circles

const HTMLData = cleanData.filter(d => d.group === 1)
const CSSData = cleanData.filter(d => d.group === 2)
const JSData = cleanData.filter(d => d.group === 3)
let allData = []


// CREATE CONTAINERS AND ELEMENTS

// SET SCALES
// set an ordinal scale and set/divide (in)to 3 groups
let x = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range([htmlG, cssG, jsG]) // place the groups in the svg


// set the color scale
const color = d3.scaleOrdinal()
    .domain([1, 2, 3]) // apply to the 3 groups
    .range(["#ca97caff", "#ffb6c1ff", "#9e9effff"])


let simulation = d3.forceSimulation() // create the force simulation

function updateData(data) {
    svg.selectAll(`.group-${data[0].group}`).remove() //  remove all existing groups from the svg
    allData.push(...data) // add the new data to the allData array
    return data
}

function clearSVG() {
    // clear the svg
    svg.selectAll('.circle-container').remove()
}


function updateGraph() {


    var t = d3.transition()
        .duration(750);


    // JOIN new data with old elements.
    let circlesAll = svg.selectAll(".circle-all")
    var circles = circlesAll.selectAll("circles")
        .data(allData, function (d) {
            return d;
        });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr("class", "exit")
        .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();

    // UPDATE old elements present in new data.
    //   circles.attr("class", "update")
    //       .attr("y", 0)
    //       .style("fill-opacity", 1)
    //     .transition(t)
    //       .attr("x", function(d, i) { return i * 32; });

    // ENTER new elements present in new data.
    //   circles.enter().append("text")
    //       .attr("class", "enter")
    //       .attr("dy", ".35em")
    //       .attr("y", -60)
    //       .attr("x", function(d, i) { return i * 32; })
    //       .style("fill-opacity", 1e-6)
    //       .text(function(d) { return d; })
    //     .transition(t)
    //       .attr("y", 0)
    //       .style("fill-opacity", 1);
}



function renderGraph(data) {
    // CREATE ELEMENTS
    // append the container group for all circles to the svg
    let circlesAll = svg.append("g") // group for the circleContainers
        .attr("class", "circles-all") // class for the group/container
        .attr("class", `group-${data[0].group}`) // class for the group/container: type included
        // .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("circle") // select all circles
        .data(data) // bind the data to the circles
        .enter() // enter the data as elements 

    var t = d3.transition()
        .duration(200);


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


    // add the circle to the circleContainer(s)
    circleContainer
        .append("circle") // append a circle for each data element
        .attr("class", "circle-container__circle")
        .attr("r", 42) // set the radius
        .attr("stroke", "#595959b3") // set the outline color
        .attr("stroke-width", 0.8) // set the outline width
        .style("fill", (d) => color(d.group)) // set the color
        .transition(t) // apply a transition
        .style("fill-opacity", 0.8) // set the opacity

    // add the text to the circleContainer(s)
    circleContainer
        .append("text") // append text for each data element
        .attr("class", "circle-container__text") // give each dot a class called "circle-container__text"
        .text((d) => d.name) // set the text to the name of the data element
        .attr('font-size', (d) => '16px')
        .attr('fill', (d) => '#595959b3')
        .attr("fill-opacity", 1) // set the opacityåß
        .attr('text-anchor', (d) => 'middle') // center horizontally
        .attr('alignment-baseline', (d) => 'central') // center vertically
        .attr('font-weight', (d) => 'bold')
        .style('user-select', 'none') // don't let the text be selectable

    addSimulation(svg)
    return circleContainer
}

function removeGraph() {
    svg.selectAll('.circle-container').remove()
    // let circlesAll = svg.selectAll(".circle-all")
    

    // TODO : alles committen en nieuwe dingen in de svg proppeb
 

    // var circles = svg.selectAll(".circle-container")
    // console.log(circles)

    // var t = d3.transition()
    //     .duration(200);


    //     circles.exit()
    //     .attr("class", "exit")
    //     .transition(t)
    //     .attr("y", 60)
    //     .style("fill-opacity", 1e-6)
    //     .remove();
}

function addSimulation(svg) {
    const circleContainer__all = svg.selectAll(".circle-container")
    const circleContainer__circle_all = svg.selectAll(".circle-container__circle")
    const circleContainer__text_all = svg.selectAll(".circle-container__text")
    const allDataWithoutDuplicates = [...new Set(allData)]


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
        .force("collide", d3.forceCollide().strength(.9).radius(50).iterations(1)) // set force to prevent circles from overlapping

    simulation
        .nodes(allDataWithoutDuplicates)
        .on("tick", ticked) // this is called each time the simulation ticks (which is at each iteration)


    function ticked() {
        circleContainer__circle_all // select the circles
            .attr("cx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the circleContainer in the svg)
            .attr("cy", (d) => d.y) // set the y position to the current y position
        circleContainer__text_all // select text in each circle
            .attr("dx", (d) => d.x) // dx is the x position of the text
            .attr("dy", (d) => d.y) // dy is the y position of the text
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


function showSection() {
    var chapters = document.querySelectorAll(".chapter")

    for (var i = 0; i < chapters.length; i++) {
        var windowHeight = window.innerHeight
        var elementTop = chapters[i].getBoundingClientRect().top // get the top position of the element
        var elementBottom = chapters[i].getBoundingClientRect().bottom // get the top position of the element
        var elementVisible = 10 // the amount of pixels the element must be visible
        // console.log('windowHeight: ' + windowHeight)
        // console.log('elementTop: ' + elementTop)
        // console.log(windowHeight - elementVisible)
        if (elementTop < windowHeight - elementVisible) {
            chapters[i].classList.add("active")


            if (chapters[i].classList.contains('chapter__collaboration')) {
                console.log('collaboration')
                removeGraph()
            }


            // if (chapters[i].classList.contains('chapter__skills-tools')) {
            //     console.log('skills-tools')
            // }

            // if classlist either contains 'chapter__html' or 'chapter__css' or 'chapter__js' 
            if (chapters[i].classList.contains('chapter__html') || chapters[i].classList.contains('chapter__css') || chapters[i].classList.contains('chapter__js')) {
                if (chapters[i].classList.contains('chapter__html')) {
                    addToChart('html')
                }
                if (chapters[i].classList.contains('chapter__css')) {
                    addToChart('css')
                }
                if (chapters[i].classList.contains('chapter__js')) {
                    addToChart('js')
                }
            } else {
                // console.log('geen van drie groups')
                // clear graph
                // d3.selectAll('.circle-container').remove()
                // updateGraph(allData)
            }

        } else {
            // console.log('remove active class')
            chapters[i].classList.remove("active")
        }

    }
}

window.addEventListener("scroll", showSection)


function removeFromGraph() {
    // EXIT old elements not present in new data.
    text.exit()
        .attr("class", "exit")
        .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();
}

async function addToChart(type) {
    if (type == 'html' && allData.length < HTMLData.length) {
        console.log('show html')
        let htmldata = await updateData(HTMLData)
        renderGraph(htmldata)
    } else if (type == 'css' && allData.length < HTMLData.length + CSSData.length) {
        console.log('show css')
        let cssdata = await updateData(CSSData)
        renderGraph(cssdata)
    } else if (type == 'js' && allData.length < HTMLData.length + CSSData.length + JSData.length) {
        console.log('show js')
        let jsdata = await updateData(JSData)
        renderGraph(jsdata)
    } else {
        // console.log('not changing graph')
    }
}