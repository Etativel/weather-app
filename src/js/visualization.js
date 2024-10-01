import * as d3 from "d3";

function lineChart(data) {
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

  const dataset = data.map((d) => ({ ...d, x: new Date(`1970-01-01T${d.x}`) }));

  x.domain(d3.extent(dataset, (d) => d.x));
  y.domain([d3.min(dataset, (d) => d.y) - 2, d3.max(dataset, (d) => d.y) + 2]);

  const customTickFormat = (d) => {
    const hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(customTickFormat));
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

  const line = d3
    .line()
    .x((d) => x(d.x))
    .curve(d3.curveBasis)
    .y((d) => y(d.y));

  const path = svg
    .append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "rgba(198, 228, 230, 1)")
    .attr("stroke-width", 2)
    .attr("d", line);

  const totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(900)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
}

export { lineChart };
