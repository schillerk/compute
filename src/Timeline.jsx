import React, { Component } from 'react';
import Textbox from './Textbox';

import * as d3 from "d3";
import $ from 'jquery';

const rates = [0.0058, 0.0021, 0.0062, 0.093, 0.015, 0.25, 0.117, 79, 5, 31, 9, 1850];
const events = [['2012-6-1', 'AlexNet'], ['2012-7-3', 'Dropout'], ['2013-11-12', 'Visualizing and Understanding Conv Nets'], ['2014-9-10', 'Seq2Seq'], ['2014-9-17', 'GoogLeNet'], ['2015-12-8', 'DeepSpeech2'], ['2015-12-10', 'ResNets'], ['2016-9-26', 'Neural Machine Translation'], ['2016-10-7', 'Xception'], ['2016-11-5', 'Neural Architecture Search'], ['2017-8-11', 'T17 Dota 1v1'], ['2017-10-18', 'AlphaGo Zero']];

const height = $(window).height();
const width = $(window).width();
const hMargin = 100;
const wMargin = 200;

const xScale = d3.scaleTime()
  .domain([new Date('2012-1-1'), new Date('2017-12-31')])
  .range([wMargin, width-wMargin]);

const xAxisScale = d3.scaleTime()
  .domain([new Date('2012-1-1'), new Date('2017-12-31')])
  .range([0, width-2*wMargin]);

const yScale = d3.scaleLog()
  .domain([.001, 10000])
  .range([height-hMargin, hMargin]);

const yAxisScale = d3.scaleLog()
  .domain([.001, 10000])
  .range([height-2*hMargin, 0]);

const timelineHeight = 3000;

function idxToPercent(idx) {
  return idx/rates.length;
}

function getScrollPercent() {
  const s = $(window).scrollTop();

  const c = $('#timeline-container').position().top;

  const d = timelineHeight - $(window).height() + c;

  return (s-c)/(d-c);
}

class Timeline extends Component {
  componentDidMount() {
    const labels = events.map((e, idx) => d3.select(`#label${idx}`));
    const circles = events.map((e, idx) => d3.select(`#circle${idx}`));
    const chart = d3.select('#chart');

    chart
      .attr('width', `${width}px`)
      .attr('height', `${height}px`)

    chart.append('text')
      .attr('x', width/2 - wMargin)
      .attr('y',  hMargin - 40)
      .attr('font-weight', 'bold')
      .text('AlexNet to AlphaGo Zero: a 300,00x Increase in Compute');

    window.addEventListener("scroll", function(e) {
      const scrollPercent = getScrollPercent();

      labels.forEach((label, idx) => {
        let position = idxToPercent(idx);

        label
          .transition()
          .duration(100)
          .style('opacity', `${scrollPercent > position ? 1 : 0}`);
      });
      circles.forEach((circle, idx) => {
        let position = idxToPercent(idx);
        circle
          .transition()
          .duration(100)
          .attr('r', `${scrollPercent > position ? 7 : 0}`)
          .attr('stroke-width', `${scrollPercent > position ? 3 : 0}`)
          .style('opacity', `${scrollPercent > position ? 1 : 0}`);
      });

      if (scrollPercent > 1) {
        $('#chart-container').css({
          position: 'absolute',
          bottom: '0',
          top: 'auto',
        });
      } else if (scrollPercent < 0) {
        $('#chart-container').css({
          position: 'absolute',
          top: '0'
        });
      } else {
        $('#chart-container').css({
          position: 'fixed',
          bottom: '0',
        });
      }
    });

    this.renderAxes();
  }

  renderAxes() {
    const chartSVG = d3.select('#chart')

    let xAxis = chartSVG.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(' + (wMargin) + ',' + (hMargin) + ')');
    let yAxis = chartSVG.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(' + (wMargin) + ',' + (height-hMargin) + ')');

    xAxis = d3.axisBottom()
      .scale(xAxisScale)
      .tickFormat(d3.timeFormat("%Y"));
    yAxis = d3.axisLeft()
      .scale(yAxisScale)
      .tickFormat(d3.format("111111"))
      .ticks(6)

    chartSVG.append('text')
      .attr('x', width/2)
      .attr('y', height - hMargin + 40)
      .text('Year');
    chartSVG.append('text')
      .attr('x', wMargin - 40)
      .attr('y', height/2 + hMargin)
      .attr('transform', `rotate(-90, ${wMargin - 40}, ${height/2 + hMargin})`)
      .text('Petaflop/s-day (Training)');

    chartSVG.select('[class=xaxis]').call(xAxis);
    chartSVG.select('[class=yaxis]').call(yAxis);
  }

  renderLabels() {
    return events.map((e, idx) => {
      return (
        <text
          key={e[1]}
          x={xScale(new Date(e[0])) + 12}
          y={yScale(rates[idx]) + 4}
          fontSize={11}
          id={`label${idx}`}
        >
        {e[1]}
      </text>
      );
    });
  }

  renderCircles() {
    return events.map((e, idx) => {
      return (
        <circle
          key={e[1]}
          cx={xScale(new Date(e[0]))}
          cy={yScale(rates[idx])}
          r="0"
          stroke="black"
          strokeWidth="1"
          fill="white"
          className="label"
          id={`circle${idx}`}
        >
          {e[1]}
        </circle>
      );
    });
  }

  renderTextBoxes() {
    const data = [
      {
        top: 1000,
        title: 'here is a title',
        text: 'here is a sample text',
      },
    ]

    return data.map((el) => {
      return ( <Textbox key={el.top} data={el} /> );
    })
  }

  render() {
    return (
      <div id="timeline-container">
        <div id="chart-container">
          <svg id="chart">
            {this.renderCircles()}
            {this.renderLabels()}
          </svg>
        </div>
      </div>
    );
  }
}

export default Timeline;