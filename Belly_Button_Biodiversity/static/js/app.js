
function buildMetadata(sample) {

// // @TODO: Use `d3.json` to fetch the sample data for the plo 
var sampleData =d3.json(`/metadata/${sample}`).then((sample)=>{

// // select a panel with id#sample-metadata;
var dataPanel= d3.select("#sample-metadata")
dataPanel.html("");
// console.log('dataPanel'= dataPanel);
  


// // use `.html(""); object.entry and add key and value
Object.entries(sample).forEach(([key, value])=>{
  var row=dataPanel.append('p');
  row.text(`${key}: ${value}`)
  })
 });
}
function buildCharts(sample) {
  console.log("Charts")


  var defaultURL = "/samples/" + sample;
  d3.json(defaultURL).then(function(data) {
    
    var values = data.sample_values.slice(0, 10);
    var labels = data.otu_ids.slice(0, 10);
    var hoverinfo = data.otu_labels.slice(0, 10);
    var pieData = {
      "values": values,
      "labels": labels,
      "hoverinfo": hoverinfo,
      "type": "pie"    
   }
var pieLayout = { title: "Top 10"};
Plotly.newPlot("pie", [pieData], pieLayout);

// bubblechart
var xAxis = data.otu_ids;
     var yAxis = data.sample_values;
     var size = data.sample_values;
     
     var bubbleData = {
        "x": xAxis,
        "y": yAxis,
        "text": data.otu_labels,
        "mode": "markers",
        "marker": {
          color: data.otu_ids,
          size: size,
          symbol: 'circle'
        },          
        "type": "scatter"   
      };

      var bubbleLayout = {title: "Belly B"}
      Plotly.newPlot("bubble", [bubbleData], bubbleLayout);
    });

}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(selector);
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
  
  });
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
// initialize dashboard
init();

