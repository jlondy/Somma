import React, { useMemo, useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataContext from "../DataContext";
import { ColorPicker } from "../functions/functions";
import { useNavigate } from "react-router-dom";
import WineGlass from "./glass";
import "../styles/chart.css";

const Chart = ({ valuesFromParent }) => {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 400,
  });
  const [device, setDevice] = useState("desktop");

  // Detect device size
  useEffect(() => {
    const updateDevice = () => {
      const w = window.innerWidth;
      if (w <= 768) setDevice("mobile");
      else if (w <= 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  // Track container size dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filters
  const price = Number(valuesFromParent?.price ?? 0);
  const rank = Number(valuesFromParent?.rank ?? 0);

  const countries = useMemo(
    () =>
      Array.isArray(valuesFromParent?.countries)
        ? valuesFromParent.countries
        : [],
    [valuesFromParent?.countries]
  );
  const tasters = useMemo(
    () =>
      Array.isArray(valuesFromParent?.tasters) ? valuesFromParent.tasters : [],
    [valuesFromParent?.tasters]
  );

  const ready =
    countries.length > 0 &&
    tasters.length > 0 &&
    Array.isArray(data) &&
    data.length > 0;

  // Filter dataset
  const filteredData = useMemo(() => {
    if (!ready) return [];
    return data
      .filter((d) => countries.includes(d.country))
      .filter((d) => tasters.includes(d.taster_name))
      .filter((d) => Number(d.points) === rank && Number(d.price) === price);
  }, [ready, data, countries, tasters, price, rank]);

  // Layout setup
  const BASE_WIDTH = 30;
  const BASE_HEIGHT = 60;
  const X_MARGIN = 12;
  const Y_MARGIN = 8;

  // Device-specific column caps
  const maxPerDevice = {
    desktop: 16,
    tablet: 12,
    mobile: 8,
  };

  const maxColsAllowed = maxPerDevice[device];

  // How many columns actually fit on screen
  const possibleCols = Math.floor(
    containerSize.width / (BASE_WIDTH + X_MARGIN)
  );
  const maxCols = Math.min(possibleCols, maxColsAllowed);

  const rows = Math.ceil(filteredData.length / maxCols);

  // Dynamic scaling (fit all columns nicely)
  const totalWidth = maxCols * (BASE_WIDTH + X_MARGIN);
  const scaleFactor =
    totalWidth > containerSize.width ? containerSize.width / totalWidth : 1;

  const GLASS_WIDTH = BASE_WIDTH * scaleFactor;
  const GLASS_HEIGHT = BASE_HEIGHT * scaleFactor;
  const X_SPACING = GLASS_WIDTH + X_MARGIN * scaleFactor;
  const Y_SPACING = GLASS_HEIGHT + Y_MARGIN * scaleFactor;

  return (
    <Box
      ref={containerRef}
      className="chart-div"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        color: "white",
      }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#101010",
          border: "1px solid #191919",
          borderRadius: "16px",
          position: "relative",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" gutterBottom color="text.primary">
          {filteredData.length > 0
            ? `${filteredData.length} wines selected`
            : "Selections"}
        </Typography>

        <Typography variant="p" color="text.secondary" gutterBottom>
          {ready && filteredData.length === 0
            ? "No wines match these filters."
            : "Apply filters to see wines 🍷"}
        </Typography>

        {/* Scrollable SVG container */}
        <Box
          className="chart-scroll"
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: "8px",
            lineHeight: 0,
          }}
        >
          <svg
            width="100%"
            height={rows * Y_SPACING + GLASS_HEIGHT}
            viewBox={`0 0 ${containerSize.width} ${
              rows * Y_SPACING + GLASS_HEIGHT
            }`}
            style={{ display: "block" }}
            preserveAspectRatio="none"
          >
            {ready &&
              filteredData.map((d, i) => {
                const col = i % maxCols;
                const row = Math.floor(i / maxCols);
                const rowCount = Math.min(
                  filteredData.length - row * maxCols,
                  maxCols
                );
                const rowWidth = rowCount * X_SPACING;
                const offsetX = (containerSize.width - rowWidth) / 2;

                const x = offsetX + col * X_SPACING;
                const y = row * Y_SPACING;
                const fill = ColorPicker(d.country);

                return (
                  <motion.g
                    key={`${d.id || d.title}-${i}`}
                    transform={`translate(${x}, ${y}) scale(${scaleFactor})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    onMouseEnter={() => setHovered(d)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(`/wine?id=${d.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <WineGlass
                      color={fill}
                      width={BASE_WIDTH}
                      height={BASE_HEIGHT}
                    />
                  </motion.g>
                );
              })}
          </svg>
        </Box>

        {/* Tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: mousePos.y + 12,
              left: mousePos.x + 12,
              pointerEvents: "none",
              background: "rgba(0, 0, 0, 0.75)",
              border: "1px solid #CC2B52",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "13px",
              color: "#fff",
              whiteSpace: "nowrap",
              zIndex: 2000,
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h3" gutterBottom color="text.primary">
              {hovered.title || "Unknown Wine"}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {hovered.country}
            </Typography>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default Chart;
