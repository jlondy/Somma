import "./App.css";
import Home from "./components/landing";
import Read from "./components/howToRead";
import Data from "./components/data";
import Winery from "./components/winery";
import Wine from "./components/wine";
import Taster from "./components/taster";
import Country from "./components/country";
import React, { useEffect, useState } from "react";
import Navigation from "./components/header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import wineDataSet from "./dataset/wineDataSet.csv";
import DataContext from "./DataContext";
import Typography from "@mui/material/Typography";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Papa from "papaparse";

export default function App() {
  const [data, setData] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTasters, setSelectedTasters] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(wineDataSet);
        const csvText = await response.text();

        const { data: parsedData } = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Filter clean wines
        const filtered = parsedData.filter(
          (d) =>
            d.country &&
            d.price &&
            d.points &&
            d.taster_twitter_handle &&
            d.price <= 150 &&
            d.taster_name &&
            d.designation &&
            d.province &&
            d.winery &&
            d.variety &&
            d.title
        );

        setData(filtered);
      } catch (err) {
        console.error("Failed to load wine dataset:", err);
      }
    };

    loadData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {data ? (
          <AppContent
            data={data}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedTasters={selectedTasters}
            setSelectedTasters={setSelectedTasters}
          />
        ) : (
          <div
            className="loader"
            style={{
              marginTop: "-5%",
              position: "fixed",
              width: "100%",
              top: "50%",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" color="text.secondary">
              Loading . . .
            </Typography>
          </div>
        )}
      </Router>
    </ThemeProvider>
  );
}

function AppContent({
  data,
  selectedCountries,
  setSelectedCountries,
  selectedTasters,
  setSelectedTasters,
}) {
  const location = useLocation();

  // Routes where navigation should be hidden
  const hiddenRoutes = ["/"];
  const showNav = !hiddenRoutes.includes(location.pathname);

  return (
    <div className="container">
      {showNav && <Navigation />}

      <DataContext.Provider
        value={{
          data,
          selectedCountries,
          setSelectedCountries,
          selectedTasters,
          setSelectedTasters,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-manual" element={<Read />} />
          <Route path="/data" element={<Data />} />
          <Route path="/wine" element={<Wine />} />
          <Route path="/winery" element={<Winery />} />
          <Route path="/taster-compare" element={<Taster />} />
          <Route path="/country-compare" element={<Country />} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
}
