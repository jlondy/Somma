import React from "react";
import { Link, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../styles/bottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  if (!id) return null; // hide nav if no wine is selected

  const links = [
    { label: "WINE", to: `/wine?id=${id}` },
    { label: "WINERY", to: `/winery?id=${id}` },
    { label: "TASTER", to: `/taster-compare?id=${id}` },
    { label: "COUNTRY", to: `/country-compare?id=${id}` },
  ];

  return (
    <div>
      <div className="bottom-navigation">
        {links.map((link) => (
          <Typography
            key={link.label}
            component={Link}
            to={link.to}
            className="link-name"
          >
            {link.label}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
