let select_tag = d3.select("#selDataset");

d3.json("../data/samples.json").then((importedData) => {
  let data = importedData.names;
  console.log(data)

  data.forEach((id) => {
    select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });

  bar(data[0]);
  gauge(data[0]);
  bubble(data[0]);
});


