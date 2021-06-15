import * as d3 from 'd3';
import wineDataSet from '../dataset/wineDataSet.csv';
import * as d3Collection from 'd3-collection';

// giving each country a color for users to easily distiguish between
export function ColorPicker(country) {
	if (country == 'US' || country == 'United States of America') {
		return '#8e58f1';
	} else if (country == 'France') {
		return '#ca69e5';
	} else if (country == 'Italy') {
		return '#eb4a8e';
	} else if (country == 'Portugal') {
		return '#ec4c4b';
	} else if (country == 'Spain') {
		return '#e98a57';
	} else if (country == 'Germany') {
		return '#e1bd33';
	} else if (country == 'Argentina') {
		return '#b5e052';
	} else if (country == 'Chile') {
		return '#5fdd42';
	} else if (country == 'Australia') {
		return '#4ddd75';
	} else if (country == 'Austria') {
		return '#35cac3';
	} else if (country == 'South Africa') {
		return '#297cd6';
	} else if (country == 'New Zealand') {
		return '#3647ef';
	} else if (country == 'Israel') {
		return '#5306c0';
	} else if (country == 'Hungary') {
		return '#c307cf';
	} else if (country == 'Greece') {
		return '#cf1643';
	} else if (country == 'Romania') {
		return '#da4f07';
	} else if (country == 'Mexico') {
		return '#c0a80a';
	} else if (country == 'Canada') {
		return '#57b710';
	} else if (country == 'Turkey') {
		return '#0fb851';
	} else {
		return 'black';
	}
}

// grabbing all countries that are on (selected by user)
export function GetCountries() {
	var countries = d3.selectAll('.countryOn');
	var length = countries._groups[0].length;

	// return selection if countries length is > 0
	if (length > 0) {
		return countries;
	} else {
		// return empty
		return 'empty';
	}
}

// grabbing all tasters that are on (selected by user)
export function GetTasters() {
	var tasters = d3.selectAll('.tasterOn');
	var length = tasters._groups[0].length;

	// return selection if tasters length is > 0
	if (length > 0) {
		return tasters;
	} else {
		// return empty
		return 'empty';
	}
}

// Creating an array of the amount of wines for all prices and ranks
export function GetLineData(collection, type) {
	// line data array
	var lineData = [];
	// checking if i need to a a null entry
	var resettor = false;
	// grabbing last value
	var length = collection.length - 1;
	var max = 0;
	var min = 0;
	if (type == 'Price') {
		max = 150;
		min = 0;
	} else if (type == 'Rank') {
		max = 100;
		min = 80;
	}
	// looping through max
	for (var i = 0; i <= max; i++) {
		// looping through selection (made by user)
		for (var j = 0; j < collection.length; j++) {
			if (parseInt(collection[j].key) == i) {
				// key is either the price or rank number
				// pushing to an array for each i position the amount of wines
				lineData.push([ i, collection[j].values.length ]);
				resettor = false;
				break;
			} else {
				// i did not match in the collect
				// meaning there are no wines for a particular price or rank
				// turn resettor on
				resettor = true;
			}
		}
		// push null for that position that did not match
		if (resettor) {
			lineData.push([ i, null ]);
			resettor = false;
		}
	}
	// return an array of wine amounts based on i position (0 to 100 for rank and 0 to 150 for price)
	return lineData;
}

// finding the largest value (amount of wines) in the collection
export function GetScaleY(collection) {
	// setting largest to first value
	var max = collection[0].values.length;
	// looping through collection
	for (var i = 1; i < collection.length; i++) {
		// if next value is greater then update
		if (collection[i].values.length > max) {
			max = collection[i].values.length;
		}
	}
	// return largest amount of wines use to make y scale
	return max;
}
