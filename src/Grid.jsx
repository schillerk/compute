import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

import * as d3 from "d3";

const width = 100; //should be 100
const height = 35; //should be 35
const total = width * height;
const SVGwidth = 800;
const SVGheight = 320;
const unit = 7; //should be 7

let gridSVG;

// ["#1F4B99", "#6BACB8", "#FFFFFF", "#DF9563", "#9E2B0E"]
function shouldShade(index, shaded) {
  return index > total*shaded ? "#D8E1E8" : "#5C7092";
}

class Grid extends Component {
  componentDidMount() {
    gridSVG = d3.select('#gridSVG')
            .append('svg:svg')
            .attr('width', SVGwidth)
            .attr('height', SVGheight);

    let index = 0;
    for(let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        gridSVG.append('svg:rect')
          .attr('index', index++)
          .attr('type', 'unit')
          .attr('x', (unit+1)*x)
          .attr('y', (unit+1)*y)
          .attr('width', unit)
          .attr('height', unit)
          .attr('fill', shouldShade(index, this.props.shaded));
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const rects = gridSVG.selectAll('rect');
    const reverse = prevProps.shaded < this.props.shaded;
    rects._groups[0].forEach(rect => {
      const curRect = d3.select(rect);
      const index = curRect.attr('index');
      let buffer = reverse ? index - (total * prevProps.shaded) : total - index;
      curRect
        .transition()
        .duration(2500 * Math.random() * buffer / total)
        .attr('fill', () => shouldShade(index, this.props.shaded));
    });
  }

  render() {
    return (
      <div id="gridSVG" ref="gridSVG" />
    );
  }
}

export default Grid;

Grid.propTypes = {
  shaded: PropTypes.number.isRequired,
};