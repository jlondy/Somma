import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import wineDataSet from '../../dataset/wineDataSet.csv';
import { ColorPicker, GetCountries, GetTasters} from '../../functions/functions';
import DataContext from '../../DataContext';


class CountryFilter extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { 
            countries: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    // handling the users selection
    // setting country state when country is turned on/off
    // calling GetCountries function which grabs on rectangle components with an on id
    handleChange = e => {
        this.setState({ countries: GetCountries() }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
    };

    // when the countries state changes perform the actions in the method
    componentDidUpdate() {
        const self = this;
      
        // tasters selection
        var tastersProp = GetTasters();

        // tasters appended string
        var selectedTasters = "";
        
        // if selection is not empty append string (tasters)
        if(tastersProp !== "empty" ){     
            tastersProp.each(function(d, i) {      
                selectedTasters += d.key + " "; 
            });
        }
        else{
            selectedTasters = "empty";
        }
        // there are selected tasters to update
        if(selectedTasters !== "empty"){

            // svg height and width
            var width = d3.select(".countries-svg").node().getBoundingClientRect().width;
            var height = d3.select(".countries-svg").node().getBoundingClientRect().height;
            
            // selecting svg
            var svg = d3.select(".countries-svg").attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height);
 
                // starting a collection with filtered data and country as key 
                var collection = d3Collection.nest()
                .key(function(d) { return d.country;})
                .entries(this.context);
                
                collection = collection.filter(function(d) { 
                    return (d.values.length > 1000);
                })
                // sort from greatest to least cases
                collection = collection.slice().sort((a, b) => d3.descending(a.values, b.values));
                
                // creating a empty collection
                var updatedCollection = [];

                collection.forEach(function(d){
                    // pushing new selection to updatedCollection which stores country as key and values as its wine occurrences
                    // furthermore it filters out all values that dont have the selected tasters (chosen by user)
                    updatedCollection.push({"key": d.key, "values": d.values.filter(function(d){
                        if(selectedTasters !== "empty"){
                            return (selectedTasters.includes(d.taster_twitter_handle));
                        }  
                        else{
                            return
                        }
                    })});     
                });

                // computing total amount of records - cases where country has under 1000 records 
                var total = 0;
                updatedCollection.forEach(function(d) {
                    total += d.values.length; 
                });
                
                // selecting all foreground rectangles changing its position based on the new values
                svg.selectAll(".countryOff, .countryOn")
                .data(updatedCollection)
                .on("mouseover", function(d, i){
                    // change cursor
                    d3.select(this).style("cursor", "pointer");
                    // change color
                    if(d3.select(this).text() == "off"){ 
                        d3.select("#" + i.key).style("fill", "#111921").style("cursor", "pointer");
                    }  
                })
                .on("mouseout", function(d, i) {
                    // change cursor
                    d3.select(this).style("cursor", "default");
                    
                    if(d3.select(this).text() == "off"){
                        // change color 
                        d3.select("#" + i.key).style("fill", "#1b2836").style("cursor", "default");
                    }
                })
                .on("click", function(d, i) {
                    // if country is off then turn on when user clicks    
                    if(d3.select(this).text() == "off"){ 
                        d3.select(this).attr("class", "countryOn").text(function (d) {
                            return d.key;
                        });
                        // change color
                        d3.select(this).attr("opacity", 0.5)
                        d3.select("#" + i.key).style("fill", "#667d96");
                    }
                    // country is on so turn country off when user clicks
                    else{
                        d3.select(this).attr("class", "countryOff").text("off");
                        // change color
                        d3.select(this).attr("opacity", 1)
                        d3.select("#" + i.key)
                        .style("fill", "#1b2836");
                    } 
                    // updating the state when user clicks foregorund rectangle
                    self.handleChange();
                })
                .transition()
                .duration(5000)
                .attr("width", function (d) {           
                    return (d.values.length / total) * width;                          
                });

                // updating occurrences tag with new value
                svg.selectAll("#occurrencesCountry")
                .data(updatedCollection)
                .on("mouseover", function(d, i){
                    // change cursor and color
                    d3.select(this).style("fill", "white").style("cursor", "pointer");
                    if(d3.select("#" + i.key + "1").text() == "off"){ 
                        d3.select("#" + i.key).style("fill", "#111921").style("cursor", "pointer");
                    }       
                })
                .on("mouseout", function(d, i) {
                    // change cursor and color
                    d3.select(this).style("fill", "white").style("cursor", "default");
                    if(d3.select("#" + i.key + "1").text() == "off"){ 
                        d3.select("#" + i.key).style("fill", "#1b2836").style("cursor", "default");
                    }
                }) 
                .on("click", function(d, i) {
                    // if country is off then turn on when user clicks    
                    if(d3.select("#" + i.key + "1").text() == "off"){ 
                        d3.select("#" + i.key + "1").attr("class", "countryOn").text(function (d) {
                            return d.key;
                        });
                        // change colors
                        d3.select("#" + i.key + "1").attr("opacity", 0.5)
                        d3.select("#" + i.key).style("fill", "#667d96");
                    }
                    // country is on so turn country off when user clicks
                    else{
                        d3.select("#" + i.key + "1").attr("class", "countryOff").text("off");
                        // change colors
                        d3.select("#" + i.key + "1").attr("opacity", 1);
                        d3.select("#" + i.key).style("fill", "#1b2836");
                    }  
                    // updating the state when user clicks occurrences tag 
                    self.handleChange();      
                })
                .text(function (d) {
                    return d.values.length + " Occurrences";
                });    
        }
    }

    // when the page first loads perform the actions below
    // loading countries filters and displaying occurrences as all occurrences found (not based on users selection)
    componentDidMount() {
        
        // this state
        const self = this;
      
        // svg height and width
        var width = d3.select(".countries-svg").node().getBoundingClientRect().width;
        var height = d3.select(".countries-svg").node().getBoundingClientRect().height;
        
        // selecting svg
        var svg = d3.select(".countries-svg").attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height);
      
  
        

        // starting a collection with filtered data and country as key 
        var collection = d3Collection.nest()
        .key(function(d) { return d.country;})
        .entries(this.context);

        // sort from greatest to least cases
        collection = collection.slice().sort((a, b) => d3.descending(a.values, b.values));

        // computing total amount of records - cases where country has under 1000 records 
        var total = 0;
        collection.filter(function(d) { 
            return (d.values.length > 1000);
        }).forEach(function(d) {
            total += d.values.length; 
        });
        
        // creating rounded background rectangle based on overall total amount
        svg.selectAll("div")
        .data(collection)
        .enter()
        // remove countries without over 1000 records (way to many countries otherwise)
        .filter(function(d) { 
            return (d.values.length > 1000);
        })
        .append("rect")
        .attr("id", function(d) { 
            return d.key;
        })
        .on("mouseover", function(d, i){
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                // change cursor on mouseover
                d3.select(this)
                .style("fill", "#111921")
                .style("cursor", "pointer");
            }
        })
        .on("mouseout", function(d, i) {
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                // change cursor on mouseout 
                d3.select(this).style("fill", "#1b2836").style("cursor", "default");
            }  
        })
        .on("click", function(d, i) {  
            // if country is off then turn on when user clicks    
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key + "1").attr("class", "countryOn").text(function (d) {
                    return d.key;
                });
                // change fill colors
                d3.select("#" + i.key + "1").attr("opacity", 0.5)
                d3.select(this).style("fill", "#667d96");
            }
            // country is on so turn country off when user clicks
            else{
                d3.select("#" + i.key + "1").attr("class", "countryOff").text("off");
                // change fill colors
                d3.select("#" + i.key + "1").attr("opacity", 1)
                d3.select(this).style("fill", "#1b2836");
            }
            // updating the state when user clicks background rectangle
            self.handleChange();                
        })
        .attr("rx", 10)								
        .attr("ry", 25)
        .style("fill", "#1b2836")
        .attr("y", function (d, i) {
            for (i>0; i < collection.length; i++) {
                return i * 25 ;
            }
        })
        .attr("x", 0)
        .attr("height", 15)
        .attr("width", function (d) {
            return width;
        })
        .attr("padding-bottom", "50px");
        
        // creating rounded foreground rectangle based on country total amount
        svg.selectAll("div")
        .data(collection)
        .enter()
        // remove countries without over 1000 records (way to many countries otherwise)
        .filter(function(d) { 
            return (d.values.length > 1000);
        })
        .append("rect")
        .attr("id", function(d) { 
            return d.key + "1";
        })
        .attr("class", "countryOff")
        .text("off")
        .attr("rx", 10)								
        .attr("ry", 25)
        .on("mouseover", function(d, i){
            // change cursor and fill color
            d3.select(this).style("cursor", "pointer");
            if(d3.select(this).text() == "off"){ 
                d3.select("#" + i.key).style("fill", "#111921").style("cursor", "pointer");
            }  
        })
        .on("mouseout", function(d, i) {
            // change cursor and fill color
            d3.select(this).style("cursor", "default");       
            if(d3.select(this).text() == "off"){ 
                d3.select("#" + i.key).style("fill", "#1b2836").style("cursor", "default");
            }
        })
        .on("click", function(d, i) {
                // if country is off then turn on when user clicks
            if(d3.select(this).text() == "off"){ 
                d3.select(this).attr("class", "countryOn").text(function (d) {
                    return d.key;
                });
                // change fill color
                d3.select("#" + i.key + "1").attr("opacity", 0.5)
                d3.select("#" + i.key).style("fill", "#667d96");
            }
            // country is on so turn country off when user clicks
            else{
                d3.select(this).attr("class", "countryOff").text("off");
                // change fill color
                d3.select("#" + i.key + "1").attr("opacity", 1)
                d3.select("#" + i.key).style("fill", "#1b2836");
            }   
            // updating the state when user clicks foreground rectangle 
            self.handleChange();
        })
        .style("fill", d => ColorPicker(d.key))
        .attr("y", function (d, i) {
            for (i>0; i < collection.length; i++) {
                return i * 25 ;
            }
        })
        .attr("x", 0)
        .attr("height", 15)
        .transition()
        .duration(5000)   
        .attr("width", function (d) {  
            return (d.values.length / total) * width;                     
        })
        .attr("padding-bottom", "50px");

        // creating country text tag
        svg.selectAll("p")
        .data(collection)
        .enter()
        // remove countries without over 1000 records (way to many countries otherwise)
        .filter(function(d) { 
            return (d.values.length > 1000 );
        })
        .append("svg:text")   
        .on("mouseover", function(d, i){
            // change cursor
            d3.select(this).style("fill", "white").style("cursor", "pointer");
            
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key)
                .style("fill", "#111921")
                .style("cursor", "pointer");
            }   
        })
        .on("mouseout", function(d, i) {
            // change cursor
            d3.select(this).style("fill", "white").style("cursor", "default");

            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key)
                .style("fill", "#1b2836")
                .style("cursor", "default");
            }
        }) 
        .on("click", function(d, i) {
                // if country is off then turn on when user clicks
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key + "1").attr("class", "countryOn").text(function (d) {
                    return d.key;
                });
                d3.select("#" + i.key + "1").attr("opacity", 0.5)
                d3.select("#" + i.key)
                .style("fill", "#667d96");
            }
            // country is on so turn country off when user clicks
            else{
                d3.select("#" + i.key + "1").attr("class", "countryOff").text("off");
                d3.select("#" + i.key + "1").attr("opacity", 1)
                d3.select("#" + i.key)
                .style("fill", "#1b2836");
            }  
            // updating the state when user clicks the country tag
            self.handleChange();
        })
        .style("font-size", "0.9vw")
        .style("font-weight", "bold")
        .style("fill", "white")
        .attr("dx", 20)
        .attr("dy", 12) 
        .attr("y", function (d, i) {
            for (i>0; i < collection.length; i++) {
                return i * 25 ;
            }
        })
        .text(function (d) {
            return d.key;
        });

        // creating occurrences text tag
        svg.selectAll("p")
        .data(collection)
        .enter()
        // remove countries without over 1000 records (way to many countries otherwise)
        .filter(function(d) { 
            return (d.values.length > 1000 );
        })
        .append("svg:text")
        .attr("id", "occurrencesCountry")
        .on("mouseover", function(d, i){
            // change cursor
            d3.select(this).style("fill", "white").style("cursor", "pointer");
            
            // change color and cursor
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key)
                .style("fill", "#111921")
                .style("cursor", "pointer");
            }
            
        })
        .on("mouseout", function(d, i) {
            // change cursor
            d3.select(this).style("fill", "white").style("cursor", "default");

            // change color and cursor
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key)
                .style("fill", "#1b2836")
                .style("cursor", "default");
            }
        }) 
        .on("click", function(d, i) {
                // if country is off then turn on when user clicks
            if(d3.select("#" + i.key + "1").text() == "off"){ 
                d3.select("#" + i.key + "1").attr("class", "countryOn").text(function (d) {
                    return d.key;
                });
                // change color
                d3.select("#" + i.key + "1").attr("opacity", 0.5)
                d3.select("#" + i.key).style("fill", "#667d96");
            }
            // country is on so turn country off when user clicks
            else{
                d3.select("#" + i.key + "1").attr("class", "countryOff").text("off");
                // change color
                d3.select("#" + i.key + "1").attr("opacity", 1)
                d3.select("#" + i.key).style("fill", "#1b2836");
            }  
            // updating the state when user clicks occurrences tag
            self.handleChange();      
        })
        .attr("text-anchor", "end")
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("font-size", "0.9vw")
        .attr("dx", width - 40)
        .attr("dy", 12) 
        .attr("y", function (d, i) {
            for (i>0; i < collection.length; i++) {
                return i * 25 ;
            }
        })
        .text(function (d) {
            return d.values.length + " Occurrences";
        });
        
    }
   

    render(){
        return (
            /* COUNTRIES FILTER */
            <div className="countries" style={{ height: "350px", width: "100%"}}>
                <Typography variant="h6" style={{ color: "white"}} gutterBottom>COUNTRIES</Typography>
                <Typography variant="subtitle1" style={{ paddingLeft: "5px", color: "#81878c"}} gutterBottom><TouchAppIcon style={{ width: "50px", paddingRight: "15px", color: "#81878c" }}/>Click to select one or more countries!</Typography>
                <hr style={{backgroundColor: "white", marginRight: "10px"}}></hr>
                <svg value={this.props.countries} onChange={this.handleChange} className="countries-svg" height="100%" width="100%"></svg>   
            </div>
        );
    }
}
CountryFilter.contextType = DataContext;

export default CountryFilter;
