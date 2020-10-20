let select_tag = d3.select("#selDataset");

d3.json("samples.json").then((importedData) => {
  let data = importedData.names;
  console.log(data)

  data.forEach((id) => {
    select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });

  barChart(data[0]);
  // gauge(data[0]);
  bubble(data[0]);
});

function optionChanged(subjectID) {
  console.log(subjectID);

  barChart(subjectID);
  // gauge(subjectID);
  bubble(subjectID);
}

// Create bar chart 
function barChart(subjectID) {
  d3.json("samples.json").then((importedData) => {
    let samples = importedData.samples;

    let results = samples.filter(sampleObj => sampleObj.id == subjectID);
    console.log(results)

    let result = results[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let trace1 = [
      {
        y: y_label,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    
    let barLayout = {
        title: "Top 10 OTU-ID's",
        margin: { 
          l: 100,
          r: 100,
          t: 100,
          b: 30
        }
      };

    Plotly.newPlot("bar", trace1, barLayout);
  });
}

// Create Gauge


// Create bubble chart
function bubble(subjectID) {
  d3.json("samples.json").then((importedData) => {
    let samples = importedData.samples;
    console.log(samples)

    let results = samples.filter(sampleObj => sampleObj.id == subjectID);
    let result = results[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let trace2 = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    let bubbleLayout = {
      title: "OTU ID's",
      height: 600,
      width: 1000
    };

    Plotly.newPlot("bubble", trace2, bubbleLayout);
  });
}