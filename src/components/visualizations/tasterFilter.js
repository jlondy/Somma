import React from "react";
import Typography from "@material-ui/core/Typography";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import wineDataSet from '../../dataset/wineDataSet.csv';
import { GetTasters, GetCountries } from '../../functions/functions';
import DataContext from '../../DataContext';

class TasterFilter extends React.Component {
    
    constructor(props){
        super(props);
        // state of tasters
        this.state = { 
            tasters: []
        };
    }

    // handle user changes to tasters
    handleChange = e => {
        this.setState({ tasters: GetTasters() }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        })
    };

    // user update occurrence
    componentDidUpdate() {
        const self = this;
      
        // tasters selection
        var countriesProp = GetCountries();
    
        // tasters appended string
        var selectedCountries = "";
        
        // if selection is not empty append string (tasters)
        if(countriesProp !== "empty" ){     
            countriesProp.each(function(d, i) {      
                selectedCountries += d.key + " "; 
            });
        }
        else{
            selectedCountries= "empty";
        }

        if(selectedCountries !== "empty"){

            // svg height and width
            var width = d3.select(".tasters-svg").node().getBoundingClientRect().width;
            var height = d3.select(".tasters-svg").node().getBoundingClientRect().height;
            
            // selecting svg
            var svg = d3.select(".tasters-svg").attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + width + " " + height);
            
        

            // starting a collection with filtered data and country as key 
            var collection = d3Collection.nest()
            .key(function(d) { return d.taster_twitter_handle;})
            .entries(this.context);
            
            // sort from greatest to least cases
            collection = collection.slice().sort((a, b) => d3.descending(a.values, b.values));
            
            var updatedCollection = [];

            collection.forEach(function(d){
                // pushing new selection to updatedCollection which stores taster as key and values as its wine occurrences
                // furthermore it filters out all values that dont have the selected countries (chosen by user)
                updatedCollection.push({"key": d.key, "values": d.values.filter(function(d){
                    if(selectedCountries !== "empty"){
                        return (selectedCountries.includes(d.country));
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
            
            // selecting all tasters rectangles
            svg.selectAll(".tasterOff, .tasterOn")
            .data(updatedCollection)
            .on("mouseover", function(d, i){
                // change cursor
                d3.select(this).style("cursor", "pointer");
                
                if(d3.select(this).text() == "off"){ 
                    // change color 
                    d3.select("#" + i.key.substring(1)).style("fill", "#111921").style("cursor", "pointer");
                }  
            })
            .on("mouseout", function(d, i) {
                    // change cursor
                d3.select(this).style("cursor", "default");
                
                if(d3.select(this).text() == "off"){ 
                        // change color
                    d3.select("#" + i.key.substring(1)).style("fill", "#1b2836").style("cursor", "default");
                }
            })
            .on("click", function(d, i) {
                // if taster is off then turn on when user clicks  
                if(d3.select(this).text() == "off"){ 
                    d3.select(this).attr("class", "tasterOn").text(function (d) {
                        return d.key;
                    });
                    // change color
                    d3.select(this).attr("opacity", 0.5);
                    d3.select("#" + i.key.substring(1)).style("fill", "#667d96");
                }
                // taster is on so turn taster off when user clicks
                else{
                    d3.select(this).attr("class", "tasterOff").text("off");
                    d3.select(this).attr("opacity", 1);
                    d3.select("#" + i.key.substring(1)).style("fill", "#1b2836");
                } 
                // updating the state when user clicks foregorund rectangle
                self.handleChange();
            })
            .transition()
            .duration(5000)
            .attr("width", function (d) {        
                return  (d.values.length / total) * width;                          
            });

                // updating occurrences tag with new value
            svg.selectAll("#occurrencesTaster")
            .data(updatedCollection)
            .on("mouseover", function(d, i){
                // change cursor and color
                d3.select(this).style("fill", "white").style("cursor", "pointer");
                if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                    d3.select("#" + i.key.substring(1)).style("fill", "#111921").style("cursor", "pointer");
                }
            })
            .on("mouseout", function(d, i) {
                // change cursor and color
                d3.select(this).style("fill", "white").style("cursor", "default");
                if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                    d3.select("#" + i.key.substring(1))
                    .style("fill", "#1b2836")
                    .style("cursor", "default");
                }
            }) 
            .on("click", function(d, i) {
                // if taster is off then turn on when user clicks   
                if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                    d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOn").text(function (d) {
                        return d.key;
                    });
                    d3.select("#" + i.key.substring(1) + "1").attr("opacity", 0.5)
                    d3.select("#" + i.key.substring(1)).style("fill", "#667d96");
                }
                    // taster is on so turn taster off when user clicks
                else{
                    d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOff").text("off");
                    // change colors
                    d3.select("#" + i.key.substring(1) + "1").attr("opacity", 1)
                    d3.select("#" + i.key.substring(1)).style("fill", "#1b2836");
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
    // loading taster filters and displaying occurrences as all occurrences found (not based on users selection)
    componentDidMount() {
        const self = this;
        
        //svg height and width
        var width = d3.select(".tasters-svg").node().getBoundingClientRect().width;
        var height = d3.select(".tasters-svg").node().getBoundingClientRect().height;

        // selecting svg
        var svg = d3.select(".tasters-svg").attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height);
        

            
        // starting a collection with filtered data and tasters twitter name as key 
        var collection = d3Collection.nest()
        .key(function(d) { return d.taster_twitter_handle;})
        .entries(this.context);
        
        // sort from greatest to least cases
        collection = collection.slice().sort((a, b) => d3.descending(a.values, b.values));
        
        // computing total amount of records - cases where twitter name is empty
        var total = 0;
        collection.filter(function(d) { 
            return ( d.key != "");
        }).forEach(function(d) {
            total += d.values.length; 
        });
        
        // creating rounded background rectangle based on overall total amount
        svg.selectAll("div")
        .data(collection)
        .enter()
        .append("rect")
        .attr("id", function(d) { 
            return d.key.substring(1);
        })
        .filter(function(d) { 
            return (d.key != "");
        })
        .on("mouseover", function(d, i){
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                    // change cursor on mouseover
                d3.select(this) .style("fill", "#111921").style("cursor", "pointer");
            }
        })
        .on("mouseout", function(d, i) {
            // change cursor on mouseout
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select(this).style("fill", "#1b2836").style("cursor", "default");
            }  
        })
        .on("click", function(d, i) {  
            // if taster is off then turn on when user clicks 
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOn").text(function (d) {
                    return d.key.substring(1);
                });
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 0.5)
                d3.select(this).style("fill", "#667d96");
            }
            // taster is on so turn taster off when user clicks
            else{
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOff").text("off");
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 1)
                d3.select(this).style("fill", "#1b2836");
            }
            // updating the state when user clicks occurrences tag  
            self.handleChange();                
        })
        .attr("rx", 10)								
        .attr("ry", 25)
        .style("fill", "#1b2836")
        .attr("class", "bar")
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
        
        // creating rounded foreground rectangle based on taster twitter name total amount
        svg.selectAll("div")
        .data(collection)
        .enter()
        .append("rect")
        .attr("id", function(d) { 
            return d.key.substring(1) + "1";
        })
        .attr("class", "tasterOff")
        .filter(function(d) { 
            return (d.key != "");
        })
        .text("off")
        .attr("rx", 10)								
        .attr("ry", 25)
        .on("mouseover", function(d, i){
                // change cursor on mouseover
            d3.select(this).style("cursor", "pointer");
            if(d3.select(this).text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#111921").style("cursor", "pointer");
            }  
        })
        .on("mouseout", function(d, i) {
            // change cursor on mouseout
            d3.select(this).style("cursor", "default");
            
            if(d3.select(this).text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836").style("cursor", "default");
            }
        })
        
        .on("click", function(d, i) {
            // if taster is off then turn on when user clicks
            if(d3.select(this).text() == "off"){ 
                d3.select(this).attr("class", "tasterOn").text(function (d) {
                    return d.key.substring(1);
                });
                    // change fill colors
                d3.select(this).attr("opacity", 0.5);
                d3.select("#" + i.key.substring(1)).style("fill", "#667d96");
            }
            // taster is on so turn taster off when user clicks
            else{
                d3.select(this).attr("class", "tasterOff").text("off");
                // change fill colors
                d3.select(this).attr("opacity", 1);
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836");
            } 
            // updating the state when user clicks occurrences tag     
            self.handleChange();
        })
        .style("fill", "rgb(148, 0, 211)")
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

        // creating taster twitter name text tag
        svg.selectAll("p")
        .data(collection)
        .enter()
        .append("svg:text")
        .filter(function(d) { 
            return (d.key != "");
        })
        .on("mouseover", function(d, i){
            // change cursor on mouseover
            d3.select(this).style("fill", "white").style("cursor", "pointer");
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#111921").style("cursor", "pointer");
            }
        })
        .on("mouseout", function(d, i) {
            // change cursor on mouseout
            d3.select(this).style("fill", "white").style("cursor", "default");
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836").style("cursor", "default");
            }
        }) 
        .on("click", function(d, i) {
            // if taster is off then turn on when user clicks
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOn").text(function (d) {
                    return d.key.substring(1);
                });
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 0.5)
                d3.select("#" + i.key.substring(1)).style("fill", "#667d96");
            }
            // taster is on so turn taster off when user clicks
            else{
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOff").text("off");
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 1)
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836");
            } 
            // updating the state when user clicks occurrences tag     
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

        // creating occurences text tag
        svg.selectAll("p")
        .data(collection)
        .enter()
        .append("svg:text")
        .attr("id", "occurrencesTaster")
        .filter(function(d) { 
            return (d.key != "");
        })
        .on("mouseover", function(d, i){
                // change cursor on mouseover
            d3.select(this).style("fill", "white").style("cursor", "pointer");  
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#111921").style("cursor", "pointer");
            }      
        })
        .on("mouseout", function(d, i) {
            // change cursor on mouseout
            d3.select(this).style("fill", "white").style("cursor", "default");
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836").style("cursor", "default");
            }
        }) 
        .on("click", function(d, i) {
                // if taster is off then turn on when user clicks
            if(d3.select("#" + i.key.substring(1) + "1").text() == "off"){ 
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOn").text(function (d) {
                    return d.key.substring(1);
                });
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 0.5)
                d3.select("#" + i.key.substring(1)).style("fill", "#667d96");
            }
            // taster is on so turn taster off when user clicks
            else{
                d3.select("#" + i.key.substring(1) + "1").attr("class", "tasterOff").text("off");
                // change fill colors
                d3.select("#" + i.key.substring(1) + "1").attr("opacity", 1)
                d3.select("#" + i.key.substring(1)).style("fill", "#1b2836");
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
            return d.values.length + " Occurences";
        });
    }

    render(){
        return (
            <div className="tasters" style={{ height: "400px", width: "100%"}}>
                <Typography variant="h6" style={{color: "white"}} gutterBottom>TASTERS</Typography>
                <Typography variant="subtitle1" style={{ paddingLeft: "5px", color: "#81878c"}} gutterBottom><TouchAppIcon style={{ width: "50px", paddingRight: "15px", color: "#81878c" }}/>Click to select one or more tasters!</Typography>
                <hr style={{ backgroundColor: "white", marginRight: "10px"}}></hr>
                <svg value={this.props.tasters} onChange={this.handleChange} className="tasters-svg" height="115%" width="100%"></svg>      
            </div>
        );
    }
}
TasterFilter.contextType = DataContext;

export default TasterFilter;