import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import wineDataSet from '../../dataset/wineDataSet.csv';
import { ColorPicker, GetCountries, GetTasters} from '../../functions/functions';
import Typography from "@material-ui/core/Typography";
import '../../styles/chart.css';
import DataContext from '../../DataContext';

class Chart extends React.Component {
 
    constructor(props){
        super(props);
        // price, rank, countries, tasters recieved from parent
        this.state = {
            values: this.props.valuesFromParent,
        };
    }
    // on page load remove
    componentDidMount(){
        // removing previous items
        var svg = d3.select(".wine-collection");
        svg.selectAll("*").remove();
        
        // creating selection border
        var div = d3.select(".svg-container");
        div.style("border", "white")
        .style("border-style", "solid")
        .style("border-radius", "16px");
        localStorage.clear();
    }
    
    // on user updates
    componentDidUpdate(prevProps) {
        // self as this state
        const self = this;

        // if values from parent have changed (users selection has changed)
        if (prevProps.valuesFromParent !== this.props.valuesFromParent) {

            // tasters and countries selection
            var countriesProp = GetCountries();
            var tastersProp = GetTasters();
            
            // tasters and countries appended string
            var selectedCountries = "";
            var selectedTasters = "";
            
            // if selection is not empty append string (countries)
            if(countriesProp !== "empty"){     
                countriesProp.each(function(d, i) {     
                    selectedCountries += d.key + " ";   
                });
            }
            else{
                selectedCountries = "empty";
            }
            // if selection is not empty append string (tasters)
            if(tastersProp !== "empty" ){     
                tastersProp.each(function(d, i) {      
                    selectedTasters += d.key + " "; 
                });
            }
            else{
                selectedTasters = "empty";
            }

            // wine glass points and curve components
            const curve = d3.line().curve(d3.curveBasis);
            const wineGlass = [[15 , 15], [5, 40], [25, 45], [25, 80], [10, 80], [40, 80], [25, 80], [25, 45], [45, 40], [35, 15], [35, 15], [35, 15], [15, 15]]; 
        
            // svg height and width components 
            var width = d3.select(".wine-collection").node().getBoundingClientRect().width;
            var height = d3.select(".wine-collection").node().getBoundingClientRect().height;
            
            // selecting svg
            var svg = d3.select(".wine-collection").attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height);
            svg.selectAll("*").remove();
            
            // slider values
            var selectedPrice = this.props.valuesFromParent[0];
            var selectedRank = this.props.valuesFromParent[1];
            
            // if all filters are applied
            if(selectedPrice !== "" && selectedRank !== "" && selectedTasters !== "empty" && selectedCountries !== "empty"){
                // counting wine glass lines 
                var count = -1;

                var filteredData = this.context.filter(function(d, i) { 
                    // filter out all countries that arent included in string
                    if(selectedCountries !== "empty"){
                        return (selectedCountries.includes(d.country));
                    }
                    else{
                        return
                    }
                });
        
                filteredData = filteredData.filter(function(d, i) { 
                    // filter out all tasters that arent included in string
                    if(selectedTasters !== "empty"){
                        return (selectedTasters.includes(d.taster_twitter_handle));
                    }  
                    else{
                        return
                    }
                });
                
                // filtering data with price and rank
                filteredData = filteredData.filter(function(d, i) { 
                    // filter for price and rank 
                    return (d.points == selectedRank && d.price == selectedPrice);
                });

                // setting total amount of selected wines header
                d3.select(".total").text(filteredData.length + " SELECTED WINES");

                svg.selectAll("div")
                .data(filteredData)
                .enter() 
                .filter(function(d, i) { 
                    // filter for price and rank 
                    return (d.points == selectedRank && d.price == selectedPrice);
                }) 
                .append("a")   
                // give each wine a link to its own wine page    
                .attr("xlink:href", function(d) { 
                    // set localstorage with id
                    localStorage.setItem("wine-id", d.id);
                    return "/wine/" + d.id;
                })
                .append("path")
                // select each wineglasses color based on country
                .attr("fill", d => ColorPicker(d.country))  
                .attr("class", "glass")
                // transform the wines so that there is 30 per line
                .attr("transform", function(d, i) {   
                    if(i % 30 == 0) { 
                        count++;  
                    }
                    var position = (i % 30) * 20 + 5;  
                    return "translate(" + position + ", " + count * 40 + ") scale(0.5)";    
                })
                // create wine glass
                .attr("d", curve(wineGlass))
                // show wine name and country when hovered on
                .on("mouseover", function(event, d){
                    d3.select(".wine-title").style("color", ColorPicker(d.country)).text("Wine: " + d.title);
                    d3.select(".country-title").style("color", ColorPicker(d.country)).text("Country: " + d.country);
                })
                // remove wine name and country on mouseout
                .on("mouseout", function(){
                    d3.select(".wine-title").text("");
                    d3.select(".country-title").text("");
                });
            }
        }
        // changes to props have not been applied 
        // give user a message to apply changes
        else{
            d3.select(".total").text("Apply Changes!");
        }
    }
    
    render(){
        return (
            <div className="svg-container">
                <svg className="wine-collection"></svg>   
            </div>
        );
    }  
}
Chart.contextType = DataContext;

export default Chart;
