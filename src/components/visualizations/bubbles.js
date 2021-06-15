import React, { Component } from 'react';
import * as d3 from 'd3';
import { duration } from '@material-ui/core';

class Bubbles extends React.Component {
    // on page load
    componentDidMount(){
        // svg height and width components 
        var width = d3.select(".bubbles").node().getBoundingClientRect().width;
        var height = d3.select(".bubbles").node().getBoundingClientRect().height;

        // selecting svg
        var svg = d3.select(".bubbles");
       
        // variables
        var xCircleOffset = 100;
        var flip = 0.4;
        var color ="rgb(148,0,211)";
        
        // swiggle constants
        const curve = d3.line().curve(d3.curveBasis);
        const swiggle = [[0, 0], [10, 10], [20, 0], [30, 10], [40, 0], [50, 10], [60, 0], [70, 10], [80, 0], [90, 10], [100, 0], [110, 10], [120, 0], [130, 10], [140, 0], [150, 10], [160, 0], [170, 10], [180, 0], [190, 10], [200, 0], [210, 10], [220, 0], [230, 10], [240, 0], [250, 10], [260, 0], [270, 10], [280, 0], [290, 10], [300, 0],[310, 10], [320, 0],[330, 10], [340, 0],[350, 10], [360, 0],[370, 10], [380, 0], [390, 10], [400, 0], [410, 10], [420, 0], [430, 10] [440, 0], [450, 10], [460, 0], [470, 10], [480, 0], [490, 10], [550, 0]];
        const line = d3.select(".curve");
        
        // creating swiggle path
        line.append("path")
        .attr("stroke", "#1ecbe1")
        .style("fill", "none")
        .style("stroke-width", 5)  
        .attr("d", curve(swiggle));
 

        // creating 15 bubbles pre 3 columns
        // alternating color and opacity
        for(var j = 0; j < 15; j++){
            if(j % 2 == 0){
                color = "rgb(148,0,211)";
                flip = 0.4;
            } else{
                color = "#1ecbe1";
                flip = 0.4;
            }
            // creating transitioning circle with flip, offset, and color
            svg.selectAll("div")
            .data([1,2,3,4])
            .enter()
            .append("circle")
            .attr("cx", function(d, i) {
                return i * xCircleOffset;
            })
            .attr("cy", j * 50)
            .transition()
            .duration(5000)
            .attr("r", 50)
            .attr("stroke", "black")
            .attr("fill", color)
            .attr("opacity", function(d, i) {
                return i * flip;
            });
        }
        
    }


    render(){
        return (
            // BUBBLES SVG
            <svg className="bubbles" height="100%" width="100%"></svg>      
        );
    }
    
}
export default Bubbles;
