import React from 'react';
import * as d3 from 'd3';
import wineDataSet from '../../dataset/wineDataSet.csv';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import '../../styles/winery.css';
import BottomNav from "../bottomNav"

class Winery extends React.Component {
 
    constructor(props){
        super(props);
    }

    // on page load
    componentDidMount(){
        // setting active link
        d3.select("#link-name-winery").style("color", "white");

        // creating tooltip (invisible)
        var tooltip = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

        // wine id
        var id = window.location.pathname.substring(8);

        // svg height and width components 
        var width = d3.select(".winery-information").node().getBoundingClientRect().width;
        var height = d3.select(".winery-information").node().getBoundingClientRect().height;

        // selecting svg
        var svg = d3.select(".winery-information").attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height);
        svg.selectAll("*").remove();

        // setting colors for path
        const colorSet = ["#1ecbe1", "#3590ca", "#404fbf", "#9400d3"];
        // setting x scale with color set
        var color = d3.scaleLinear().range(colorSet).domain([1, 2, 3, 4]);

        var linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "linear-gradient");

        // specificing the time to switch colors based on percentage
        linearGradient.append("stop").attr("offset", "0%").attr("stop-color", color(4));
        linearGradient.append("stop").attr("offset", "20%").attr("stop-color", color(3));    
        linearGradient.append("stop").attr("offset", "30%").attr("stop-color", color(2));
        linearGradient.append("stop").attr("offset", "40%").attr("stop-color", color(1));
        linearGradient.append("stop").attr("offset", "50%").attr("stop-color", color(1));
        linearGradient.append("stop").attr("offset", "60%").attr("stop-color", color(2));
        linearGradient.append("stop").attr("offset", "70%").attr("stop-color", color(2));
        linearGradient.append("stop").attr("offset", "80%").attr("stop-color", color(3));
        linearGradient.append("stop").attr("offset", "100%").attr("stop-color", color(4));

        // creating constant curve
        const curve = d3.line().curve(d3.curveBasis);
        
        // reading in wine data
        var wineSet = d3.csv(wineDataSet);

        // outputting winedata
        wineSet.then(function(data) {

            // Filtering out all records that has missing data
            var filteredData = data.filter(function(d, i) {
                return (d.country != "" && d.price != "" && d.points != "" && d.taster_twitter_handle != "" && d.price <= 150 && d.taster_name != "" && d.designation != "" && d.province != "" && d.winery != "" && d.variety != "" && d.title != "");
            });

            // setting colors for path
            const colorSet = ["#1ecbe1", "#3590ca", "#404fbf", "#9400d3"];
            // setting x scale with color set
            var color = d3.scaleLinear().range(colorSet).domain([1, 2, 3, 4]);

            var linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "linear-gradient");

            // specificing the time to switch colors based on percentage
            linearGradient.append("stop").attr("offset", "0%").attr("stop-color", color(4));
            linearGradient.append("stop").attr("offset", "20%").attr("stop-color", color(3));    
            linearGradient.append("stop").attr("offset", "30%").attr("stop-color", color(2));
            linearGradient.append("stop").attr("offset", "40%").attr("stop-color", color(1));
            linearGradient.append("stop").attr("offset", "50%").attr("stop-color", color(1));
            linearGradient.append("stop").attr("offset", "60%").attr("stop-color", color(2));
            linearGradient.append("stop").attr("offset", "70%").attr("stop-color", color(2));
            linearGradient.append("stop").attr("offset", "80%").attr("stop-color", color(3));
            linearGradient.append("stop").attr("offset", "100%").attr("stop-color", color(4));

            // creating constant curve
            const curve = d3.line().curve(d3.curveBasis);

            // grabbing current record information
            var currentRecord = d3.selectAll("div").data(data).enter().filter(function(d) { 
                if(d.id == id) {
                    return d.winery;
                };
            });
            // creating start position for path (at the bottom of the page)
            var pathStart =[[0, height], [width/2 - 400, height], [width/2 - 300, height], [width/2 - 150, height], [width/2 + 150, height], [width/2 + 300, height], [width/2 + 400, height], [width, height]];
            
            // creating a path for each wine
            svg.selectAll("div")
            .data(filteredData)
            .enter()  
            // filterdata to only get wines from the winery
            .filter(function(d) { 
                if(d.winery == currentRecord._groups[0][0].__data__.winery) {  
                    return d.winery;
                };
            })
            .append("a")   
            // give each wine a link to its own wine page    
            .attr("xlink:href", function(d) { 
                // set localstorage with id
                localStorage.setItem("wine-id", d.id);
                return "/wine/" + d.id;
            })
            .append("path")
            .attr("class", "winery-paths")
            .attr("id", "off")
            .attr("stroke", "url(#linear-gradient)")
            .style("fill", "none")
            .style("stroke-width", "5px") 
            .style("opacity", 1)  
            // start line
            .attr("d", curve(pathStart))
            // transition
            .transition()
            .duration(5000)
            .attr("d", function(d, i) {
                var length = d3.selectAll(".winery-paths").size();
                var path = "";
                // winery has even amount of wines
                if(length % 2 == 0){
                    // creating bottom paths
                    if(i < Math.floor(length/2)){
                        path = [[0, height/2 + (i * 15) + 25], [width/2 - 400, height/2 + (i * 15) + 25], [width/2 - 300, height/2 + (i * 5)], [width/2 - 150, height/2], [width/2 + 150, height/2], [width/2 + 300, height/2 + (i * 5)], [width/2 + 400, height/2 + (i * 15) + 25], [width, height/2 + (i * 15) + 25]];      
                    }
                    // creating top paths
                    else{
                        var tempPosition = i -  Math.floor(length/2);
                        path = [[0, height/2 - (tempPosition * 15) - 25], [width/2 - 400, height/2 - (tempPosition * 15) - 25], [width/2 - 300, height/2 - (tempPosition * 5)], [width/2 - 150, height/2], [width/2 + 150, height/2], [width/2 + 300, height/2 - (tempPosition * 5)], [width/2 + 400, height/2 - (tempPosition * 15) - 25], [width, height/2 - (tempPosition * 15) - 25]];     
                    }         
                }
                // winery has odd amount of wines
                else{   
                    // creating bottom paths           
                    if(i < Math.floor(length/2)){
                        path = [[0, height/2 + (i * 15) + 25], [width/2 - 400, height/2 + (i * 15) + 25], [width/2 - 300, height/2 + (i * 5)], [width/2 - 150, height/2], [width/2 + 150, height/2], [width/2 + 300, height/2 + (i * 5)], [width/2 + 400, height/2 + (i * 15) + 25], [width, height/2 + (i * 15) + 25]];      
                    }
                    // creating top paths
                    else {
                        var tempPosition = i -  Math.floor(length/2);
                        path = [[0, height/2 - (tempPosition * 15) - 25], [width/2 - 400, height/2 - (tempPosition * 15) - 25], [width/2 - 300, height/2 - (tempPosition * 5)], [width/2 - 150, height/2], [width/2 + 150, height/2], [width/2 + 300, height/2 - (tempPosition * 5)], [width/2 + 400, height/2 - (tempPosition * 15) - 25], [width, height/2 - (tempPosition * 15) - 25]];     
                         // creating center path
                        if(tempPosition ==  Math.floor(length/2)){
                            path = [[0, height/2 + 0.1], [width/2 - 400, height/2], [width/2 - 300, height/2], [width/2 - 150, height/2], [width/2 + 150, height/2], [width/2 + 300, height/2], [width/2 + 400, height/2], [width, height/2]];       
                        }      
                    }    
                }
                return curve(path);       
            });
            // setting an interval so users cant hover before transition is done
            setInterval(function () {
                // giving all paths a hover feature
                d3.selectAll(".winery-paths")
                // on hover
                .on("mouseover", function(event, d){
                    // change cursor
                    d3.select(this).attr("id", "on").style("cursor", "pointer");
                    // turning opacity of other paths down
                    d3.selectAll("#off").transition().duration(200).style("opacity", 0.1); 
                    
                    // creating tooltip to show wine, price, and rank
                    tooltip.style("opacity", .9).html(
                    "<h4>" + d.title + "</h4><h5>Price:&nbsp;&nbsp;&nbsp;&nbsp;$" + d.price +"<br>Rank:&nbsp;&nbsp;&nbsp;&nbsp;+" + d.points + " / 100</h5>")	
                    .style("left", (event.x - 200) + "px")		 
                    .style("top", (event.y - 100) + "px");
                })
                // on mouseout
                .on("mouseout", function() {
                    // change cursor
                    d3.select(this).attr("id", "off").style("cursor", "default");
                    // turning opacity of other paths back up
                    d3.selectAll("#off").transition().duration(200).style("opacity", 1);  
                    // making tooltip invisible
                    tooltip.style("opacity", 0);
                });
            }, 6000); 
            
            // setting header as wine name
            var name = d3.selectAll(".winery-name").text(currentRecord._groups[0][0].__data__.winery);
            
            // starting variables
            var score = 0;
            var lowestPrice = 100000000;
            var highestPrice = 0;
            var length = d3.selectAll(".winery-paths").size();
            
            // filtering data for only wines from the winery
            // adding all ranks together
            // searching for lowest priced wine and hightest priced wine
            filteredData.filter(function(d) { 
                if(d.winery == currentRecord._groups[0][0].__data__.winery) {
                    return d.winery;
                };
            }).forEach(function(d) {
                score += parseFloat(d.points); 
                if(parseFloat(d.price) > highestPrice){
                    highestPrice = parseFloat(d.price);
                }
                if(parseFloat(d.price) < lowestPrice){
                    lowestPrice = parseFloat(d.price);
                }
            });
            // calculating the average rank
            var score = score / length;
            
            // setting the score, highPrice, and lowPrice tags
            var scoreTag = d3.selectAll(".score").text("+" + Math.round(score * 10) / 10);
            var highPriceTag = d3.selectAll(".high-price").text("$" + Math.round(highestPrice * 10) / 10);
            var lowPriceTag = d3.selectAll(".low-price").text("$" + Math.round(lowestPrice  * 10) / 10);
            
        });
    }

    render(){
        return (
            <div style={{ width: "100%", height: "100%"}}>
                
                <Typography variant="h2" style={{ fontWeight: "bold"}} className="winery-name" gutterBottom></Typography>
                <Typography style={{fontWeight: "bold"}} className="winery" gutterBottom>WINERY</Typography>
                <Paper className="winery-paper" elevation={24} style={{backgroundColor: "#151d1e"}}>
                    <div className="statistic">
                        <Typography variant="h4" className="score" gutterBottom></Typography>
                        <Typography className="average-rank-sub-header" gutterBottom>AVERAGE RANK</Typography>
                    </div>
                    <div className="statistic">
                        <Typography variant="h4" className="high-price" gutterBottom></Typography>
                        <Typography className="average-price-sub-header" gutterBottom>HIGHEST PRICED WINE</Typography>
                    </div>
                    <div className="statistic">
                        <Typography variant="h4" className="low-price" gutterBottom></Typography>
                        <Typography className="average-price-sub-header" gutterBottom>LOWEST PRICED WINE</Typography>
                    </div>
                </Paper>
                <svg className="winery-information" ></svg> 
                <BottomNav/>
            </div>
        );
    } 
}
export default Winery;
