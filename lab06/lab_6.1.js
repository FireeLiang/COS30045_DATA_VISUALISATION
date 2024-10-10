function init() {
    // Set up the SVG dimensions
    var w = 500; // Width of the SVG
    var h = 130; // Height of the SVG

    // Initialize the dataset with values
    var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 7, 13];

    // Define xScale as a band scale based on dataset length
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length)) // Mapping indices of dataset items
        .rangeRound([0, w]) // Range spans the width of the SVG
        .paddingInner(0.05); // Adds padding between the bars

    // Define yScale as a linear scale based on dataset values
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)]) // Domain is from 0 to the maximum value in the dataset
        .range([0, h]); // Range maps the height of the SVG (bars grow upwards)

    // Create an SVG container and append it to the #rec element
    var svg = d3.select("#rec")
        .append("svg")
        .attr("width", w) // Set the width of the SVG
        .attr("height", h) // Set the height of the SVG
        .attr("fill", "rgb(255,192,203)"); // Pink background color

    // Bind data to rectangles (bars) and append them to the SVG
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i); // Position bars using the xScale
        })
        .attr("y", function(d) {
            return h - yScale(d); // Set the y position so bars grow upwards
        })
        .attr("width", xScale.bandwidth()) // Set the width of each bar
        .attr("height", function(d) {
            return yScale(d); // Set the height of the bars
        })
        // Change bar color to orange on mouseover
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "orange"); // Highlight the bar

            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2.90;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            // Append a tooltip showing the data value
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d) // Display the data value
                .attr("fill", "black");
        })
        // Reset bar color and remove tooltip on mouseout
        .on("mouseout", function() {
            d3.select("#tooltip").remove(); // Remove the tooltip
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", "rgb(255,192,203)"); // Reset the color to pink
        });

    // Add functionality to the "Add" button
    d3.select("#add")
        .on("click", function() {
            var maxValue = 25; // Max random value for new data

            // Generate a random number and add it to the dataset
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber); // Add the new data point to the dataset
            xScale.domain(d3.range(dataset.length)); // Update the xScale domain to accommodate new data

            // Bind updated data to the bars
            var bars = svg.selectAll("rect")
                .data(dataset);

            // Enter new bars for new data points
            bars.enter()
                .append("rect")
                .attr("x", w) // Start from the right edge and transition in
                .attr("y", function(d) {
                    return h - yScale(d); // Set the y position of the new bar
                })
                .attr("width", xScale.bandwidth()) // Set the width of the new bar
                .attr("height", function(d) {
                    return yScale(d); // Set the height of the new bar
                })
                .merge(bars) // Merge new and existing bars
                // Add mouseover functionality for new bars
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("fill", "orange"); // Change color on hover

                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 3;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    // Append a tooltip showing the data value
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .text(d)
                        .attr("fill", "black");
                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove(); // Remove tooltip on mouseout
                    d3.select(this)
                        .transition()
                        .duration(250)
                        .attr("fill", "rgb(255,192,203)"); // Reset the bar color
                })
                .transition()
                .duration(250)
                .attr("x", function(d, i) {
                    return xScale(i); // Update x position for all bars
                })
                .attr("y", function(d) {
                    return h - yScale(d); // Update y position for all bars
                })
                .attr("width", xScale.bandwidth()) // Update width for all bars
                .attr("height", function(d) {
                    return yScale(d); // Update height for all bars
                });
        });

    // Add functionality to the "Remove" button
    d3.select("#remove")
        .on("click", function() {
            dataset.pop(); // Remove the last data point from the dataset
            xScale.domain(d3.range(dataset.length)); // Update the xScale domain

            // Bind updated data to the bars
            var bars = svg.selectAll("rect")
                .data(dataset);

            // Exit and remove bars that no longer have data
            bars.exit()
                .transition()
                .duration(250)
                .attr("x", w) // Move the bar to the right before removing
                .remove(); // Remove the bar

            // Transition the remaining bars
            bars.transition()
                .duration(250)
                .attr("x", function(d, i) {
                    return xScale(i); // Update x position of remaining bars
                })
                .attr("y", function(d) {
                    return h - yScale(d); // Update y position of remaining bars
                })
                .attr("width", xScale.bandwidth()) // Update width of remaining bars
                .attr("height", function(d) {
                    return yScale(d); // Update height of remaining bars
                });
        });
}

// Initialize the chart when the window loads
window.onload = init;
