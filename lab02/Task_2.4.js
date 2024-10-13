window.onload = init;

function init() {
    drawChart1();
    drawChart2();
}

function drawChart1(){
    d3.csv("Task_2.4_data_1.csv").then(function(data) {
        console.log("Data for Chart 1:", data);
        petOwnership = data;
        barChart1(petOwnership);
    });

    var w = 600;
    var h = 250;
    var barPadding = 3;

    var svg1 = d3.select("article.content").select("#chart1")
                .append("svg")
                .attr("width", w)
                .attr("height", h + 50); // Add extra height for labels

    function barChart1(petOwnership) {
        // Create the bars
        svg1.selectAll("rect")
            .data(petOwnership)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length);
            })
            .attr("y", function(d) {
                return h - (d.pets * 4);
            })
            .attr("width", w / petOwnership.length - barPadding)
            .attr("height", function(d) {
                return d.pets * 4;
            })
            .attr("fill", function(d) {
                return "rgb(135,206," + (d.pets * 8) + ")";
            });

        // Add values on top of the bars
        svg1.selectAll("text.value")
            .data(petOwnership)
            .enter()
            .append("text")
            .attr("class", "value")
            .text(function(d) {
                return d.pets;
            })
            .attr("fill", "black")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length) + (w / petOwnership.length - barPadding) / 2;
            })
            .attr("y", function(d) {
                return h - (d.pets * 4) + 15;  // Position slightly above the bar
            })
            .attr("text-anchor", "middle");

        // Add animal labels below the bars
        svg1.selectAll("text.animal")
            .data(petOwnership)
            .enter()
            .append("text")
            .attr("class", "animal")
            .text(function(d) {
                return d.animal;
            })
            .attr("fill", "green")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length) + (w / petOwnership.length - barPadding) / 2;
            })
            .attr("y", h + 20)
            .attr("text-anchor", "middle");
    }
}

function drawChart2(){
    d3.csv("Task_2.4_data_2.csv").then(function(data) {
        console.log("Data for Chart 2:", data);
        petOwnership = data;
        barChart2(petOwnership);
    });

    var w = 600;
    var h = 250;
    var barPadding = 3;

    var svg2 = d3.select("article.content").select("#chart2")
                .append("svg")
                .attr("width", w)
                .attr("height", h + 50);

    function barChart2(petOwnership) {
        // Create the bars
        svg2.selectAll("rect")
            .data(petOwnership)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length);
            })
            .attr("y", function(d) {
                return h - (d.pets * 4);
            })
            .attr("width", w / petOwnership.length - barPadding)
            .attr("height", function(d) {
                return d.pets * 4;
            })
            .attr("fill", function(d) {
                return "rgb(135,206," + (d.pets * 8) + ")";
            });

        // Add values on top of the bars
        svg2.selectAll("text.value")
            .data(petOwnership)
            .enter()
            .append("text")
            .attr("class", "value")
            .text(function(d) {
                return d.pets;
            })
            .attr("fill", "black")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length) + (w / petOwnership.length - barPadding) / 2;
            })
            .attr("y", function(d) {
                return h - (d.pets * 4) + 15;  // Adjusted for consistency
            })
            .attr("text-anchor", "middle");

        // Add animal labels below the bars
        svg2.selectAll("text.animal")
            .data(petOwnership)
            .enter()
            .append("text")
            .attr("class", "animal")
            .text(function(d) {
                return d.animal;
            })
            .attr("fill", "green")
            .attr("x", function(d, i) {
                return i * (w / petOwnership.length) + (w / petOwnership.length - barPadding) / 2;
            })
            .attr("y", h + 20)
            .attr("text-anchor", "middle");
    }
}
