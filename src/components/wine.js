import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import BottomNav from "./bottomNav";
import DataContext from "../DataContext";
import { ColorPicker } from "../functions/functions";
import WineGlass from "./glass";

const Wine = () => {
  const theme = useTheme();
  const { data } = useContext(DataContext);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const wine = useMemo(
    () => data?.find((d) => String(d.id) === String(id)),
    [data, id]
  );

  if (!wine) {
    return (
      <Box
        sx={{
          color: theme.palette.text.secondary,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Typography variant="h5">Wine not found 🍷</Typography>
      </Box>
    );
  }

  const glassFill = ColorPicker(wine.country);

  const info = [
    { label: "Title", value: wine.title },
    { label: "Country", value: wine.country },
    { label: "Price", value: `$${wine.price || "N/A"}` },
    { label: "Variety", value: wine.variety || "Unknown" },
    {
      label: "Taster",
      value: `${wine.taster_name || "N/A"} ${wine.taster_twitter_handle || ""}`,
    },
    {
      label: "Description",
      value: wine.description || "No description available.",
    },
  ];

  return (
    <>
      <Box
        className="wine-layout"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          padding: "4rem",
          color: "#fff",
          fontFamily: '"Manrope", sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* === Left side: Wine glass === */}
        <Box
          className="wine-glass-section"
          sx={{
            position: "relative",
            width: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Glow */}
          <Box
            className="wine-glow"
            sx={{
              position: "absolute",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${glassFill}55 0%, transparent 100%)`,
              filter: "blur(100px)",
              zIndex: 0,
            }}
          />

          {/* Glass */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ width: "220px", height: "auto", margin: "0 auto" }}
          >
            <WineGlass color={glassFill} width="200" height="200" />
          </motion.div>
          {/* Score */}
          <motion.div
            className="wine-score"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              position: "absolute",
              bottom: "-3rem",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#FFF",
                textShadow: "0 0 16px rgba(255,255,255,0.2)",
              }}
            >
              {wine.points}
              <Typography
                component="span"
                color="text.secondary"
                sx={{
                  fontSize: "1.5rem",
                  marginLeft: "4px",
                }}
              >
                /100
              </Typography>
            </Typography>
          </motion.div>
        </Box>

        {/* === Right side: Info panel === */}
        <motion.div
          className="wine-info-panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            backgroundColor: "#101010",
            borderRadius: "20px",
            padding: "2rem 2.5rem",
            border: "1px solid #191919",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
              },
            }}
          >
            {info.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: glassFill,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {line.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFF",
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {line.value}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default Wine;
