function init(){
    var w = 500;
    var h = 130;

    var dataset = [14,5,26,23,9,10,28,3,7,13];

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);

    var svg = d3.select("#rec")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "rgb(255,192,203)");

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        // mouse goes over a rect it turns orange
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "orange");

            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2.90;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            // append the text into position
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d)
                .attr("fill", "black");
        })
        .on("mouseout", function() {
            // remove tool tip
            d3.select("#tooltip").remove();
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", "rgb(255,192,203)");
        });

    // Add
    d3.select("#add")
        .on("click", function() {
            var maxValue = 25;

            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                .data(dataset);

            bars.enter()
                .append("rect")
                .attr("x", w) // Start from the right and transition in
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .merge(bars)
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("fill", "orange");

                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 3;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .text(d)
                        .attr("fill", "black");
                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove();
                    d3.select(this)
                        .transition()
                        .duration(250)
                        .attr("fill", "rgb(255,192,203)");
                })
                .transition()
                .duration(250)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                });
        });

    // Remove
    d3.select("#remove")
        .on("click", function() {
            dataset.pop();
            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                .data(dataset);

            bars.exit()
                .transition()
                .duration(250)
                .attr("x", w)
                .remove();

            bars.transition()
                .duration(250)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                });
        });

    var sortOrder = false;

    var sortBars = function() {
        sortOrder = !sortOrder;
        svg.selectAll("rect")
            .sort(function(a, b) {
                return sortOrder ? d3.ascending(a, b) : d3.descending(a, b);
            })
            .transition()
            .duration(1000)
            .attr("x", function(d, i) {
                return xScale(i);
            });
    };

    d3.select("#sort").on("click", sortBars);
}

window.onload = init;
