// source: https://d3-graph-gallery.com/graph/circularpacking_group.html
const width = 900 // set the width of the svg
const height = 900  // set the height of the svg
const htmlG = width / 4 // placement of the first group of circles
const cssG = (width / 4) * 2 // placement of the second group of circles
const jsG = (width / 4) * 3 // placement of the third group of circles

// create data; this is the data that will be used to create the circles. One element per circle.
const data = [{
        "name": "HTML",
        "group": 1
    }, {
        "name": "A11y",
        "group": 1
    }, {
        "name": "Dingen",
        "group": 1
    }, {
        "name": "CSS",
        "group": 2
    }, {
        "name": "SASS",
        "group": 2
    }, {
        "name": "SCSS",
        "group": 2
    }, {
        "name": "InuitCSS",
        "group": 2
    }, {
        "name": "JavaScript",
        "group": 3
    }, {
        "name": "Node.js",
        "group": 3
    }, {
        "name": "Eleventy",
        "group": 3
    }, {
        "name": "Express",
        "group": 3
    }, {
        "name": "Databases",
        "group": 3
    }, {
        "name": "EJS",
        "group": 3
    }, {
        "name": "Vue.js",
        "group": 3
    }

]

// SET SCALES
// set an ordinal scale and set/divide (in)to 3 groups
const x = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range([htmlG, cssG, jsG]) // place the groups in the svg

// set the color scale
const color = d3.scaleOrdinal()
    .domain([1, 2, 3]) // applyto the 3 groups
    .range(["#ca97caff", "#ffb6c1ff", "#9e9effff"]) 

// CREATE CONTAINERS AND ELEMENTS
// create the svg container
const svg = d3.select("#bubble_graph")
    .append("svg")
    .attr("class", "bubble_graph_svg") // give it a class
    .attr("width", width)
    .attr("height", height)

// append the container group for all circles to the svg
const circlesAll = svg.append("g") // group for the circleContainers
    .attr("class", "circles-all") // class for the group/container
    .selectAll("circle") // select all circles
    .data(data) // bind the data to the circles
    .enter() // enter the data as elements

// add a circle container element for each data element and apply drag behavior
const circleContainer = circlesAll
    .append("g") // append a container for each data element
    .attr("class", "circle-container") // class for the group/container
    // .attr("cx", width / 2) // set the x position
    // .attr("cy", height / 2) // set the y position
    .style('cursor', 'pointer') // change pointer to hand to suggest that the circle can be interacted with (dragged)
    .call(d3.drag() // call specific function when circle is dragged
        .on("start", startDrag) // on start of drag gesture
        .on("drag", currentDrag) // while dragging
        .on("end", endDrag)) // on end of drag gesture

// add the circle to the circleContainer(s)
const circleContainer__circle = circleContainer 
    .append("circle") // append a circle for each data element
    .attr("class", "circle-container__circle")
    .attr("r", 50) // set the radius
    .attr("stroke", "#595959b3") // set the outline color
    .attr("stroke-width", 0.8) // set the outline width
    .style("fill", (d) => color(d.group)) // set the color
    .style("fill-opacity", 0.8) // set the opacity

// add the text to the circleContainer(s)
const circleContainer__text = circleContainer
    .append("text") // append text for each data element
    .attr("class", "circle-container__text") // give each dot a class called "circle-container__text"
    .text((d) => d.name) // set the text to the name of the data element
    // .attr('dx', (d) => x(d.group)) // set the x position of the text to the x position of the circleContainer
    // .attr('dy', (d) => height / 2) // set the y position of the text to the center of the circleContainer
    .attr('font-size', (d) => '24px')
    .attr('fill', (d) => '#595959b3')
    .attr("fill-opacity", 1) // set the opacity
    .attr('text-anchor', (d) => 'middle') // center horizontally
    .attr('alignment-baseline', (d) => 'central') // center vertically
    .attr('font-weight', (d) => 'bold')
    .style('user-select', 'none') // don't let the text be selectable


// CREATE FORCE LAYOUT
// create simulation that will be used to move the circles
const simulation = d3.forceSimulation() // create the force simulation
    .force("x", d3.forceX().strength(0.5).x((d) => x(d.group))) // set force to move circles horizontally
    .force("y", d3.forceY().strength(0.1).y(height / 2)) // set force to move circles vertically
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // set force to center the circles
    .force("charge", d3.forceManyBody().strength(1)) // set force to repel circles from each other
    .force("collide", d3.forceCollide().strength(.1).radius(60).iterations(1)) // set force to prevent circles from overlapping


// apply the simulation to the circles, this will make the circles move
// the simulation will run for a number of iterations
// the simulation will stop when the simulation.alpha() is less than 0.01
simulation
    .nodes(data)
    .on("tick", ticked);

// this is called each time the simulation ticks (which is at each iteration)
function ticked() { 
    circleContainer__circle // select the elements
        .attr("cx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the circleContainer in the svg)
        .attr("cy", (d) => d.y) // set the y position to the current y position

    circleContainer__text // select text in each circle
        .attr("dx", (d) => d.x) // dx is the x position of the text
        .attr("dy", (d) => d.y) // dy is the y position of the text
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