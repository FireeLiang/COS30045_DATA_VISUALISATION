// Set up SVG dimensions and dataset
var w = 500; // Width of the SVG container
var h = 150; // Height of the SVG container
var barPadding = 3; // Padding between bars
var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9]; // Dataset to be represented in the bar chart

// Define xScale as a band scale for the x-axis based on the dataset's length
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length)) // Domain is the indices of the dataset items
    .range([0, w]) // Range maps to the width of the SVG
    .paddingInner(0.05); // Padding between the bars

// Define yScale as a linear scale for the y-axis based on dataset values
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)]) // Domain from 0 to the maximum value in the dataset
    .range([h, 0]); // Range maps to the height of the SVG (inverted so larger values go up)

// Create the SVG container within the "article.content" element
var svg1 = d3.select("article.content")
    .append("svg")
    .attr("width", w) // Set the width of the SVG
    .attr("height", h); // Set the height of the SVG

// Add an x-axis using d3.axisBottom() with the xScale
var xAxis = d3.axisBottom(xScale);

// Append the x-axis to the SVG, positioned at the bottom
svg1.append("g")
    .attr("transform", "translate(0," + h + ")") // Position the x-axis at the bottom
    .call(xAxis); // Render the x-axis

// Draw bars for each data point in the dataset
svg1.selectAll("rect")
    .data(dataset) // Bind dataset to the bars
    .enter()
    .append("rect") // Append a 'rect' for each data point
    .attr("x", function(d, i) {
        return xScale(i); // Set the x position using xScale
    })
    .attr("y", function(d) {
        return yScale(d); // Set the y position using yScale to ensure bars grow upwards
    })
    .attr("width", xScale.bandwidth()) // Set the width of each bar based on xScale bandwidth
    .attr("height", function(d) {
        return h - yScale(d); // Calculate the height of each bar (inverted y-axis)
    })
    .attr("fill", "rgb(106, 90, 205)"); // Set the color of the bars (purple)

// Add text labels on top of the bars
svg1.selectAll("text")
    .data(dataset) // Bind dataset to text elements
    .enter()
    .append("text") // Append text for each data point
    .text(function(d) {
        return d; // Display the data value as text
    })
    .attr("fill", "black") // Set text color to black
    .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2; // Center the text horizontally within each bar
    })
    .attr("text-anchor", "middle") // Align the text in the center
    .attr("y", function(d) {
        return h - (d * 4) - 5; // Position the text slightly above the top of each bar
    });

// Update button functionality to change the bars and text dynamically
d3.select("#updateButton").on("click", function() {
    // Generate a new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random value between 0 and 25
    }

    // Update the text labels with the new dataset
    var labels = svg1.selectAll("text")
        .data(newDataset);

    labels.enter() // Add new text elements if needed
        .append("text")
        .merge(labels) // Merge new and existing text elements
        .transition()
        .duration(500) // Animate the transition over 500ms
        .text(function(d) {
            return d; // Update the text content with new values
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally in bars
        })
        .attr("y", function(d) {
            return h - (d * 4) - 5; // Reposition text slightly above the bar
        });

    labels.exit().remove(); // Remove text elements for data that no longer exists

    // Update the bars with the new dataset
    var bars = svg1.selectAll("rect")
        .data(newDataset);

    bars.enter() // Add new bars if needed
        .append("rect")
        .merge(bars) // Merge new and existing bars
        .transition()
        .duration(500) // Animate the transition over 500ms
        .attr("y", function(d) {
            return yScale(d); // Update the y position of the bars
        })
        .attr("height", function(d) {
            return h - yScale(d); // Update the height of the bars
        });

    bars.exit().remove(); // Remove bars that no longer have data
});
