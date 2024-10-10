function init(){
    // Define the width and height of the SVG element
    var w = 500;
    var h = 150;

    // Initialize the dataset with an array of values
    var dataset = [14,5,26,23,9,10,28,3,7,13];

    // Create a band scale for the x-axis based on the dataset length
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length)) // Maps the dataset indices
                    .rangeRound([0,w]) // Maps the range to the width of the SVG
                    .paddingInner(0.05); // Adds padding between the bars

    // Create a linear scale for the y-axis based on the dataset values
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)]) // Sets the domain from 0 to the maximum value in the dataset
                    .range([0, h]); // Maps the range to the height of the SVG

    // Create an SVG element and append it to the #rec div, setting its width, height, and background color
    var svg = d3.select("#rec")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .attr("fill", "rgb(255,192,203)"); // Pink background color

    // Bind the dataset to the rectangles (bars) in the bar chart
    svg.selectAll("rect")
        .data(dataset)
        .enter() // For each data item
        .append("rect") // Append a rectangle
        .attr("x",function(d,i){
            return xScale(i); // Position the bars using the xScale
        })
        .attr("y", function(d){
            return h - yScale(d); // Set the top y-coordinate based on the dataset value
        })
        .attr("width", xScale.bandwidth()) // Set the width of each bar
        .attr("height",function(d){
            return yScale(d); // Set the height of the bar based on the dataset value
        });

    // Add text labels to each bar
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d; // Display the dataset value as text
        })
        .attr("fill","black") // Set the text color
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth()/2; // Position the text in the center of the bar
        })
        .attr("y",function(d){
            return h - yScale(d) +14; // Position the text slightly above the bar
        });

    // Add new data to the bar chart when the "Add" button is clicked
    d3.select("#add")
        .on("click",function(){
            var maxValue = 25;
            var newNumber = Math.floor(Math.random()*maxValue); // Generate a random number and push it to the dataset
            dataset.push(newNumber);
            xScale.domain(d3.range(dataset.length)); // Update the xScale domain to reflect the new dataset length
        
            // Bind data to bars variable
            var bars = svg.selectAll("rect")
                            .data(dataset);

            bars.enter() // Add extra new bars for new data
                .append("rect")
                .attr("x",w) // Start new bars from the right of the chart
                .attr("y",function(d){
                    return h - yScale(d); // Set the y position based on the dataset value
                })
                .merge(bars) // Merge new and existing bars for the transition
                .transition()
                .duration(500) // Animate the bars over 500 milliseconds
                .attr("x",function(d,i){
                    return xScale(i); // Update the x position for all bars
                })
                .attr("y",function(d){
                    return h - yScale(d); // Update the y position for all bars
                })
                .attr("width",xScale.bandwidth()) // Set the bar width
                .attr("height",function(d){
                    return yScale(d); // Set the bar height
                });

            // Bind data to texts variable for the labels
            var texts = svg.selectAll("text")
                            .data(dataset);

            texts.enter() // Add extra text elements for new data
                .append("text")
                .attr("x",w) // Start new text elements from the right
                .attr("y",function(d){
                    return h - yScale(d); // Set the y position for the text
                })
                .merge(texts)
                .transition()
                .duration(500) // Animate the text positioning over 500 milliseconds
                .text(function(d) {
                    return d; // Update the text content
                })
                .attr("fill","black") // Set the text color
                .attr("text-anchor", "middle") // Center the text horizontally
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth()/2; // Center the text within the bar
                })
                .attr("y",function(d){
                    return h - yScale(d) + 14; // Position the text slightly above the bar
                });
        });

    // Remove the last bar when the "Remove" button is clicked
    d3.select("#remove")
        .on("click",function() {
            dataset.pop(); // Remove the last data item from the dataset
            xScale.domain(d3.range(dataset.length)); // Update the xScale domain

            var bars = svg.selectAll("rect")
                            .data(dataset);

            bars.exit() // Select bars that no longer have corresponding data
                .transition()
                .duration(500) // Animate the removal by moving the bar to the right
                .attr("x", w)
                .remove(); // Remove the bars from the DOM

            bars.transition()
                .duration(500) // Animate the remaining bars
                .attr("x",function(d,i){
                    return xScale(i); // Update the x position
                })
                .attr("y",function(d){
                    return h - yScale(d); // Update the y position
                })
                .attr("width",xScale.bandwidth()) // Set the bar width
                .attr("height",function(d){
                    return yScale(d); // Set the bar height
                });

            // Remove the text labels for the removed bars
            var texts = svg.selectAll("text")
                            .data(dataset);

            texts.exit() // Select text elements that no longer have corresponding data
                .transition()
                .duration(200) // Animate the removal by moving the text to the right
                .attr("x",w)
                .remove(); // Remove the text from the DOM

            texts.transition()
                .duration(500) // Animate the remaining text
                .text(function(d) {
                    return d; // Update the text content
                })
                .attr("fill","black") // Set the text color
                .attr("text-anchor", "middle") // Center the text
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth()/2; // Center the text within the bar
                })
                .attr("y",function(d){
                    return h - yScale(d) + 14; // Position the text slightly above the bar
                });
        });
}
// Call the init function when the window loads
window.onload = init;
