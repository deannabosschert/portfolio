// source: https://d3-graph-gallery.com/graph/circularpacking_group.html
// set the dimensions and margins of the graph
var width = 900
var height = 900
var group1 = width / 4
var group2 = (width / 4) * 2
var group3 = (width / 4) * 3

// append the svg object to the body of the page
var svg = d3.select("#bubbles_graph")

// .append("svg")
// .attr("width", width)
// .attr("height", height)

// create dummy data -> just one element per circle
var data = [{
        "name": "HTML",
        "group": 1
    },  {
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
    },  {
        "name": "SCSS",
        "group": 2
    }, {
        "name": "InuitCSS",
        "group": 2
    },{
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

// A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range([group1, group2, group3])

// A color scale
var color = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range(["#9e9effff", "#ca97caff", "#ff9dabff"])

// Initialize the circle: all located at the center of the svg area
var circlesAll = svg.append("g") // group for the circles
    .attr("class", "circles-all") // 
    .style("fill", "#202020") // set the color
    .style("fill-opacity", 0.8) // set the opacity
    .selectAll("circle") // select all circles
    .data(data) // associate the data to the elements to add
    .enter() // create new elements if needed



var circleContainer = circlesAll
    .append("g") // append a container for each data element
    .attr("class", "circle-container")
    .attr("cx", width / 2) // set the x position
    .attr("cy", height / 2) // set the y position
    .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted) // on start of drag gesture
        .on("drag", dragged) // while dragging
        .on("end", dragended)) // on end of drag gesture

var circleContainer__circle = circleContainer
    .append("circle") // append a circle for each data element
    .attr("r", 50) // set the radius
    // .attr("cx", width / 2) // set the x position
    // .attr("cy", height / 2) // set the y position
    .attr("class", "circle-container__circle")
    .style("fill", (d) => color(d.group)) // set the color
    .style("fill-opacity", 0.8) // set the opacity
    .attr("stroke", "#595959b3") // set the outline color
    .style("stroke-width", 1) // set the outline width


// var circleContainerbg = circleContainer
//     .append("rect") // append a container for each data element
//     .attr("class", "circle-containerbg")

// add the text to the nodes
var circleContainer__text = circleContainer
    .append("text")
    .attr("class", "circle-container__text") // give each dot a class called "circle-container__text"
    .text((d) => d.name)
    // .attr('cx', (d) => x(d.group))
    // .attr('cy', (d) => height / 2)
    .attr('dx', (d) => x(d.group))
    .attr('dy', (d) => height / 2)
    // .attr('dy', (d) => 10)
    // .attr('dx', (d) => 0)
    .attr('font-size', (d) => '24px')
    .attr('fill', (d) => '#595959b3')
    .attr('text-anchor', (d) => 'middle')
    .attr('alignment-baseline', (d) => 'central')
    .attr('font-weight', (d) => 'bold')





// Features of the forces applied to the nodes:
var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(0.5).x((d) => x(d.group)))
    .force("y", d3.forceY().strength(0.1).y(height / 2))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.1).radius(32).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(data)
    .on("tick", ticked);

function ticked() { // this forces the circles to stay in the center of the svg area
    // update circle positions each tick of the force simulation, then update the circle positions into groups
    circleContainer__circle // select the elements
        .attr("cx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the node in the svg)
        .attr("cy", (d) => d.y) // set the y position to the current y position

    circleContainer__text // select the elements
        .attr("dx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the node in the svg)
        .attr("dy", (d) => d.y) // set the y position to the current y position

    // circleContainer__text // select the elements
    //     .attr("cx", (d) => d.x) // set the x position to the current position of the node in the force layout simulation (which is the x position of the node in the svg)
    //     .attr("cy", (d) => d.y) // set the y position to the current y position


    // circles
    //     .append("text")
    //     .attr("class", "circle-container__text") // give each dot a class called "circle-container__text"
    //     .text('test')

    // // add text to the nodes
    // updateNodes();


}

function updateNodes() {
    u = d3.select('.circle-container')
        .append("text")
        .attr("class", "circle-container__text") // give each dot a class called "circle-container__text"
        .text((d) => d.name)
        .attr('cx', function (d) {
            return d.x
        })
        .attr('cy', function (d) {
            return d.y
        })
        .attr('dy', function (d) {
            return 5
        });
}



// What happens when a circle is dragged?
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
}