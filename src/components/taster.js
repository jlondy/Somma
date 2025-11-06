import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DataContext from "../DataContext";
import BottomNav from "./bottomNav";

const Taster = () => {
  const { data } = useContext(DataContext);
  const [selected, setSelected] = useState([]);

  // Collect all unique taster names
  const tasters = useMemo(() => {
    if (!data?.length) return [];
    const names = [...new Set(data.map((d) => d.taster_name).filter(Boolean))];
    return names.sort();
  }, [data]);

  // Compute stats for a taster
  const computeStats = (name) => {
    const wines = data.filter((d) => d.taster_name === name);
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

    const countryCount = new Set(wines.map((d) => d.country)).size;
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
      countryCount,
      valueRatio,
      medianPrice: median(prices),
    };
  };

  // Click handler for tasters
  const handleSelect = (name) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      if (prev.length >= 2) return [name]; // reset if third is chosen
      return [...prev, name];
    });
  };

  const [t1, t2] = selected;
  const stats1 = t1 ? computeStats(t1) : null;
  const stats2 = t2 ? computeStats(t2) : null;

  const color1 = "#AF1740";
  const color2 = "#DE7C7D";

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
        {/* Left column: Taster list */}
        <Grid item xs={3} sx={{ borderRight: "1px solid #222" }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Compare Tasters
          </Typography>
          <Typography variant="p" color="text.secondary">
            Select any two tasters to compare
          </Typography>

          <div
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
              paddingRight: "6px",
              marginTop: "20px",
            }}
          >
            {tasters.map((name) => (
              <div
                key={name}
                onClick={() => handleSelect(name)}
                style={{
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  color:
                    selected[0] === name
                      ? color1
                      : selected[1] === name
                      ? color2
                      : "white",
                  fontWeight: selected.includes(name) ? "bold" : "normal",
                  transition: "color 0.2s ease",
                }}
              >
                <Typography variant="p">{name}</Typography>
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
          {t1 && t2 && stats1 && stats2 && (
            <>
              {/* Stats grid */}
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {[
                  {
                    label: "Amount of Wines Ranked",
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
                    label: "Countries Reviewed",
                    a: stats1.countryCount,
                    b: stats2.countryCount,
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

export default Taster;
