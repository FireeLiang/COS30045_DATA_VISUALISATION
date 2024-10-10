            // Set up SVG dimensions and dataset
            var w = 500;
            var h = 150;
            var barPadding = 3;
            var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];

            var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .range([0, w])
                .paddingInner(0.05);

            var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([h, 0]);

            // Create SVG container
            var svg1 = d3.select("article.content")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            // Add an axis using d3.axisBottom() for the x-axis
            var xAxis = d3.axisBottom(xScale);

            svg1.append("g")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            // Draw bars for each data point
            svg1.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - yScale(d);
                })
                .attr("fill", "rgb(106, 90, 205)"); // Set fill color for bars

            // Add text labels on bars
            svg1.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("fill", "black")
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("text-anchor", "middle")
                .attr("y", function(d) {
                    return h - (d * 4) - 5;
                });

            // Update button functionality
            d3.select("#updateButton").on("click", function() {
                // Generate new random dataset
                var newDataset = [];
                for (var i = 0; i < dataset.length; i++) {
                    newDataset.push(Math.floor(Math.random() * 25));
                }

                // Update the text labels
                var labels = svg1.selectAll("text")
                    .data(newDataset);

                labels.enter()
                    .append("text")
                    .merge(labels)
                    .transition()
                    .duration(500)
                    .text(function(d) {
                        return d;
                    })
                    .attr("x", function(d, i) {
                        return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                        return h - (d * 4) - 5;
                    });

                labels.exit().remove();

                // Update the bars
                var bars = svg1.selectAll("rect")
                    .data(newDataset);

                bars.enter()
                    .append("rect")
                    .merge(bars)
                    .transition()
                    .duration(500)
                    .attr("y", function(d) {
                        return yScale(d);
                    })
                    .attr("height", function(d) {
                        return h - yScale(d);
                    });

                bars.exit().remove();


            });