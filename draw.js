// Function to draw the graph visualization
function drawGraph(data) {
    var list = [];

    // Create a copy of data with necessary properties for visualization
    for (var i = 0; i < data.length; i++) {
        var now = data[i];
        var obj = {
            "value": now.value,
            "children": [].concat(now.children),
            "parent": now.parent
        }
        list.push(obj);
    }

    // Create a list of unique values from the data
    var unique = [...new Set(data.map(x => x.value))];

    // Define margins and dimensions for the graph
    var margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    };
    var width = (100 * unique.length) - margin.right - margin.left;
    var height = (100 * unique.length) - margin.top - margin.bottom;

    var i = 0;

    // Create a tree layout and diagonal projection
    var tree = d3.layout.tree().size([height, width]);
    var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });

    // Create an SVG element for the graph
    var svg = d3.select(".graph").append("svg")
        .attr("width", width ).attr("height", height + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the root node for the visualization
    var root = list[0];

    // Compute the node and link data for the visualization
    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    // Adjust vertical positions of nodes based on depth
    nodes.forEach(function (d) {
        d.y = d.depth * 70;
    });

    // Select and bind data to node groups
    var gNode = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    // Enter new nodes and update existing nodes
    var nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // Add circles for each node with transitions for appearance
    var circle = nodeEnter.append("circle")
        .attr("r", 0);

    circle.transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .attr("r", 25)
        .style("fill", function (d, i) {
            return d.children || d._children ? 'pink' : 'lightgray'; //#FFE066
        })
        .style("visibility", function(d){
            return d.value == "Empty"? "hidden" : "visible";
        })
        .duration(1000)
        .ease('elastic');

    // Add text labels for nodes with transitions for appearance
    var charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle");

    charText.transition()
        .delay(function (d, i) {
            return i * 90;
        })
        .text(function (d) {
            return d.value;
        })
        .style("visibility", function(d){
            return d.value == "Empty"? "hidden" : "visible";
        });

    // Create and manage paths (links) between nodes
    var path = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        })
        .style("visibility", function(d){
            return d.target.value == "Empty"? "hidden" : "visible";
        });

    var pathT = path.enter().insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "black")
        .style("visibility", function(d){
            return d.target.value == "Empty"? "hidden" : "visible";
        });

    // Transition for path (link) appearance
    pathT.transition()
        .delay(function (d, i) {
            return i * 85;
        })
        .attr("d", diagonal);
}
