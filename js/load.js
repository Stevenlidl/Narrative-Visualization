//  * @param {*} type "male", "female", "total" (male+female)
function loadChart(type){
        console.log(type);
      // Set the dimensions of the canvas / graph
      var margin = {top: 100, right: 20, bottom: 30, left: 80},
          width = 1080 - margin.left - margin.right,
          height = 550 - margin.top - margin.bottom;
      // Set the ranges
      var xScale =  d3.scaleBand().domain([2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]).range([0, width]),
      yScale = d3.scaleLinear().domain([0, 60]).range([height, 0]);

        // Add the svg canvas
        var svg = d3.select("#sce-canvas-" + type).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(function(d){
                    return d + "";
                }));
        
        svg.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Year");

        // Add Y axis
        svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
                    return d + "%";
                }));

        svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percentage");

        var file = "";
        if(type === "total"){
            file = "./data/cleanedData.csv";
        } else if(type === "female"){
            file = "./data/cleanedData_female.csv";
        } else if(type === "male"){
            file = "./data/cleanedData_male.csv";
        }

        console.log(file);
      // Get the data
    //   d3.csv("https://github.com/Stevenlidl/Narrative-Visualization/blob/main/data/cleanedData.csv",  
      d3.csv(file).then(function(data) {

        data.forEach(function(d) {
	    d.Percentage = +d.Percentage;
	  });

    var helper = {};
    var sumstat = data.reduce(function(r, o) {
    var key = o.Income + '-' + o.Year;

    if(!helper[key]) {
    helper[key] = Object.assign({}, o); // create a copy of o
    helper[key].count = 0;
    r.push(helper[key]);
    } else {
    helper[key].Percentage += o.Percentage;
    }
    helper[key].count += 1;

    return r;
    }, []);

    sumstat.forEach(function(d){
        d.Percentage /= d.count;
    })
    sumstat.sort((a, b) => a.Income.localeCompare(b.Income) ||a.Year - b.Year );

    var dataset = d3.nest() 
    .key(d => d.Income)
    .entries(sumstat);
    console.log(dataset);

    var incomeGroup = dataset.map(d => d.key) 
    console.log(incomeGroup);

    var color = d3.scaleOrdinal().domain(incomeGroup).range(colorbrewer.Set2[6]);

    svg.selectAll(".line")
        .append("g")
        .attr("class", "line")
        .data(dataset)
        .enter()
        .append("path")

        .attr("d", function (d) {
            return d3.line()
                .x(d => xScale(d.Year))
                .y(d => yScale(d.Percentage))
                .curve(d3.curveCardinal)
                (d.values)
        })
        .attr("fill", "none")
        .attr("stroke", d => color(d.key))
        .attr("stroke-width", 2);

    //append circle 
    svg.selectAll("circle")
        .append("g")
        .data(sumstat)
        .enter()
        .append("circle")
        .attr("r", 6)
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Percentage))
        .style("fill", d => color(d.Income))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

        //append legends
    var legend = svg
        .selectAll('g.legend')
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "legend");

    legend.append("circle")
        .attr("cx", width-140)
        .attr('cy', (d, i) => i * 20 - 50)
        .attr("r", 6)
        .style("fill", d => color(d.key))

    legend.append("text")
        .attr("x", width-120)
        .attr("y", (d, i) => i * 20 - 45)
        .text(d => d.key)

    // //append title
    // svg.append("text")
    //     .attr("x", 485)
    //     .attr("y", -10)
    //     .attr("text-anchor", "middle")
    //     .text(" 2001-2020")
    //     .style("fill", "black")
    //     .style("font-size", 28)
    //     .style("font-family", "Arial Black")

    //append source
    svg.append("text")
        .attr("x", 50)
        .attr("y", 450)
        .text("Source: The World Bank")
        .style("fill", "black")
        .style("font-size", 12)
        .style("font-family", "Arial Black")
    }).catch(console.log.bind(console));;
  
  // create a tooltip
  var Tooltip = d3.select("#sce-canvas-" + type)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("Year: " + d.Year + "<br>Average Percentage: " + d.Percentage.toFixed(2) + "%<br>Income Group: " + d.Income + "<br> Gender: " + type)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

}

function initial(){
    var isTotalChartLoaded = false, isMaleChartLoaded = false, isFemaleChartLoaded = false;

    document.getElementById("to_scene1").addEventListener("click", function() {
        switchVisibility('scene0');
        switchVisibility('scene1');    
        console.log(isTotalChartLoaded);
        if(!isTotalChartLoaded){
            loadChart("total");
            isTotalChartLoaded = !isTotalChartLoaded;
        } else{
            switchVisibility('sce-canvas-total');    
        }
    });
    
    document.getElementById("to_scene2").addEventListener("click", function() {
        switchVisibility('scene1');
        switchVisibility('scene2');    
        switchVisibility('sce-canvas-total');    
        if(!isMaleChartLoaded){
            loadChart("male");
            isMaleChartLoaded = !isMaleChartLoaded;
        } else{
            switchVisibility('sce-canvas-male');    
        }
    });
    
    document.getElementById("to_scene3").addEventListener("click", function() {
        switchVisibility('scene2');
        switchVisibility('scene3');   
        switchVisibility('sce-canvas-male');    
        if(!isFemaleChartLoaded){
            loadChart("female");
            isFemaleChartLoaded = !isFemaleChartLoaded;
        } else{
            switchVisibility('sce-canvas-female');    
        }
    });
    
    document.getElementById("start_over").addEventListener("click", function() {
        switchVisibility('scene3');
        switchVisibility('scene0');    
        switchVisibility('sce-canvas-female');    
    });
}

function switchVisibility(scene){
    console.log(scene);
    var x = document.getElementById(scene);
    console.log(x.style.display);
    if (x.style.display === "none") {
        x.style.display = "";
      } else {
        x.style.display = "none";
      }
}
