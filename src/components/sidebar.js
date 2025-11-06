import React from "react";
import Typography from "@mui/material/Typography";
import MySlider from "./sliders";
import CountryFilter from "./countryFilter";
import TasterFilter from "./tasterFilter";

const SidebarFilters = ({ price, setPrice, rank, setRank }) => {
  return (
    <aside className="sidebar open">
      <Typography variant="h3" className="sidebar-title">
        Wine Data Filters
      </Typography>

      {/* Sliders */}
      <div className="sidebar-section">
        <div className="slider-block">
          <Typography variant="pb" color="text.secondary">
            PRICE
          </Typography>
          <MySlider value={price} max={150} min={0} setValue={setPrice} />
          <Typography variant="pb" color="text.secondary">
            RANK
          </Typography>
          <MySlider value={rank} max={100} min={80} setValue={setRank} />
        </div>
      </div>

      {/* Filters */}
      <div className="sidebar-section">
        <Typography variant="pb" color="text.secondary">
          FILTER BY COUNTRY
        </Typography>

        <CountryFilter />
      </div>

      <div className="sidebar-section">
        <Typography variant="pb" color="text.secondary">
          FILTER BY TASTER
        </Typography>

        <TasterFilter />
      </div>
    </aside>
  );
};

export default SidebarFilters;
