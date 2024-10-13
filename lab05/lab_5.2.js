// Set up SVG dimensions and dataset
var w = 500; // Width of the SVG
var h = 150; // Height of the SVG
var barPadding = 3; // Padding between bars
var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9]; // Data for the bar chart

// Define xScale as a band scale, mapping dataset indices to width
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length)) // Map indices of dataset items
    .range([0, w]) // Map range to the width of the SVG
    .paddingInner(0.05); // Add padding between bars

// Create the SVG container within the "article.content" element
var svg1 = d3.select("article.content")
    .append("svg")
    .attr("width", w) // Set SVG width
    .attr("height", h); // Set SVG height

// Add an x-axis using d3.axisBottom() with the xScale
var xAxis = d3.axisBottom(xScale);

// Append the x-axis to the SVG and move it to the bottom
svg1.append("g")
    .attr("transform", "translate(0," + h + ")") // Position x-axis at the bottom
    .call(xAxis); // Call the xAxis to render it

// Draw bars for each data point in the dataset
var bars = svg1.selectAll("rect")
    .data(dataset) // Bind dataset to the bars
    .enter()
    .append("rect") // Append a 'rect' for each data point
    .attr("x", function (d, i) {
        return xScale(i); // Set x position based on index
    })
    .attr("y", function (d) {
        return h - (d * 4); // Set y position so that bars grow upwards
    })
    .attr("width", xScale.bandwidth()) // Set the width of each bar
    .attr("height", function (d) {
        return d * 4; // Set height proportional to data value
    })
    .attr("fill", "rgb(106, 90, 205)"); // Set the fill color for the bars (purple)

// Add text labels inside the bars
var textLabels = svg1.selectAll("text")
    .data(dataset) // Bind dataset to text elements
    .enter()
    .append("text") // Append text for each data point
    .text(function (d, i) { // Include index in the label
        return d + ' (' + i + ')'; // Show value and index
    })
    .attr("fill", "white") // Set the text color to white for visibility
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally within the bar
    })
    .attr("text-anchor", "middle") // Align text in the center
    .attr("y", function (d) {
        return h - (d * 4) + 15; // Position text inside the bar
    });

// Function to update bars when a new dataset is generated
function updateBars(newDataset, easingFunction) {
    // Update the text labels with the new dataset
    var labels = svg1.selectAll("text")
        .data(newDataset);

    labels.enter() // Add new text elements if needed
        .append("text")
        .merge(labels) // Merge new and old elements
        .transition()
        .duration(2000) // Animate the transition
        .ease(easingFunction) // Use the specified easing function
        .text(function (d, i) { // Update label to show new value and index
            return d + ' (' + i + ')';
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Center text within the bar
        })
        .attr("y", function (d) {
            return h - (d * 4) + 15; // Position text inside the bar
        });

    labels.exit().remove(); // Remove old text elements that no longer have data

    // Update the bars with the new dataset
    var bars = svg1.selectAll("rect")
        .data(newDataset);

    bars.enter() // Add new bars if needed
        .append("rect")
        .merge(bars) // Merge new and old bars
        .transition()
        .duration(2000) // Animate the transition
        .ease(easingFunction) // Use the specified easing function
        .attr("y", function (d) {
            return h - (d * 4); // Set y position so bars grow upwards
        })
        .attr("height", function (d) {
            return d * 4; // Set height proportional to data value
        });

    bars.exit().remove(); // Remove bars that no longer have data
}

// Button to update the bars with a random dataset and cubic easing function
d3.select("#updateButton").on("click", function () {
    // Generate new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random value between 0 and 25
    }
    updateBars(newDataset, d3.easeCubicInOut); // Use cubic easing for the update
});

// Button to update the bars with a random dataset and circle easing function
d3.select("#easeCircleButton").on("click", function () {
    // Generate new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random value between 0 and 25
    }
    updateBars(newDataset, d3.easeCircleOut); // Use circle easing for the update
});

// Button to update the bars with a random dataset and elastic easing function
d3.select("#easeElasticButton").on("click", function () {
    // Generate new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random value between 0 and 25
    }
    updateBars(newDataset, d3.easeElasticOut); // Use elastic easing for the update
});
