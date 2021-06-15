import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import '../styles/header.css';

class Navigation extends Component {
    // transparent start state
    state = {
        backgroundColor: "transparent"
    }
    
    // change background based on position
    scrollingListener = e => {
        if (window.scrollY >= 25) {
            this.setState({backgroundColor: "rgb(148,0,211)"})
          
        } else {
            this.setState({backgroundColor: "transparent"})
        }
    }
    
    // Event listener gets called whenever user scrolls
    componentDidMount() {
        window.addEventListener("scroll", this.scrollingListener)
    }
    
    render() {
        return( 
            // HEADER COMPONENTS
            <React.Fragment>
                <AppBar position="fixed" style={{backgroundColor: this.state.backgroundColor}} elevation={0}>
                    <Toolbar>
                        <div style={{flexGrow: "3", borderRadius: "16px"}}>         
                            <Button color="inherit" component={Link} to="/">
                                <Typography variant="h4">SOMMA</Typography>
                            </Button>  
                        </div>
                        <div>
                            <Button color="inherit" component={Link} to="/how-to-read" style={{marginRight: "16px", borderRadius: "16px", color: "black", backgroundColor: "rgb(148,0,211)"}}>How to Read</Button>
                            <Button color="inherit" component={Link} to="/data" style={{borderRadius: "16px", color: "black", backgroundColor: "rgb(148,0,211)"}}>View Data</Button>
                        </div>
                    </Toolbar>
                </AppBar>  
            </React.Fragment>
        )
    }
}
 
export default Navigation;