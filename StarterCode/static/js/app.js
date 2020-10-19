
d3.json("../data/samples.json").then((importedData) => {
    let data = importedData});

    let trace1 = {
        x: data.map(row => sample.otu_ids),
        y: data.map(row => sample.sample_values),
        text: data.map(row => sample.greekName),
        name: "Test",
        type: "bar",
        orientation: "h"
      };
    
      // data
      let chartData = [trace1];
    
      // Apply the group bar mode to the layout
      let layout = {
        title: "Test",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
    
      
      Plotly.newPlot("plot", chartData, layout);
