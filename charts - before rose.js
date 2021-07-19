d3.json("samples.json").then(function (data) {
  console.log("All the json data can be found here:");
  console.log(data);
});


//  *****************************
// DROP DOWN MENU OF PARTICIPANTS
function init() {
  // Grab a reference to the dropdown select element - this lists all participant numbers under "names"
  var selector = d3.select("#selDataset");
 
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    // create html id needed for creating drop down
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    // buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}
//  *****************************




//  *****************************
// INITIALIZE THE DASHBOARD
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}
//  *****************************



//  *****************************
// DEMOGRAPHICS PANEL
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
//  *****************************





//  *****************************
// ROSE CODE SAMPLE
                // function init() {
                //   var selector = d3.select("#selDataset");
                //   d3.json("samples.json").then((data) => {
                //     console.log(data);
                //     var sampleNames = data.names;
                //     sampleNames.forEach((sample) => {
                //       selector
                //         .append("option")
                //         .text(sample)
                //         .property("value", sample);
                //     });
                //     optionChanged(sampleNames[0])
                // })}
                // init();
                // function optionChanged(newSample) {
                //   buildMetadata(newSample);
                //   buildCharts(newSample);
                // }
                // function buildMetadata(sample) {
                //   d3.json("samples.json").then((data) => {
                //     var metadata = data.metadata;
                //     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
                //     var result = resultArray[0];
//  *****************************



//  *****************************
// BAR CHART
// 1. Create the buildCharts function.
// function buildCharts(sample) {

// 2. Use d3.json to load and retrieve the samples.json file 
d3.json("samples.json").then(function(data){
  var testSubjectNames = data.names;
});






                // 12.3.2 descending order stored data
                // d3.json("samples.json").then(function(data){
                //   wfreq = data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
                //   console.log(wfreq);
                // });

//



// 3. Create a variable that holds the samples array.  


          // d3.json("samples.json").then(function(data){
          //   firstPerson = data.metadata[0];
          //   Object.entries(firstPerson).forEach(([key, value]) =>
          //     {console.log(key + ': ' + value);});
          // });
                  // researcher1.forEach(([first, second]) => console.log(first + ": " + second));
                  // sampleNames.forEach((sample) => {
                  //   selector
                  //     .append("option")
                  //     .text(sample)
                  //     .property("value", sample);
                  // });
                  // // optionChanged(sampleNames[0]);  
                  // console.log("CHECK THIS OUT");
                  // console.log(sampleNames);

//     // 4. Create a variable that filters the samples for the object with the desired sample number.
                // 12.3.2 descending order stored data
                // d3.json("samples.json").then(function(data){
                //   wfreq = data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
                //   console.log(wfreq);
                // });

//     //  5. Create a variable that holds the first sample in the array.


//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
d3.json("samples.json").then(function(data){
  otu_ids = data.samples[1].otu_ids

let otu_ids = [0];
let otu_labels = [0];
let sample_values = [0];
console.log("CHECK THIS OUT");
console.log(otu_ids);
console.log(otu_labels);
console.log(sample_values);

// set OTU_IDS from data

  otu_ids = data.samples[1].otu_ids;
  Object.entries(otu_ids).forEach(([key, value]) =>
    {console.log(value);});
});

//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = 

//     // 8. Create the trace for the bar chart. 
//     var barData = [

                      //   var trace = {
                      //     x: topFiveCityNames,
                      //     y: topFiveCityGrowths,
                      //     type: "bar"
                      // };

                      // var data = [trace];
                      // var layout = {
                      //     title: "Most rapidly Growing Cities", 
                      //     xaxis: { title: "City" },
                      //     yaxis: { title: "Population Growth, 2016-2017"}
                      // };
                      // Plotly.newPlot("bar-plot", data, layout);
      
//     ];
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
     
//     };
//     // 10. Use Plotly to plot the data with the layout. 

var trace = {
  x: ["burrito", "pizza", "chicken"],
  y: [10,18,5],
  type: "bar"
}
Plotly.newPlot("bar", [trace]);
// maybe use .restyle() for updates with other samples
    
//   });
// )}:
//  *****************************




// HOW TO MAKE A BAR CHART
// // Sort the data array using the greekSearchResults value
// data.sort(function(a, b) {
//   return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
// });

// // Slice the first 10 objects for plotting
// data = data.slice(0, 10);

// // Reverse the array due to Plotly's defaults
// data = data.reverse();

// // Trace1 for the Greek Data
// var trace1 = {
//   x: data.map(row => row.greekSearchResults),
//   y: data.map(row => row.greekName),
//   text: data.map(row => row.greekName),
//   name: "Greek",
//   type: "bar",
//   orientation: "h"
// };

// // data
// var data = [trace1];

// // Apply the group bar mode to the layout
// var layout = {
//   title: "Greek gods search results",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// // Plotly.newPlot("plot", data, layout)


                // 12.3.2 descending order stored data
                // d3.json("samples.json").then(function(data){
                //   wfreq = data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
                //   console.log(wfreq);
                // });

//
//
//

                // 12.4.2  - changing datasets based on a dropdown
                // first initialize a plot
                // function init() {
                  // data = [{
                  //   x: [1, 2, 3, 4, 5],
                  //   y: [1, 2, 4, 8, 16] }];
                  //   Plotly.newPlot("plot", data);
                  // };
                // call init()
                // init();

                // create update on change, specifically through d3.selectAll when change to 
                // HTML DOM element id of dropdownMenu takes place, the updatePlotly() function is triggered.
                // d3.selectAll("#dropdownMenu").on("change", updatePlotly);

                // function updatePlotly() {
                //   var dropdownMenu = d3.select("#dropdownMenu");
                //   var dataset = dropdownMenu.property("value");

                //   var xData = [1, 2, 3, 4, 5];
                //   var yData = [];

                //   if (dataset === 'dataset1') {
                //     yData = [1, 2, 4, 8, 16];
                //   };

                //   if (dataset === 'dataset2') {
                //     yData = [1, 10, 100, 1000, 10000];
                //   };

                //   var trace = {
                //     x: [xData],
                //     y: [yData],
                //   };

                //   Plotly.restyle("plot", trace);
                // };

//
//
//

                // 12.4.2  - create a bar chart with an array
                // var trace = {
                //   x: topFiveCityNames,
                //   y: topFiveCityGrowths,
                //   type: "bar"
                // };
                // var data = [trace];
                // var layout = {
                //   title: "Most Rapidly Growing Cities",
                //   xaxis: { title: "City" },
                //   yaxis: { title: "Population Growth, 2016-2017"}
                // };
                // Plotly.newPlot("bar-plot", data, layout);
                
