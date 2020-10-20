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
  // bubble(data[0]);
});

function optionChanged(data) {
  console.log(data);

  barChart(data);
  // gauge(data);
  // bubble(data);
}

// Create bar chart 
function barChart(data) {
  d3.json("samples.json").then((importedData) => {
    let samples = data.samples;

    let results = samples.filter(sampleObj => sampleObj.id == data);
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

    let barData = [trace1];

    let layout = {
        title: "Top 10 OTU-ID's",
        margin: { 
          l: 100,
          r: 100,
          t: 100,
          b: 30
        }
      };

    Plotly.newPlot("bar", barData, layout);
  });
};
