import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import wineDataSet from '../../dataset/wineDataSet.csv';
import Typography from "@material-ui/core/Typography";
import '../../styles/wine.css';
import BottomNav from "../bottomNav"
import { ColorPicker} from '../../functions/functions';
import DataContext from '../../DataContext';

class Wine extends React.Component {
 
    constructor(props){
        super(props);
    }

    // on page load
    componentDidMount(){
        // setting active link
        d3.select("#link-name-wine").style("color", "white");
        
        // grabbing wine id from location pathname
        var id = window.location.pathname.substring(6);
        
        // svg height and width components 
        var width = d3.select(".wine-information").node().getBoundingClientRect().width;
        var height = d3.select(".wine-information").node().getBoundingClientRect().height;

        // selecting svg
        var svg = d3.select(".wine-information").attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height);
        svg.selectAll("*").remove();

        // reading in wine data
        var wineSet = d3.csv(wineDataSet);
        
        // wine glass points, basic white line, and curve components
        const curve = d3.line().curve(d3.curveBasis);
        const wineGlass = [[15 , 15], [5, 40], [25, 45], [25, 80], [10, 80], [40, 80], [25, 80], [25, 45], [45, 40], [35, 15], [35, 15], [35, 15], [15, 15]]; 
        const info = [[0, 10], [8, 10]];
        
        // outputting winedata
        wineSet.then(function(data) {
            // grabbing current record informaiton
            var currentRecord = d3.selectAll("div").data(data).enter().filter(function(d) { 
                if(d.id == id) {
                    return d.title;
                };
            });
            // setting headers
            var headers = ["Title:", "Country:", "Price:", "Variety:", "Taster:", "Description:" ];

            // // setting titles with headers variable
            // var titles = svg.selectAll("p").data(headers).enter().append("text")
            //     .attr("fill", ColorPicker(currentRecord._groups[0][0].__data__.country))
            //     .attr("width", "100%")
            //     .style("font-size", "2vw")
            //     .style("font-weight", "bold")
            //     .attr("transform", function(d, i ) {
            //         return "translate(" + (width/1.4)  + "," + (160 + (i * 50))  + ")";
            //     })
            //     .text(d => d);

            // // for each title creating a short path that transitions left to right
            // for(var i = 0; i < 6; i++){
            //     // paths
            //     var path = svg.append("path")
            //     .attr("stroke", ColorPicker(currentRecord._groups[0][0].__data__.country))
            //     .attr("stroke-width", 0.5) 
            //     .attr("stroke-linecap", "round")
            //     .attr("transform", "translate(" + width/1.8 + "," + (50 + (i * 50))  + "), scale(10)")
            //     .attr("className", "info-line")
            //     .attr("d", curve(info));
                
            //     var totalLength = path.node().getTotalLength();
            //     // paths transition
            //     path.attr("stroke-dasharray", totalLength + " " + totalLength)
            //     .attr("stroke-dashoffset", totalLength)
            //     .transition()
            //     .duration(3000)
            //     .ease(d3.easeLinear)
            //     .attr("stroke-dashoffset", 0);         
            // }
            // grabbing wine records information
            var wineData = [
                "Title: " + currentRecord._groups[0][0].__data__.title,
                "Country: " + currentRecord._groups[0][0].__data__.country,
                "Price: " + "$" + currentRecord._groups[0][0].__data__.price,
                "Variety: " + currentRecord._groups[0][0].__data__.variety,
                "Taster: " + currentRecord._groups[0][0].__data__.taster_name + " " + currentRecord._groups[0][0].__data__.taster_twitter_handle,
                "Description: " + currentRecord._groups[0][0].__data__.description
            ];
            // creating information text for each header
            var div = d3.select(".wine-text");
            div.selectAll("p")
            .data(wineData)
            .enter()
            .append("p")
            .style("width", "100%")
            .style("color", "white")
            .style("padding-bottom", "15px")
            
            .style("font-size", "1.5rem")
            .style("font-weight", "bold")
            .text(d => d);
           
            // creating wine glass with wineGlass positions
            svg.append("path")
            .attr("fill", ColorPicker(currentRecord._groups[0][0].__data__.country)) 
            .attr("transform", "translate(" + -50  + "," + -50 + "), scale(10)")
            .attr("className", "glass")
            .attr("d", curve(wineGlass));   
            // creating points text inside wine glass
            var name = svg.append("text")
            .attr("fill", "white")
            .style("font-size", "75px")
            .style("font-weight", "bold")
            .attr("x", 80)
            .attr("y", 280)
            .text(currentRecord._groups[0][0].__data__.points + " / 100");
        });   
    }
    
    render(){
        return (
            <div className="content" height="100%" width="100%" style={{ height: "100vh", position: "relative"}}>
                <svg className="wine-information" ></svg> 
                <div className="wine-text"></div>
                <BottomNav/>
            </div>
        );
    }  
}
Wine.contextType = DataContext;

export default Wine;
