import React from 'react';
import * as d3 from 'd3';
import wineDataSet from '../../dataset/wineDataSet.csv';
import Typography from "@material-ui/core/Typography";
import '../../styles/taster.css';
import * as d3Collection from 'd3-collection';
import BottomNav from "../bottomNav"
import { TramOutlined } from '@material-ui/icons';

class Taster extends React.Component {
 
    constructor(props){
        super(props);
    }

    // on page load
    componentDidMount(){
        // setting active link
        d3.select("#link-name-taster").style("color", "white");
         
        // creating constant curve
        const curve = d3.line().curve(d3.curveBasis);

        // wine id
        var id = window.location.pathname.substring(8);
        
        // svg height and width components 
        var width = d3.select(".taster-information").node().getBoundingClientRect().width;
        var height = d3.select(".taster-information").node().getBoundingClientRect().height;

        // selecting svg
        var svg = d3.select(".taster-information");
        svg.selectAll("*").remove();
        
        // creating main taster circle
        svg.append("circle")
        .attr("id", "leftNode")
        .attr("r", 65)
        .style("stroke-dasharray", ("5,3"))
        .attr("cx", 100)
        .attr("cy", height / 2 - 200)
        .style("fill", "#1ecbe1")
        .style("fill-opacity", 0.2)
        .attr("stroke", "white")
        .style("stroke-width", 4);

        // creating compare taster circle
        svg.append("circle")
        .attr("id", "rightNode")
        .attr("r", 65)
        .style("stroke-dasharray", ("5,3"))
        .attr("cx", width - 100)
        .attr("cy", (height / 2 - 200))
        .style("fill", "#1ecbe1")
        .style("fill-opacity", 0.2)
        .attr("stroke", "white")
        .style("stroke-width", 4);

        // creating information text 1
        svg.append("text")
        .attr("id", "text-one")
        .attr("width", "100%")
        .style("text-anchor", "middle")
        .attr("transform", function(d, i ) {
          return "translate(" + width/2  + "," + (height/2.8)  + ")";
        })
        .style("font-size", "1.2vw")
        .style("font-weight", "bold")
        .attr("fill", "white")
        .text("Click a taster below to compare!");

         // creating information text 2
         svg.append("text")
         .attr("id", "text-two")
         .attr("transform", function(d, i ) {
           return "translate(" + (10)  + "," + (height/2.2)  + ")";
         })
         .style("font-size", "2vw")
         .style("font-weight", "bold")
         .attr("fill", "white")
         .text("Tasters:");

        // reading in wine data
        var wineSet = d3.csv(wineDataSet);

        // strange thing... maybe because function ends early then doesnt create first 3???
        // added dummy names so that it takes in all tasters
        var tasters = [];

        // outputting winedata
        wineSet.then(function(data) {
            // Filtering out all records that has missing data
            var filteredData = data.filter(function(d, i) {
                return (d.country != "" && d.price != "" && d.points != "" && d.taster_twitter_handle != "" && d.price <= 150 && d.taster_name != "" && d.designation != "" && d.province != "" && d.winery != "" && d.variety != "" && d.title != "");
            });

            // grabbing the current records information
            var currentRecord = d3.selectAll("div").data(data).enter().filter(function(d) { 
                if(d.id == id) {
                    return d.taster_name;
                };
            });
           
            // starting a collection with filtered data and tasters twitter name as key 
            var collection = d3Collection.nest()
            .key(function(d) { return d.taster_name;})
            .entries(filteredData);


            // adding to tasters array all tasts
            collection.forEach(function(d) {
                if(d.key != currentRecord._groups[0][0].__data__.taster_name){
                    var key = {name: d.key};
                    tasters.push(key); 
                }     
            });
            
            // creating main taster group
            var mainNode = svg
            .append("g");
           
            // creating main taster circle
            var mainCircle = mainNode.append("circle")
            .attr("classed", currentRecord._groups[0][0].__data__.taster_name)
            .attr("id", "nonDragable")
            .attr("r", 65)
            .attr("cx", 100)
            .attr("cy", height / 2 - 200)   
            .style("fill", "rgb(148, 0, 211)")
            .style("fill-opacity", 0.2)
            .style("stroke-width", 4);
        
            // creating main taster text
            var mainText = mainNode.append("text")
            .attr("id", "nonDragableText")
            .text(currentRecord._groups[0][0].__data__.taster_name)
            .style("text-anchor", "middle")
            .attr("fill", "white")
            .attr("x", 100)
            .attr("y", height / 2 - 200);  
            
            // creating text for compare cirle
            var compareText = mainNode.append("text")
            .attr("id", "compare")
            .text("Compare Tasters!")
            .style("text-anchor", "middle")
            .attr("fill", "white")
            .attr("x", width - 100)
            .attr("y", height / 2 - 200);    

            // creating name for all other tasters
            svg.selectAll("p")
            .data(tasters)
            .enter()
            .append("text")
            .attr("id", "otherTasters")
            .style("text-anchor", "middle")
            .attr("fill", "white")
            .attr("width", "100%")
            .style("font-size", "1vw")
            .style("font-weight", "bold")
            .attr("transform", function(d, i ) {
              return "translate(" + (width/2)  + "," + (height/2 + (i * 25))  + ")";
            })
            // on hover change cursor
            .on("mouseover", function () {
              d3.select(this).style("cursor", "pointer").attr("fill", "#1ecbe1");
            })
            // on mouseout change cursor 
            .on("mouseout", function () {
              d3.select(this).style("cursor", "default").attr("fill", "white");
            })
            .on("click", function(i, d) {
      
              // showing all 4 comparions 
              d3.select(".comparisons").style("opacity", 1);
              
              // turning the left side circles colors on
              d3.select("#leftNode").attr("stroke", "#9400d3");
              d3.select("#rightNode").attr("stroke", "#1ecbe1");

              // turning on paths
              d3.selectAll("path").attr("opacity", 1);

              // changing  the compare taster name
              d3.selectAll("#compare").text(d.name);
              
              // moving tasters out of the way
              d3.selectAll("#otherTasters")
              .transition()
              .duration(1000)
              .attr("transform", function(d, i ) {
                return "translate(" + 100  + "," + (height/2 + (i * 25))  + ")";
              });

              // creating two paths positions
              const line1 = [[100, height / 2 - 125], [100, height / 2 - 100], [125, height / 2 - 75], [150, height / 2 - 50],  [175, height / 2 - 25], [200, height / 2], [225, height / 2 + 25], [250, height / 2 + 50], [275, height / 2 + 75], [250, height / 2 + 100], [225, height / 2 + 125], [250, height / 2 + 150], [275, height / 2 + 175], [250, height / 2 + 200], [225, height / 2 + 225], [250, height / 2 + 250], [275, height / 2 + 275], [250, height / 2 + 300], [225, height / 2 + 325], [250, height / 2 + 350], [275, height / 2 + 375], [250, height / 2 + 400]];
              const line2 = [[width-100, height / 2 - 125], [width - 100, height / 2 - 100], [width - 125, height / 2 - 75], [width - 150, height / 2 - 50], [width - 175, height / 2 - 25], [width - 200, height / 2], [width - 225, height / 2 + 25], [width - 250, height / 2 + 50], [width - 275, height / 2 + 75], [width - 250, height / 2 + 100], [width - 225, height / 2 + 125], [width - 250, height / 2 + 150], [width - 275, height / 2 + 175], [width - 250, height / 2 + 200], [width - 225, height / 2 + 225], [width - 250, height / 2 + 250], [width - 275, height / 2 + 275], [width - 250, height / 2 + 300], [width - 225, height / 2 + 325], [width - 250, height / 2 + 350], [width - 275, height / 2 + 375], [width - 250, height / 2 + 400]];

              // creating path 1
              var path1 = svg.append("path")
              .attr("id", "path1")
              .attr("stroke", "#9400d3")
              .attr("fill", "none")
              .attr("stroke-width", 5) 
              .attr("stroke-linecap", "round")
              .attr("className", "info-line")
              .attr("d", curve(line1));

              // creating path 2
              var path2 = svg.append("path")
              .attr("id", "path2")
              .attr("stroke", "#1ecbe1")
              .attr("fill", "none")
              .attr("stroke-width", 5) 
              .attr("stroke-linecap", "round")
              .attr("className", "info-line")
              .attr("d", curve(line2));

              // grabbing paths total length
              var totalLength1 = path1.node().getTotalLength();
              var totalLength2 = path2.node().getTotalLength();

              // transitioning path 1 based on position
              path1.attr("stroke-dasharray", totalLength1 + " " + totalLength1)
              .attr("stroke-dashoffset", totalLength1)
              .transition()
              .duration(3000)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0);

              // transitioning path 2 based on position
              path2.attr("stroke-dasharray", totalLength2 + " " + totalLength2)
              .attr("stroke-dashoffset", totalLength2)
              .transition()
              .duration(3000)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0);

              // grabbing compare taster name
              var comparisonName = d.name;

              // comparisons
              var svgComparisonOne = d3.select(".comparison-one");
              var svgComparisonTwo = d3.select(".comparison-two");
              var svgComparisonThree = d3.select(".comparison-three");
              var svgComparisonFour = d3.select(".comparison-four");

              // delete previous information
              svgComparisonOne.selectAll("*").remove();
              svgComparisonTwo.selectAll("*").remove();
              svgComparisonThree.selectAll("*").remove();
              svgComparisonFour.selectAll("*").remove();

              // svg height and width components 
              var widthCompareOne = d3.select(".comparison-one").node().getBoundingClientRect().width;
              var heightCompareOne = d3.select(".comparison-one").node().getBoundingClientRect().height;
              var widthCompareTwo = d3.select(".comparison-two").node().getBoundingClientRect().width;
              var heightCompareTwo = d3.select(".comparison-two").node().getBoundingClientRect().height;
              var widthCompareThree = d3.select(".comparison-three").node().getBoundingClientRect().width;
              var heightCompareThree = d3.select(".comparison-three").node().getBoundingClientRect().height;
              var widthCompareFour = d3.select(".comparison-four").node().getBoundingClientRect().width;
              var heightCompareFour = d3.select(".comparison-four").node().getBoundingClientRect().height;

              // calculating total
              var total = 0;
              var totalForNameOne = 0;
              var totalForNameTwo = 0;
              var lengthMainName = 0;
              var lengthCompareName = 0;

              // for each item in collection compute totals for main taster and compare taster
              collection.forEach(function(d) {
                if(d.key == currentRecord._groups[0][0].__data__.taster_name){
                  totalForNameOne = d.values.length;
                  total+= d.values.length;
                  lengthMainName = d.values.length;
                }   
                if(d.key == comparisonName){
                  totalForNameTwo = d.values.length;
                  total+= d.values.length;
                  lengthCompareName = d.values.length;
                }
              });

              // setting y scale with total amount of wines
              var y1 = d3.scaleLinear()
              .domain([0, total])
              .range([ heightCompareOne, 0 ]); 

              // COMPARISON 1
              // creating reactangle for main taster
              svgComparisonOne.append("rect")
              .attr("x", widthCompareOne/2 - 100 )
              .attr("y", heightCompareOne)
              .attr("width", 100)
              .attr("height", heightCompareOne)
              .attr("stroke", "none")
              .attr("fill", "#9400d3")
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y1(totalForNameOne); });

              // creating text for main taster
              svgComparisonOne.append("text")
              .attr("x", widthCompareOne/2 - 100)
              .attr("y", heightCompareOne)
              .attr("fill", "white")
              .style("font-size", "34px")
              .attr("font-weight", "bold")
              .text(totalForNameOne)
              .transition()
              .duration(5000)
              .attr("y", function(d) { 
                if(y1(totalForNameOne) < 20){
                  return y1(totalForNameOne) + 25;
                }
                else{
                  return y1(totalForNameOne) - 2;
                }
              });

              // creating reactangle for compare taster
              svgComparisonOne.append("rect")
              .attr("x", widthCompareOne/2)
              .attr("y", heightCompareOne)       
              .attr("width", 100)
              .attr("height", heightCompareOne)
              .attr("stroke", "none")
              .attr("fill", "#1ecbe1")
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y1(totalForNameTwo); });

              // creating text for compare taster
              svgComparisonOne.append("text")
              .attr("x", widthCompareOne/2)
              .attr("y", heightCompareOne)
              .attr("fill", "white")
              .style("font-size", "34px")
              .attr("font-weight", "bold")
              .text(totalForNameTwo)
              .transition()
              .duration(5000)
              .attr("y", function(d) { 
                if(y1(totalForNameTwo) < 20){
                  return y1(totalForNameTwo) + 25;
                }
                else{
                  return y1(totalForNameTwo) - 2;
                }
              });


              // COMPARISON 2
              // variables for average ranks
              var scoreMain = 0;
              var scoreCompare = 0;
              // filterdata for only main taster
              // collect total score
              filteredData.filter(function(d) { 
                if(d.taster_name == currentRecord._groups[0][0].__data__.taster_name) {
                    return d.taster_name;
                };
              }).forEach(function(d) {
                  scoreMain += parseFloat(d.points);
              });
              // filterdata for only compare taster
              // collect total score
              filteredData.filter(function(d) { 
                if(d.taster_name == comparisonName) {
                    return d.taster_name;
                };
              }).forEach(function(d) {
                  scoreCompare += parseFloat(d.points);
              });

              // compute averages
              scoreMain = scoreMain / lengthMainName;
              scoreCompare = scoreCompare / lengthCompareName;

              // create y scale for averages
              var y2 = d3.scaleLinear()
              .domain([0, 100])
              .range([ heightCompareOne, 0 ]); 

              // creating rectangle for main taster
              svgComparisonTwo.append("rect")
              .attr("x", widthCompareTwo/2 - 100)
              .attr("y", heightCompareTwo)
              .attr("width", 100)
              .attr("height", heightCompareTwo)
              .attr("stroke", "none")
              .attr("fill", "#9400d3")
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y2(scoreMain); });

              // creating text for main taster
              svgComparisonTwo.append("text")
              .attr("x", widthCompareTwo/2 - 100)
              .attr("y", heightCompareTwo)
              .attr("fill", "white")
              .style("font-size", "34px")
              .attr("font-weight", "bold")
              .text(Math.round(scoreMain * 100) / 100)
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y2(scoreMain) - 2; });

              // creating rectangle for compare taster
              svgComparisonTwo.append("rect")
              .attr("x", widthCompareTwo/2)
              .attr("y", heightCompareTwo)
              .attr("width", 100)
              .attr("height", heightCompareTwo)
              .attr("stroke", "none")
              .attr("fill", "#1ecbe1")
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y2(scoreCompare); });

              // creating text for compare taster
              svgComparisonTwo.append("text")
              .attr("x", widthCompareTwo/2)
              .attr("y", heightCompareTwo)
              .attr("fill", "white")
              .style("font-size", "34px")
              .attr("font-weight", "bold")
              .text(Math.round(scoreCompare * 100) / 100)
              .transition()
              .duration(5000)
              .attr("y", function(d) { return y2(scoreCompare) - 2; });

              // COMPARISON 3
              // variables for highest price
              var highestPriceMain = 0;
              var highestPriceCompare = 0;
              var priceFlipName = "";
              for(var i = 0; i < 2; i++){
                // change name based on i
                if(i === 0){
                  priceFlipName = currentRecord._groups[0][0].__data__.taster_name;
                }
                else{
                  priceFlipName = comparisonName;
                }
                // filterdata for both tasters
                // collect highest price
                filteredData.filter(function(d) { 
                  if(d.taster_name == priceFlipName) {
                    return d.taster_name;
                  };
                }).forEach(function(d) {
                    // update price main taster
                    if(parseFloat(d.price) > highestPriceMain && priceFlipName === currentRecord._groups[0][0].__data__.taster_name){
                        highestPriceMain = parseFloat(d.price);
                    }
                    // update price compare taster
                    if(parseFloat(d.price) > highestPriceCompare && priceFlipName === comparisonName){
                      highestPriceCompare = parseFloat(d.price);
                  }
                });
              }

              // creating text for main taster 
              var priceMain = svgComparisonThree
              .append("text")
              .attr("x",  widthCompareThree/3)
              .attr("y", heightCompareThree/2.2)
              .attr("fill", "#9400d3")
              .attr("font-size", "5vw")
              .attr("font-weight", "bold")
              .text(0);

              // transition the number from 0 to calculated number
              priceMain.transition()
              .tween("text", function() {                  
                var interpolator = d3.interpolateNumber(d3.select(this).text(), highestPriceMain);
                return function(d) { d3.select(this).text("$" + Math.round(interpolator(d))); };
              })
              .duration(5000);

              // creating text for compare taster 
              var priceCompare = svgComparisonThree
              .append("text")
              .attr("x",  widthCompareThree/3)
              .attr("y", heightCompareThree/1.2)
              .attr("fill", "#1ecbe1")
              .attr("font-size", "5vw")
              .attr("font-weight", "bold")
              .text(0);

              // transition the number from 0 to calculated number
              priceCompare.transition()
              .tween("text", function() {                   
                var interpolator = d3.interpolateNumber(d3.select(this).text(), highestPriceCompare);
                return function(d) { d3.select(this).text("$" + Math.round(interpolator(d))); };
              })
              .duration(5000);

              // COMPARISON 4
              // variables for highest rank
              var highestRankMain = 0;
              var highestRankCompare = 0;
              var rankFlipName = "";
              for(var i = 0; i < 2; i++){
                // change name based on i
                if(i === 0){
                  rankFlipName = currentRecord._groups[0][0].__data__.taster_name;
                }
                else{
                  rankFlipName = comparisonName;
                }
                // filterdata for both tasters
                // collect highest rank
                filteredData.filter(function(d) { 
                  if(d.taster_name == rankFlipName) {
                    return d.taster_name;
                  };
                }).forEach(function(d) {
                    // update rank main taster
                    if(parseFloat(d.points) > highestRankMain && rankFlipName === currentRecord._groups[0][0].__data__.taster_name){
                        highestRankMain = parseFloat(d.points);
                    }
                    // update rank compare taster
                    if(parseFloat(d.points) > highestRankCompare && rankFlipName === comparisonName){
                      highestRankCompare = parseFloat(d.points);
                  }
                });
              }

              // creating text for main taster 
              var rankMain = svgComparisonFour
              .append("text")
              .attr("x",  widthCompareFour/2.7)
              .attr("y", heightCompareFour/2.2)
              .attr("fill", "#9400d3")
              .attr("font-size", "5vw")
              .attr("font-weight", "bold")
              .text(0);

              // transition the number from 0 to calculated number
              rankMain.transition()
              .tween("text", function() {                  
                var interpolator = d3.interpolateNumber(d3.select(this).text(), highestRankMain);
                return function(d) { d3.select(this).text("+" + Math.round(interpolator(d))); };
              })
              .duration(5000);

              // creating text for compare taster 
              var rankCompare = svgComparisonFour
              .append("text")
              .attr("x",  widthCompareFour/2.7)
              .attr("y", heightCompareFour/1.2)
              .attr("fill", "#1ecbe1")
              .attr("font-size", "5vw")
              .attr("font-weight", "bold")
              .text(0);

              // transition the number from 0 to calculated number
              rankCompare.transition()
              .tween("text", function() {                   
                var interpolator = d3.interpolateNumber(d3.select(this).text(), highestRankCompare);
                return function(d) { d3.select(this).text("+" + Math.round(interpolator(d))); };
              })
              .duration(5000);
            })
            .text(d => d.name);
        });
    }

    render(){
        return (
            <div height="100%" width="100%" style={{ height: "100vh", position: "relative"}}>
              <svg className="taster-information" style={{ float: "left", height: "100vh", width:"34%"}}></svg>  
              <div className="comparisons" style={{marginTop: "5%", opacity: "0", float: "left", height: "90vh", width: "65%"}}>
                <div className="amount-of-ranked-wines" style={{borderBottom: "1px solid white", float: "left", height: "50vh", width: "49%"}}>
                  <Typography className="comparison-header" gutterBottom>AMOUNT OF WINES RANKED</Typography>
                  <svg className="comparison-one" style={{ width: "100%", height: "75%"}}></svg>
                </div>
                <div className="average-rank-awarded" style={{ borderBottom: "1px solid white", float: "left", height: "50vh", width: "49%"}}>
                  <Typography className="comparison-header" gutterBottom>AVERAGE RANK AWARDED</Typography>
                  <svg className="comparison-two" style={{ width: "100%", height: "75%"}}></svg>
                </div>
                <div className="highest-priced-wine" style={{ float: "left", height: "50vh", width: "49%"}}>
                  <Typography className="comparison-header" gutterBottom>HIGHEST PRICED WINE</Typography>
                  <svg className="comparison-three" style={{width: "100%", height: "75%"}}></svg>
                </div>
                <div className="highest-ranked-wine" style={{ float: "left", height: "50vh", width: "49%"}}>
                  <Typography className="comparison-header" gutterBottom>HIGHEST RANKED WINE</Typography>
                  <svg className="comparison-four" style={{ width: "100%", height: "75%"}}></svg>
                </div>

              </div>
              <BottomNav/>
            </div>
        );
    }
    
}
export default Taster;
