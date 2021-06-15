import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import wineDataSet from '../../dataset/wineDataSet.csv';
import Typography from '@material-ui/core/Typography';
import { GetScaleY, GetLineData, GetCountries, GetTasters } from '../../functions/functions';
import '../../styles/lineCharts.css';
import DataContext from '../../DataContext';

class LineChart extends React.Component {
	constructor(props) {
		super(props);
		// values from parent
		this.state = {
			values: this.props.valuesFromParent
		};
	}

	// on user update
	componentDidUpdate(prevProps) {
		// if previous props have changed
		if (prevProps.valuesFromParent !== this.props.valuesFromParent) {
			// tasters and countries selection
			var countriesProp = GetCountries();
			var tastersProp = GetTasters();

			// tasters and countries appended string
			var selectedCountries = '';
			var selectedTasters = '';

			// if selection is not empty append string (countries)
			if (countriesProp !== 'empty') {
				countriesProp.each(function(d, i) {
					selectedCountries += d.key + ' ';
				});
			} else {
				selectedCountries = 'empty';
			}

			// if selection is not empty append string (tasters)
			if (tastersProp !== 'empty') {
				tastersProp.each(function(d, i) {
					selectedTasters += d.key + ' ';
				});
			} else {
				selectedTasters = 'empty';
			}

			// svg height and width components
			var width1 = d3.select('.line-price').node().getBoundingClientRect().width;
			var height1 = d3.select('.line-price').node().getBoundingClientRect().height;

			// selecting svg
			var svg1 = d3
				.select('.line-price')
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 ' + width1 + ' ' + height1);

			svg1.selectAll('*').remove();

			// svg height and width components
			var width2 = d3.select('.line-rank').node().getBoundingClientRect().width;
			var height2 = d3.select('.line-rank').node().getBoundingClientRect().height;

			// selecting svg
			var svg2 = d3
				.select('.line-rank')
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 ' + width2 + ' ' + height2);
			svg2.selectAll('*').remove();

			// slider values
			var selectedPrice = this.props.valuesFromParent[0];
			var selectedRank = this.props.valuesFromParent[1];

			var priceFiltering = this.context
				.filter(function(d) {
					// filter out all countries that arent included in string
					if (selectedCountries !== 'empty') {
						return selectedCountries.includes(d.country);
					} else {
						return;
					}
				})
				.filter(function(d) {
					// filter out all tasters that arent included in string
					if (selectedTasters !== 'empty') {
						return selectedTasters.includes(d.taster_twitter_handle);
					} else {
						return;
					}
				})
				.filter(function(d) {
					// filter for price and rank
					return d.points == selectedRank;
				});

			var rankFiltering = this.context
				.filter(function(d) {
					// filter out all countries that arent included in string
					if (selectedCountries !== 'empty') {
						return selectedCountries.includes(d.country);
					} else {
						return;
					}
				})
				.filter(function(d) {
					// filter out all tasters that arent included in string
					if (selectedTasters !== 'empty') {
						return selectedTasters.includes(d.taster_twitter_handle);
					} else {
						return;
					}
				})
				.filter(function(d) {
					// filter for price and rank
					return d.price == selectedPrice;
				});

			// creating a selection of filtered data from the price
			var collection1 = d3Collection
				.nest()
				.key(function(d) {
					return d.price;
				})
				.entries(priceFiltering);
			// sort 0 to 150
			collection1 = collection1.slice().sort((a, b) => d3.ascending(parseInt(a.key), parseInt(b.key)));

			// creating a selection of filtered data from the rank
			var collection2 = d3Collection
				.nest()
				.key(function(d) {
					return d.points;
				})
				.entries(rankFiltering);
			// sort 0 to 100
			collection2 = collection2.slice().sort((a, b) => d3.ascending(parseInt(a.key), parseInt(b.key)));

			if (collection1.length != 0 && collection2.length != 0) {
				// calculating and getting full line data for price and rank
				var priceLineData = GetLineData(collection1, 'Price');
				var rankLineData = GetLineData(collection2, 'Rank');

				// creating x scale for price using 150 as max and width1 as the range it can go to
				var x1 = d3.scaleLinear().domain([ 0, 150 ]).range([ 0, width1 ]);

				// creating y scale for price using its calculated highest wine amount and height1
				var y1 = d3.scaleLinear().domain([ 0, GetScaleY(collection1) ]).range([ height1, 0 ]);

				// creating x scale for rank using 100 as max and width2 as the range it can go to
				var x2 = d3.scaleLinear().domain([ 0, 100 ]).range([ 0, width2 ]);

				// creating y scale for rank using its calculated highest wine amount and height2
				var y2 = d3.scaleLinear().domain([ 0, GetScaleY(collection2) ]).range([ height2, 0 ]);

				// creating price path
				var path1 = svg1
					.append('path')
					.datum(priceLineData)
					.attr('fill', 'none')
					.attr('stroke', 'rgb(148, 0, 211)')
					.attr('stroke-width', 3)
					// creating a path at the bottom of the container
					.attr(
						'd',
						d3
							.line()
							.curve(d3.curveBasis)
							.x(function(d) {
								return x1(d[0]);
							})
							.y(function(d) {
								return height1;
							})
					)
					// starting transition
					.transition()
					.duration(5000)
					// moving the path is calculated position
					.attr(
						'd',
						d3
							.line()
							.curve(d3.curveBasis)
							.x(function(d) {
								return x1(d[0]);
							})
							.y(function(d) {
								return y1(d[1]);
							})
					);

				// creating rank path
				var path2 = svg2
					.append('path')
					.datum(rankLineData)
					.attr('fill', 'none')
					.attr('stroke', 'rgb(148, 0, 211)')
					.attr('stroke-width', 3)
					// creating a path at the bottom of the container
					.attr(
						'd',
						d3
							.line()
							.curve(d3.curveBasis)
							.x(function(d) {
								return x2(d[0]);
							})
							.y(function(d) {
								return height2;
							})
					)
					// starting transition
					.transition()
					.duration(5000)
					// moving the path is calculated position
					.attr(
						'd',
						d3
							.line()
							.curve(d3.curveBasis)
							.x(function(d) {
								return x2(d[0]);
							})
							.y(function(d) {
								return y2(d[1]);
							})
					);

				// finding position of the x mouse position
				var bisect = d3.bisector(function(d) {
					return d[0];
				}).left;

				// creating a line tooltip for price (invisible)
				var lineToolTip1 = svg1
					.append('g')
					.append('line')
					.style('stroke-width', 2)
					.style('stroke', 'white')
					.style('fill', 'none')
					.style('opacity', 0);

				// Create the text that travels along the path for price (invisible)
				var textToolTip1 = svg1
					.append('g')
					.append('text')
					.style('opacity', 0)
					.attr('text-anchor', 'left')
					.attr('font-weight', 'bold')
					.attr('fill', 'white')
					.attr('alignment-baseline', 'middle');

				// creating a line tooltip for rank (invisible)
				var lineToolTip2 = svg2
					.append('g')
					.append('line')
					.style('stroke-width', 2)
					.style('stroke', 'white')
					.style('fill', 'none')
					.style('opacity', 0);

				// Create the text that travels along the path for rank (invisible)
				var textToolTip2 = svg2
					.append('g')
					.append('text')
					.style('opacity', 0)
					.attr('text-anchor', 'left')
					.attr('font-weight', 'bold')
					.attr('fill', 'white')
					.attr('alignment-baseline', 'middle');

				// creating a rectangle to cover the whole container of price (used to calculate mouse position)
				svg1
					.append('rect')
					.style('fill', 'none')
					.style('pointer-events', 'all')
					.attr('width', width1)
					.attr('height', height1)
					// make price tooltips visible
					.on('mouseover', function() {
						lineToolTip1.style('opacity', 1);
						textToolTip1.style('opacity', 1);
					})
					.on('mousemove', function(event) {
						// calculating x mouse position
						var userXPosition = x1.invert(d3.pointer(event)[0]);

						// finding the index of priceLineData where userXposition matches
						var linePosition = bisect(priceLineData, userXPosition, 1);

						// grabbing the information from priceLineData using the index from above
						var selectedData = priceLineData[linePosition];

						// moving line tooltip based on mouse position
						lineToolTip1
							.attr('x1', d3.pointer(event)[0])
							.attr('y1', 0)
							.attr('x2', d3.pointer(event)[0])
							.attr('y2', height1);

						// if selected data is set
						if (selectedData != null || selectedData != undefined) {
							// making text tooltip visible
							textToolTip1
								.html(function() {
									if (selectedData[1] != null) {
										// show wine cases if not null
										return 'Price: ' + selectedData[0] + '  -  ' + 'Wines: ' + selectedData[1];
									} else {
										// show 0 if null
										return 'Price: ' + selectedData[0] + '  -  ' + 'Wines: 0';
									}
								})
								// flipping the tooltip position based on mouse x position
								.attr('x', function() {
									// position right of mouse
									if (d3.pointer(event)[0] <= width1 / 2) {
										return d3.pointer(event)[0] + 15;
									} else {
										// position left of mouse
										return d3.pointer(event)[0] - 150;
									}
								})
								.attr('y', 10);
						}
					})
					// make tooltips invisible on mouseout
					.on('mouseout', function() {
						lineToolTip1.style('opacity', 0);
						textToolTip1.style('opacity', 0);
					});

				// creating a rectangle to cover the whole container of rank (used to calculate mouse position)
				svg2
					.append('rect')
					.style('fill', 'none')
					.style('pointer-events', 'all')
					.attr('width', width2)
					.attr('height', height2)
					// make rank tooltips visible
					.on('mouseover', function() {
						lineToolTip2.style('opacity', 1);
						textToolTip2.style('opacity', 1);
					})
					.on('mousemove', function(event) {
						// calculating x mouse position
						var userXPosition = x1.invert(d3.pointer(event)[0] / 1.5);

						// finding the index of priceLineData where userXposition matches
						var linePosition = bisect(rankLineData, userXPosition, 1);

						// grabbing the information from priceLineData using the index from above
						var selectedData = rankLineData[linePosition];

						// moving line tooltip based on mouse position
						lineToolTip2
							.attr('x1', d3.pointer(event)[0])
							.attr('y1', 0)
							.attr('x2', d3.pointer(event)[0])
							.attr('y2', height2);

						// if selected data is set
						if (selectedData != null || selectedData != undefined) {
							// making text tooltip visible
							textToolTip2
								.html(function() {
									if (selectedData[1] != null) {
										// show wine cases if not null
										return 'Rank: ' + selectedData[0] + '  -  ' + 'Wines: ' + selectedData[1];
									} else {
										// show 0 if null
										return 'Rank: ' + selectedData[0] + '  -  ' + 'Wines: 0';
									}
								})
								// flipping the tooltip position based on mouse x position
								.attr('x', function() {
									// position right of mouse
									if (d3.pointer(event)[0] <= width2 / 2) {
										return d3.pointer(event)[0] + 15;
									} else {
										// position left of mouse
										return d3.pointer(event)[0] - 150;
									}
								})
								.attr('y', 10);
						}
					})
					// make tooltips invisible on mouseout
					.on('mouseout', function() {
						lineToolTip2.style('opacity', 0);
						textToolTip2.style('opacity', 0);
					});
			}
		}
	}

	render() {
		return (
			<div className="line-div">
				<div style={{ height: '100%', width: '100%' }}>
					<Typography variant="h6" style={{ color: 'white' }} gutterBottom>
						PRICE AMOUNT
					</Typography>
					<Typography variant="subtitle1" style={{ color: '#81878c' }} gutterBottom>
						Apply filters then hover to view the amount of wine cases based on price!
					</Typography>
					{/* PRICE LINE SVG */}
					<svg style={{ height: '50%', width: '100%', float: 'left' }} className="line-price" />
				</div>
				<div style={{ height: '100%', width: '100%', marginTop: '2%' }}>
					<Typography variant="h6" style={{ color: 'white' }} gutterBottom>
						RANK AMOUNT
					</Typography>
					<Typography variant="subtitle1" style={{ color: '#81878c' }} gutterBottom>
						Apply filters then hover to view the amount of wine cases based on rank!
					</Typography>
					{/* RANK LINE SVG */}
					<svg style={{ height: '50%', width: '100%', float: 'left' }} className="line-rank" />
				</div>
			</div>
		);
	}
}
LineChart.contextType = DataContext;

export default LineChart;
