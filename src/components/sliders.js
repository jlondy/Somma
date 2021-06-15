import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

// SLIDER STYLES
const SommaSlider = withStyles({
	root: {
		height: 16,
		color: 'rgb(148, 0, 211)'
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: 'white',
		marginTop: -4,
		marginLeft: -8
	},
	valueLabel: {
		left: 'calc(-50% + 8px)'
	},
	track: {
		height: 16,
		borderRadius: 16
	},
	rail: {
		height: 16,
		borderRadius: 16
	}
})(Slider);
// values from parent (data.js)
const MySlider = ({ label, value, setValue, max, min }) => {
	return (
		<div style={{ width: '90%' }}>
			<Typography variant="h6" style={{ color: 'white' }} gutterBottom>
				{label}
			</Typography>
			{/* Slider Component */}
			<SommaSlider
				valueLabelDisplay="on"
				defaultValue={0}
				value={value}
				min={min}
				max={max}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			/>
		</div>
	);
};
export default MySlider;
