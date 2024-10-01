import * as d3 from "d3";

function lineChart() {
  const margin = { top: 0, right: 33, bottom: 18, left: 25 };
  const width = 670;
  const height = 300;

  d3.select("#chart-container").select("svg").remove();

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("class", "svg-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "transparent")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const dataset = [
    { date: new Date("2022-01-01"), value: 200 },
    { date: new Date("2022-02-01"), value: 250 },
    { date: new Date("2022-03-01"), value: 680 },
    { date: new Date("2022-04-01"), value: 300 },
    { date: new Date("2022-05-01"), value: 280 },
    { date: new Date("2022-06-01"), value: 220 },
    { date: new Date("2022-07-01"), value: 300 },
    { date: new Date("2022-08-01"), value: 450 },
    { date: new Date("2022-09-01"), value: 280 },
    { date: new Date("2022-10-01"), value: 600 },
    { date: new Date("2022-11-01"), value: 780 },
    { date: new Date("2022-12-01"), value: 320 },
  ];

  x.domain(d3.extent(dataset, (d) => d.date));
  y.domain([0, d3.max(dataset, (d) => d.value)]);

  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b")),
    );

  const yAxis = svg.append("g").call(d3.axisLeft(y));

  xAxis.select(".domain").remove();
  yAxis.select(".domain").remove();

  xAxis.selectAll(".tick line").style("opacity", 0);
  yAxis.selectAll(".tick line").style("opacity", 0);

  xAxis.selectAll("text").style("opacity", 0.7);
  yAxis.selectAll("text").style("opacity", 0.7);

  yAxis.selectAll(".tick").each(function () {
    const tickValue = d3.select(this).select("text").text();
    const yPosition = y(tickValue);
    svg
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", yPosition)
      .attr("y2", yPosition)
      .attr("stroke", "rgba(255, 255, 255, 0.3)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5");
  });

  // Create the line generator
  const line = d3
    .line()
    .x((d) => x(d.date))
    .curve(d3.curveBasis)
    .y((d) => y(d.value));

  // Add the line path to the SVG element
  svg
    .append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "rgba(198, 228, 230, 1)")
    .attr("stroke-width", 2)
    .attr("d", line);
}

export { lineChart };
