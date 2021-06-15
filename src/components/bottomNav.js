import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import '../styles/bottomNav.css';

class BottomNav extends Component {
    
    render() {
        return( 
            /* BOTTOM NAVIGATION ONCE A WINE GLASS IS SELECTED */
            <Paper className="bottom-navigation" elevation={24} style={{backgroundColor: "#151d1e"}}>
                <div className="link" id="wine-link">
                    <Typography component={Link} to={"/wine/" + localStorage.getItem("wine-id")} className="link-name" id="link-name-wine" gutterBottom>WINE</Typography>      
                </div>
                <div className="link" id="winery-link">
                    <Typography component={Link} to={"/winery/" + localStorage.getItem("wine-id")} className="link-name" id="link-name-winery" gutterBottom>WINERY</Typography>    
                </div>
                <div className="link" id="taster-link">
                    <Typography component={Link} to={"/taster/" + localStorage.getItem("wine-id")} className="link-name" id="link-name-taster" gutterBottom>TASTER</Typography>      
                </div>
            </Paper>
        )
    }
}
 
export default BottomNav;