import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart extends Component {
 
  componentDidMount() {
    this.drawChart();
  }
  
  drawChart() {
  
    const data = this.props.data;
      
    const svg = d3.select("body").append("svg").attr("width", this.props.width).attr("height", this.props.height).style("margin-left", 100);

    const h = this.props.height;
    const w = this.props.width;

    svg.selectAll("rect").data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 65)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "darkcyan")

    svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 70)
    .attr("y", (d, i) => h - (10 * d) - 3)
  }

  render() {
    return (
      <div className="App" id={"#" + this.props.id} data={this.props.data} width={this.props.width} height={this.props.height}>
        <h1> Bar Chart </h1>    
      </div>
    )
  };
};

export default BarChart;