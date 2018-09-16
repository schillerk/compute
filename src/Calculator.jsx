import React, { Component } from 'react';
import * as d3 from "d3";
// import Select from 'react-select';
import $ from 'jquery';

const height = $(window).height()/2;
const width = $(window).width()/2 - 100;
const hMargin = 50;
const wMargin = 70;

const startDate = new Date('2018-1-1')

const inputs = [
	{
		key: 'initialCost',
		label: 'Compute Cost 2018 (Millions)',
		min: 1,
		max: 100,
		step: 1,
	},
	{
		key: 'computeDouble',
		label: 'Compute Doubling Time (Months)',
		min: 1,
		max: 10,
		step: 1,
	},
	{
		key: 'fpdDouble',
		label: 'FLOPS/$ Doubling Time (Months)',
		min: 1,
		max: 100,
		step: 1,
	},
	{
		key: 'years',
		label: 'Years to Project',
		min: 1,
		max: 100,
		step: 1,
	},
];

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialCost: 35,
			computeDouble: 3.5,
			fpdDouble: 44,
			years: 5,
		}
	}

	componentDidMount() {
		d3.select('#price-chart')
			.attr('height', height)
			.attr('width', width);

		this.renderAxes();
	}

	componentDidUpdate() {
		this.renderAxes();
	}

	getCost(years) {
		const { initialCost, computeDouble, fpdDouble } = this.state;
		const months = years * 12;
		const endFPD = 2**(months / fpdDouble);
		const endCompute = 2**(months / computeDouble);
		return Math.max(endCompute / endFPD * initialCost, .1);
	}

	roundUp(val) {
	  return Math.pow(10, parseInt(val).toString().length);
	}

	getPath() {
	  const { initialCost, computeDouble, fpdDouble, years } = this.state;
		const endCost = this.getCost(years);

		const xScale = d3.scaleTime()
		  .domain([0, 1])
		  .range([wMargin, width-wMargin]);
		const yScale = d3.scaleLog()
		  .domain([.1, Math.max(this.roundUp(endCost), initialCost)])
		  .range([height-hMargin, hMargin]);

	  let path = "M" + xScale(0) + " " + yScale(initialCost) + " ";
    path += "L" + xScale(1) + " " + yScale(endCost);
    return path;
	}

	renderAxes() {
		const { initialCost, years } = this.state;
    const chartSVG = d3.select('#price-chart')
		const endCost = this.getCost(years);

		const startYear = startDate.getFullYear();
		const endDate = new Date(startYear, years * 12, 31);

		const xAxisScale = d3.scaleTime()
		  .domain([startDate, endDate])
		  .range([0, width-2*wMargin]);
		const yAxisScale = d3.scaleLog()
		  .domain([.1, Math.max(this.roundUp(endCost), initialCost)])
		  .range([height-2*hMargin, 0]);

    let xAxis = chartSVG.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(' + (wMargin) + ',' + (hMargin) + ')');

    let yAxis = chartSVG.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(' + (wMargin) + ',' + (height-hMargin) + ')');

    xAxis = d3.axisBottom()
      .scale(xAxisScale)
      .tickFormat(d3.timeFormat("%Y"))
      .ticks(5);
    yAxis = d3.axisLeft()
      .scale(yAxisScale)
      .tickFormat(d3.format("1111"))
      .ticks(3)

    chartSVG.append('text')
      .attr('x', width/2)
      .attr('y', height - hMargin + 40)
      .text('Year');

    chartSVG.append('text')
      .attr('x', wMargin - 40)
      .attr('y', height/2 + hMargin)
      .attr('transform', `rotate(-90, ${wMargin - 40}, ${height/2 + hMargin})`)
      .text('Cost of Largest Model (Millions)');

    chartSVG.select('[class=xaxis]').call(xAxis);
    chartSVG.select('[class=yaxis]').call(yAxis);
  }

  handleChange(input, e) {
  	this.setState({
  		[input]: e.target.value,
  	});
  }

  renderInputs() {
  	return inputs.map(input => {
  		return (
  			<div className="input__row" key={input.key}>
	  			<div className="input__label">
	  				{input.label}
  				</div>
  				<input
  					className="text-input"
  					type="text"
  					value={this.state[input.key]}
  					onChange={this.handleChange.bind(this, input.key)}
					/>
  				<input
  					className="range-input"
  					type="range"
  					min={input.min}
  					max={input.max}
  					step={input.step}
  					value={this.state[input.key]}
  					onChange={this.handleChange.bind(this, input.key)}
					/>
  			</div>
			);
  	});
  }

  renderEndCost() {
  	return (
			<div className="input__row">
  			<div className="input__label">
	  			Estimated cost after {this.state.years} years
  			</div>
  			<div className="text-input">
					{parseInt(this.getCost(this.state.years)).toLocaleString()}
				</div>
  		</div>
		);
  }

	render() {
		return (
			<div className="calculator">
        <svg id="price-chart">
          <path fill="none" stroke="black" strokeWidth="3" id="path" d={this.getPath()}/>
        </svg>
        <div className="inputs">
	        {this.renderInputs()}
	        {this.renderEndCost()}
        </div>
			</div>
		);
	}
}

export default Calculator;
