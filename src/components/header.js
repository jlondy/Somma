import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "unset",
        backgroundImage: "unset",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Button component={Link} to="/" color="inherit">
          <Typography variant="h1">SOMMA</Typography>
        </Button>

        {/* Navigation buttons */}
        <div>
          <Button component={Link} to="/data" color="inherit">
            <Typography variant="pb">DATA</Typography>
          </Button>
          <Button component={Link} to="/user-manual" color="inherit">
            <Typography variant="pb">MANUAL</Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
