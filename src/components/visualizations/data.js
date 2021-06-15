import '../../styles/data.css';
import MySlider from '../sliders';
import Container from '@material-ui/core/Container';
import React, { useContext, useEffect } from 'react';
import Chart from './chart';
import CountryFilter from './countryFilter';
import TasterFilter from './tasterFilter';
import LineChart from './lineChart';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TuneIcon from '@material-ui/icons/Tune';

function Data() {
	// Price
	const [ valueOne, setValueOne ] = React.useState(0);
	// Rank
	const [ valueTwo, setValueTwo ] = React.useState(0);
	// Countries
	const [ valueThree, setValueThree ] = React.useState('');
	// Tasters
	const [ valueFour, setValueFour ] = React.useState('');
	// Send Data
	const [ valueFive, setValueFive ] = React.useState([]);
	// missing fields
	const [ valueSix, setValueSix ] = React.useState('');

	// handling changes users make to countries filter
	function handleCountryChange(countrySelection) {
		setValueThree(countrySelection);
	}
	// handling changes users make to tasters filter
	function handleTasterChange(tasterSelection) {
		setValueFour(tasterSelection);
	}
	// handling changes all chnages when "Apply Filter" button is clicked
	function handleChartInformation() {
		// telling chart component to update if all filters are set
		if (
			tasters.length !== 0 &&
			tasters.tasters !== 'empty' &&
			countries.length !== 0 &&
			countries.countries !== 'empty' &&
			price !== '' &&
			price !== 0 &&
			rank !== '' &&
			rank !== 0
		) {
			// setting values
			setValueFive([ price, rank, countries, tasters ]);
			setValueSix('');
		} else {
			// telling user filters are missing
			setValueSix('Missing Filters');
		}
	}
	// setting constants from user updates then passing to children components
	const price = valueOne;
	const rank = valueTwo;
	const countries = valueThree;
	const tasters = valueFour;
	const sendData = valueFive;
	const error = valueSix;

	return (
		<Container className="bodyComponent">
			<div className="lines">
				{/* LINECHART COMPONENT - passing sendData for it to work with */}
				<LineChart valuesFromParent={sendData} />
			</div>
			<div className="column-left">
				<Typography
					className="total"
					variant="h5"
					style={{ width: '75%', float: 'left', color: 'white' }}
					gutterBottom
				>
					APPLY ALL FILTERS TO FETCH A SELECTION OF WINES!
				</Typography>
				<Typography
					className="error"
					variant="h6"
					style={{ width: '25%', float: 'right', color: 'red' }}
					gutterBottom
				>
					{error}
				</Typography>
				{/* CHART COMPONENT - passing sendData for it to work with */}
				<Chart valuesFromParent={sendData} />
				<Typography
					className="wine-title"
					variant="subtitle1"
					style={{ width: '100%', float: 'left' }}
					gutterBottom
				/>
				<Typography
					className="country-title"
					variant="subtitle1"
					style={{ width: '100%', float: 'left' }}
					gutterBottom
				/>
			</div>
			<div className="column-right">
				<div style={{ height: '500px' }}>
					<div>
						<Typography
							className="filters"
							variant="h5"
							style={{ width: '78%', float: 'left', color: 'rgb(148, 0, 211)' }}
							gutterBottom
						>
							SELECTION FILTERS
						</Typography>
						<Button
							onClick={handleChartInformation}
							color="inherit"
							style={{ borderRadius: '16px', color: 'black', backgroundColor: 'rgb(148,0,211)' }}
						>
							Apply Filters
						</Button>
						<hr style={{ backgroundColor: 'white' }} />
					</div>
					<Typography variant="h6" style={{ paddingTop: '5%', color: 'white' }} gutterBottom>
						SLIDERS
					</Typography>
					<Typography variant="subtitle1" style={{ paddingLeft: '5px', color: '#81878c' }} gutterBottom>
						<TuneIcon style={{ width: '50px', paddingRight: '15px', color: '#81878c' }} />Slide to select
						the price and rank!
					</Typography>
					<hr style={{ backgroundColor: 'white' }} />
					<div
						className="slider-one"
						style={{
							textAlign: 'center',
							paddingLeft: '25px',
							paddingTop: '5%',
							paddingBottom: '5%',
							width: '100%'
						}}
					>
						{/* SLIDER COMPONENT - passing price for it to work with */}
						<MySlider
							className="cost-slider"
							label="PRICE"
							value={valueOne}
							max={150}
							min={0}
							setValue={setValueOne}
						/>
					</div>
					<div
						className="slider-two"
						style={{ textAlign: 'center', paddingLeft: '25px', paddingBottom: '5%', width: '100%' }}
					>
						{/* SLIDER COMPONENT - passing rank for it to work with */}
						<MySlider
							className="rank-slider"
							label="RANK"
							value={valueTwo}
							max={100}
							min={80}
							setValue={setValueTwo}
						/>
					</div>
					{/* COUNTRY COMPONENT - passing countries selection for it to work with */}
					<CountryFilter value={valueThree} onChange={handleCountryChange} />
					{/* TASTER COMPONENT - passing tasters selection for it to work with */}
					<TasterFilter value={valueFour} onChange={handleTasterChange} />
				</div>
			</div>
		</Container>
	);
}

export default Data;
