//  *****************************
// DELETE WHEN COMPLETE
d3.json("samples.json").then(function (data) {
  console.log("ALL of the json data can be found here:");
  console.log(data);
});
//  *****************************

//  *****************************
// DROP DOWN MENU OF PARTICIPANTS
function init() {
  // Grab a reference to the dropdown select element - this lists all subjects' participant numbers under "names"
  var selector = d3.select("#selDataset");
 
  // Use the list of subject names/numbers to populate the select options
  d3.json("samples.json").then((data) => {
    var subjectNames = data.names;

    // Create HTML id needed for creating drop down
    subjectNames.forEach((subject) => {
      selector
        .append("option")
        .text(subject)
        .property("value", subject);
    });

    // Use the first subject from the list to build the initial plots
    var firstSubject = subjectNames[0];
    buildCharts(firstSubject);
    buildMetadata(firstSubject);
  });
}
init();
//  *****************************

//  *****************************
// INITIALIZE THE DASHBOARD
function optionChanged(newSubject) {
  // Fetch new data each time a new subject is selected
  buildMetadata(newSubject);
  buildCharts(newSubject);
}
//  *****************************

//  *****************************
// DEMOGRAPHICS PANEL
function buildMetadata(subject) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired subject number
    var resultArray = metadata.filter(subjectObj => subjectObj.id == subject);
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
// DELIVERABLES - BAR, BUBBLE, & GAUGE CHARTS
// 1. Create the buildCharts function.
function buildCharts(subject) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    //  *****************************
    //  *****************************
    // CREATE CHART DATA VARIABLES
    // 3. Create a variable that holds the samples array. 
    var sampledata = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampledata.filter(subjectObj => subjectObj.id === subject);
    // 5. Create a variable that holds the first subject in the array.
    var result = resultArray[0];
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var slicedotuIds = otuIds.slice(0,10);
    var slicedotuLabels = otuLabels.slice(0,10);
    var slicedsampleValues = sampleValues.slice(0,10);
    //  *****************************
    //  *****************************
    // CREATE BAR CHART
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = slicedotuIds.map(y => "OTU " + y + " ").reverse();
    var xticks = slicedsampleValues.reverse();
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: xticks,
      y: yticks,
      text: otuLabels,
      type: "bar",
      orientation: "h",
      color: '#rgb(142,124,195)',
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: {
        text: "Top 10 Bacteria Cultures Found",
        size: 14,
      },
      xaxis: { title: ""},
      yaxis: { title: ""},
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    //  *****************************
    //  *****************************
    // CREATE BUBBLE CHART
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
    marker: {
      color: otuIds,
      size: sampleValues,
      colorscale: "portland",
    },
    type: "scatter",
  }];
  // 2. Create the layout for the bubble chart.
  var bubbleLayout = [{
    width: 800,
    height: 400,
    margin: {t:0},
    title: {
      text: "Bacteria Cultures Per Sample",
      font: { size: 14 },
    },
    showlegend: false,
    yaxis: {title: 'Sample Values'},
    xaxis: {
      title: 'OTU IDs',
      hovermode: 'closest',
    }
  }];
  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  //  *****************************
  //  *****************************
  // 3. Create a variable that holds the washing frequency.
  var washFreq = data.metadata.filter(obj => (obj.id == subject))[0].wfreq;
  // 4. Create the trace for the gauge chart.
  var gaugeData = [{
    // domain: ,
    value: washFreq,
    title: {
      text: "Belly Button Washing Frequency",
      font: { size: 14 },
    },
    type: "indicator",
    mode: "gauge+number",
    axis: {
      range: [null, 10], 
      tickwidth: 1,
      tickcolor: "blue",
    },
    bar: {
      color: "red",
    },
    steps: [{
      range: [0,4], color: "pink",},{
      range: [4,10], color: "yellow"}],
  }];

  // // 5. Create the layout for the gauge chart.
  var gaugeLayout = { 
    margin: {t:0, b:0},
  };

  // // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
//  *****************************

//  *****************************

                      // var trace1 = {
                      //   x: [1, 2, 3, 4],
                      //   y: [10, 11, 12, 13],
                      //   mode: 'markers',
                      //   marker: {
                      //     size: [40, 60, 80, 100]
                      //   }
                      // };

                      // var testData = [trace1];

                      // var layout = {
                      //   title: 'Marker Size',
                      //   showlegend: false,
                      //   height: 600,
                      //   width: 600
                      // };

                      // Plotly.newPlot('myDiv', testData, layout);


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
                      // //     var metadata = data.metadata;
                      // //     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
                      // //     var result = resultArray[0];
                      // //     var PANEL = d3.select("#sample-metadata");
                      // //     //console.log("******************************");
                      //     //console.log(sample);
                      //     PANEL.html("");
                      //     Object.entries(result).forEach(([key,value]) => {
                      //       PANEL.append("h6").text(`${key}:${value}`);
                      //     })
                      //   });
                      // }
                      // // 1. Create the buildCharts function.
                      // function buildCharts(sample) {
                      //   // 2. Use d3.json to load and retrieve the samples.json file 
                      //   d3.json("samples.json").then((data) => {
                      //     // 3. Create a variable that holds the samples array. 
                      //     var sampledata = data.samples;
                      //     // 4. Create a variable that filters the samples for the object with the desired sample number.
                      //     var resultArray = sampledata.filter(sampleObj => sampleObj.id == sample);
                      //     //  5. Create a variable that holds the first sample in the array.
                      //     var result = resultArray[0];
                      //     console.log(result);
                      //     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
                      //     var otuids = result.otu_ids;
                      //     var otulabels = result.otu_labels;
                      //     var samplevalues = result.sample_values;
                      //     console.log(otuids)
                      //     // 7. Create the yticks for the bar chart.
                      // //     // Hint: Get the the top 10 otu_ids and map them in descending order  
                      //     //  so the otu_ids with the most bacteria are last. 
                      //    // var yticks = otuids.slice(0, 10).map(otuids => `${otuids}`);
                      //    // var yvalues = (data.samples[0].otu_ids.slice(0,10));
                      //    var yvalues = otuids.slice(0,10);
                      //    // var yticks = yvalues.toString();
                      //    var yticks = yvalues.map(y => "OTU " + y);
                      //    // var xticks = (data.samples[0].sample_values.slice(0,10));
                      //    var xticks = samplevalues.slice(0,10);
                      //    xticks = xticks.reverse();
                      //    //console.log("******************************");
                      //    //console.log(otulabels)
                      //   //console.log(samplevalues, 'x axis')
                      //     // 8. Create the trace for the bar chart. 
                      //     var trace = {
                      //       x: xticks,
                      //       y: yticks,
                      //       text: otulabels,
                      //       marker: {color: 'blue'},
                      //       type: "bar",
                      //       orientation: "h"
                      //     };
                      //     // 9. Create the layout for the bar chart. 
                      //     //var barLayout = {barmode: 
                      //     var barData = [trace];
                      //     var layout = {
                      //       title: "Top 10 Bacteria Cultures Found",
                      //       xaxis: { title: "" },
                      //       yaxis: { title: ""}
                      //     };
                      //     // 10. Use Plotly to plot the data with the layout. 
                      //     Plotly.newPlot("bar", barData, layout);
                      // //  // });
                      // // // }
                      // // // 1. Create the trace for the bubble chart.
                      // // var bubbleData = [{
                      // //   y: xticks,
                      // //   x: yticks,
                      // //   text: otulabels,
                      // //   marker: {
                      // //     color: otuids.slice(0,10).reverse(),
                      // //     size: xticks,
                      // //     colorscale: "Electric"
                      // //     },
                      // //   type: "scatter",
                      // //   mode:'markers',
                      // //   text: otulabels, 
                      // // }];
                      // // // 2. Create the layout for the bubble chart.
                      // // var bubbleLayout = {
                      // //   width:800,
                      // //   height:400,
                      // //   paper_bgcolor:'rgba(0,0,0,0)',
                      // //   plot_bgcolor:'rgba(0,0,0,0)',
                      // //   margin: { t: 0 },
                      // //   hovermode: 'closest',
                      // //   title: "Interactive Dashboard",
                      // //   yaxis: {title: 'samplevalues'},
                      // //   yaxis: {range: [0, 250]},
                      // //   xaxis: {title: 'otuids'}, 
                      // // // };
                      // // // // 3. Use Plotly to plot the data with the layout.
                      // // // Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
                      // // // // 4. Create the trace for the gauge chart.
                      // // var washFreq = data.metadata.filter(obj => (obj.id == sample))[0].wfreq;
                      // //   var gaugeData = [{
                      // //     value: washFreq,
                      // //     title: {text: "Wash per Week"},
                      // //     type: "indicator",
                      // //     mode: "gauge+number",
                      // //     gauge: {
                      // //         steps: [
                      // //           {range: [0, 2], color: "red"},
                      // //           {range: [2, 4], color: "orange"},
                      // //           {range: [4, 6], color: "yellow"},
                      // //           {range: [6, 8], color: "lightgreen"},
                      // //           {range: [8, 10], color: "green"},
                      // //         ],
                      // //         axis: {range: [0, 10]},
                      // //         bar: {color: "black"}
                      // //       }
                      // //     }]
                      // //     // 5. Create the layout for the gauge chart.
                      // //     var gaugeLayout = { 
                      // //       title: "Belly Button Washing Frequency",
                      //       font:{
                      //       color: "black",
                      //       size: 16,
                      //       }
                      //     }
                      //     // 6. Use Plotly to plot the gauge data and layout.
                      //     Plotly.newPlot("gauge", gaugeData, gaugeLayout);
                      //   });
                      // }