import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DataContext from "../DataContext";
import BottomNav from "./bottomNav";

const CountryCompare = () => {
  const { data } = useContext(DataContext);
  const [selected, setSelected] = useState([]);

  // Collect unique country names
  const countries = useMemo(() => {
    if (!data?.length) return [];
    const names = [...new Set(data.map((d) => d.country).filter(Boolean))];
    return names.sort();
  }, [data]);

  // Compute country stats
  const computeStats = (country) => {
    const wines = data.filter((d) => d.country === country);
    if (!wines.length) return null;

    const avgRank =
      wines.reduce((s, d) => s + Number(d.points || 0), 0) / wines.length;
    const prices = wines.map((d) => Number(d.price)).filter((p) => !isNaN(p));
    const highestPrice = Math.max(...prices);
    const highestRank = Math.max(...wines.map((d) => Number(d.points)));

    const varieties = wines.map((d) => d.variety).filter(Boolean);
    const commonVariety = varieties.length
      ? varieties
          .sort(
            (a, b) =>
              varieties.filter((v) => v === a).length -
              varieties.filter((v) => v === b).length
          )
          .pop()
      : "N/A";

    const wineries = new Set(wines.map((d) => d.winery)).size;
    const valueRatio =
      wines.reduce((s, d) => s + d.points / d.price, 0) / wines.length;

    const median = (arr) => {
      if (!arr.length) return 0;
      const sorted = arr.slice().sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
    };

    return {
      count: wines.length,
      avgRank,
      highestPrice,
      highestRank,
      commonVariety,
      wineryCount: wineries,
      valueRatio,
      medianPrice: median(prices),
    };
  };

  // Handle selection
  const handleSelect = (country) => {
    setSelected((prev) => {
      if (prev.includes(country)) {
        return prev.filter((n) => n !== country);
      }
      if (prev.length >= 2) return [country];
      return [...prev, country];
    });
  };

  const [c1, c2] = selected;
  const stats1 = c1 ? computeStats(c1) : null;
  const stats2 = c2 ? computeStats(c2) : null;

  const color1 = "#CC2B52";
  const color2 = "#E06B80";

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ mt: "64px", px: 4, flex: 1, borderTop: "1px solid #222" }}
      >
        {/* Left column: Country list */}
        <Grid item xs={3} sx={{ borderRight: "1px solid #222" }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Compare Countries
          </Typography>
          <Typography variant="p" color="text.secondary">
            Select any two countries to compare
          </Typography>

          <div
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
              paddingRight: "6px",
              marginTop: "20px",
            }}
          >
            {countries.map((country) => (
              <div
                key={country}
                onClick={() => handleSelect(country)}
                style={{
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  color:
                    selected[0] === country
                      ? color1
                      : selected[1] === country
                      ? color2
                      : "white",
                  fontWeight: selected.includes(country) ? "bold" : "normal",
                  transition: "color 0.2s ease",
                }}
              >
                <Typography variant="p">{country}</Typography>
              </div>
            ))}
          </div>
        </Grid>

        {/* Right: Comparison Visualization + Stats */}
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {c1 && c2 && stats1 && stats2 && (
            <>
              {/* Stats grid */}
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {[
                  {
                    label: "Total Wines Rated",
                    a: stats1.count,
                    b: stats2.count,
                  },
                  {
                    label: "Average Rank Awarded",
                    a: stats1.avgRank.toFixed(1),
                    b: stats2.avgRank.toFixed(1),
                  },
                  {
                    label: "Median Price",
                    a: `$${stats1.medianPrice.toFixed(0)}`,
                    b: `$${stats2.medianPrice.toFixed(0)}`,
                  },
                  {
                    label: "Most Common Variety",
                    a: stats1.commonVariety,
                    b: stats2.commonVariety,
                  },
                  {
                    label: "Value Ratio (Points / Price)",
                    a: stats1.valueRatio.toFixed(2),
                    b: stats2.valueRatio.toFixed(2),
                  },
                  {
                    label: "Distinct Wineries Represented",
                    a: stats1.wineryCount,
                    b: stats2.wineryCount,
                  },
                  {
                    label: "Highest Priced Wine",
                    a: `$${stats1.highestPrice.toFixed(0)}`,
                    b: `$${stats2.highestPrice.toFixed(0)}`,
                  },
                  {
                    label: "Highest Ranked Wine",
                    a: `+${stats1.highestRank.toFixed(0)}`,
                    b: `+${stats2.highestRank.toFixed(0)}`,
                  },
                ].map((stat, i) => (
                  <Grid item xs={6} key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          background: "#161616aa",
                          p: 2,
                          border: "1px solid #222",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h4" gutterBottom>
                          {stat.label}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="p"
                            sx={{ color: color1, fontWeight: 700 }}
                          >
                            {stat.a}
                          </Typography>
                          <Typography variant="p" color="text.secondary">
                            |
                          </Typography>
                          <Typography
                            variant="p"
                            sx={{ color: color2, fontWeight: 700 }}
                          >
                            {stat.b}
                          </Typography>
                        </div>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      <BottomNav />
    </div>
  );
};

export default CountryCompare;
