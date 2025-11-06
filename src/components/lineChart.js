import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import DataContext from "../DataContext";

const SmoothLineChart = ({ valuesFromParent }) => {
  const { data = [] } = useContext(DataContext);
  const {
    price: selectedPrice = 0,
    rank: selectedRank = 0,
    countries = [],
    tasters = [],
  } = valuesFromParent || {};

  const [priceHover, setPriceHover] = useState(null);
  const [rankHover, setRankHover] = useState(null);
  const [svgWidth, setSvgWidth] = useState(800);
  const [svgHeight, setSvgHeight] = useState(250);

  const svgRefPrice = useRef();
  const svgRefRank = useRef();

  // === Responsive width + height tracking ===
  useEffect(() => {
    const observeResize = (el) => {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setSvgWidth(width);
          setSvgHeight(height - 40);
        }
      });
      observer.observe(el);
      return observer;
    };
    let observer;
    if (svgRefPrice.current) observer = observeResize(svgRefPrice.current);
    return () => observer && observer.disconnect();
  }, []);

  // === Helper: generate full X-domain data ===
  const groupData = (dataset, key, maxX) => {
    const map = new Map();
    for (const d of dataset) {
      const val = Math.round(parseFloat(d[key]));
      if (!isNaN(val) && val >= 0 && val <= maxX) {
        map.set(val, (map.get(val) || 0) + 1);
      }
    }
    const full = [];
    for (let i = 0; i <= maxX; i++) {
      full.push([i, map.get(i) || 0]);
    }
    return full;
  };

  // === Filter + compute data ===
  const { priceData, rankData, maxPriceY, maxRankY } = useMemo(() => {
    let priceFiltered = [...data];
    let rankFiltered = [...data];

    if (countries.length > 0) {
      priceFiltered = priceFiltered.filter((d) =>
        countries.includes(d.country)
      );
      rankFiltered = rankFiltered.filter((d) => countries.includes(d.country));
    }

    if (tasters.length > 0) {
      priceFiltered = priceFiltered.filter((d) =>
        tasters.includes(d.taster_name)
      );
      rankFiltered = rankFiltered.filter((d) =>
        tasters.includes(d.taster_name)
      );
    }

    if (selectedRank >= 0) {
      priceFiltered = priceFiltered.filter(
        (d) => Number(d.points) === selectedRank
      );
    }

    if (selectedPrice >= 0) {
      rankFiltered = rankFiltered.filter(
        (d) => Number(d.price) === selectedPrice
      );
    }

    const priceData = groupData(priceFiltered, "price", 150);

    // --- Limit rank to 80–100 range ---
    const rankDataRaw = groupData(rankFiltered, "points", 100);
    const rankData = rankDataRaw.filter(([x]) => x >= 80 && x <= 100);
    const normalizedRankData = rankData.map(([x, y]) => [x - 80, y]);

    const maxPriceY = Math.max(...priceData.map((d) => d[1])) || 1;
    const maxRankY = Math.max(...normalizedRankData.map((d) => d[1])) || 1;

    return { priceData, rankData: normalizedRankData, maxPriceY, maxRankY };
  }, [data, countries, tasters, selectedPrice, selectedRank]);

  // === Smooth path generator ===
  const makePath = (data, width, height, maxX, maxY) => {
    const scaleX = width / maxX;
    const scaleY = height / maxY;
    const pts = data.map(([x, y]) => [x * scaleX, height - y * scaleY]);
    if (!pts.length) return { path: "", pts: [] };

    let path = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length - 2; i++) {
      const xc = (pts[i][0] + pts[i + 1][0]) / 2;
      const yc = (pts[i][1] + pts[i + 1][1]) / 2;
      path += ` Q${pts[i][0]},${pts[i][1]} ${xc},${yc}`;
    }
    const last = pts.length - 1;
    path += ` Q${pts[last - 1][0]},${pts[last - 1][1]} ${pts[last][0]},${
      pts[last][1]
    }`;
    return { path, pts };
  };

  const { path: pricePath, pts: pricePts } = makePath(
    priceData,
    svgWidth,
    svgHeight,
    150,
    maxPriceY
  );
  const { path: rankPath, pts: rankPts } = makePath(
    rankData,
    svgWidth,
    svgHeight,
    20, // 80–100 range normalized to 0–20
    maxRankY
  );

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2.5, ease: "easeInOut" },
    },
  };

  const getHoverData = (x, pts, maxX, label, maxY, rangeOffset = 0) => {
    const idx = Math.round((x / svgWidth) * maxX);
    const [, yPos] = pts[idx] || [0, svgHeight];
    const count = Math.round(((svgHeight - yPos) / svgHeight) * maxY);
    const value = idx + rangeOffset; // add offset back for ranks (80–100)
    return { x, label, value, count };
  };

  const Tooltip = ({ info }) => {
    if (!info) return null;

    const rectWidth = 130;
    const rectHeight = 50;
    const pad = 10;
    const rectY = 20;

    const flipLeft = info.x > svgWidth / 2;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const boxX = flipLeft
      ? clamp(info.x - rectWidth - pad, 0, svgWidth - rectWidth)
      : clamp(info.x + pad, 0, svgWidth - rectWidth);

    const boxCX = boxX + rectWidth / 2;
    const boxCY1 = rectY + rectHeight / 2 - 5;
    const boxCY2 = rectY + rectHeight / 2 + 10;

    return (
      <g>
        <line
          className="tooltip-line"
          x1={info.x}
          x2={info.x}
          y1={0}
          y2={svgHeight}
          stroke="white"
          strokeDasharray="4"
        />
        <rect
          x={boxX}
          y={rectY}
          rx={6}
          ry={6}
          width={rectWidth}
          height={rectHeight}
          fill="rgb(5, 5, 5)"
          stroke="#CC2B52"
        />
        <text
          x={boxCX}
          y={boxCY1}
          fill="white"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {info.label}: {info.value}
        </text>
        <text
          x={boxCX}
          y={boxCY2}
          fill="white"
          fontSize="11"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Wines: {info.count}
        </text>
      </g>
    );
  };

  const gridLines = (count, vertical = false) =>
    [...Array(count)].map((_, i) => {
      const pos = (i / count) * (vertical ? svgWidth : svgHeight);
      return vertical ? (
        <line
          key={`v${i}`}
          x1={pos}
          y1={0}
          x2={pos}
          y2={svgHeight}
          stroke="rgba(204, 43, 82, 0.1)"
        />
      ) : (
        <line
          key={`h${i}`}
          x1={0}
          y1={pos}
          x2={svgWidth}
          y2={pos}
          stroke="rgba(204, 43, 82, 0.1)"
        />
      );
    });

  return (
    <div
      className="line-div"
      style={{
        color: "white",
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: "2rem",
        width: "100%",
      }}
    >
      {/* === PRICE CHART === */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#101010",
          border: "1px solid #191919",
          borderRadius: "16px",
          padding: "1rem 1.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <Typography variant="h2" gutterBottom color="text.primary">
            Price Amount
          </Typography>
          <Typography variant="p" color="text.secondary">
            Hover to view number of wines per price (0–150)
          </Typography>
        </div>

        <div
          ref={svgRefPrice}
          style={{ flex: "1 1 auto", minHeight: 0, position: "relative" }}
        >
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${svgWidth} ${svgHeight + 40}`}
            onMouseMove={(e) =>
              setPriceHover(
                getHoverData(
                  e.nativeEvent.offsetX,
                  pricePts,
                  150,
                  "Price",
                  maxPriceY
                )
              )
            }
            onMouseLeave={() => setPriceHover(null)}
          >
            <defs>
              <linearGradient
                id="priceGradient"
                x1="0"
                x2="0"
                y1={svgHeight}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#DE7C7D" />
                <stop offset="40%" stopColor="#CC2B52" />
                <stop offset="70%" stopColor="#AF1740" />
                <stop offset="100%" stopColor="#740938" />
              </linearGradient>
            </defs>
            <g transform="translate(0,20)">
              {gridLines(5)}
              {gridLines(10, true)}
              <motion.path
                d={pricePath}
                fill="none"
                stroke="url(#priceGradient)"
                strokeWidth="3"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
              <Tooltip info={priceHover} />
            </g>
          </svg>
        </div>
      </div>

      {/* === RANK CHART === */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#101010",
          border: "1px solid #191919",
          borderRadius: "16px",
          padding: "1rem 1.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <Typography variant="h2" gutterBottom color="text.primary">
            Rank Amount
          </Typography>
          <Typography variant="p" color="text.secondary">
            Hover to view number of wines per rank (80–100)
          </Typography>
        </div>

        <div
          ref={svgRefRank}
          style={{ flex: "1 1 auto", minHeight: 0, position: "relative" }}
        >
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${svgWidth} ${svgHeight + 40}`}
            onMouseMove={(e) =>
              setRankHover(
                getHoverData(
                  e.nativeEvent.offsetX,
                  rankPts,
                  20,
                  "Rank",
                  maxRankY,
                  80 // offset for correct labels
                )
              )
            }
            onMouseLeave={() => setRankHover(null)}
          >
            <defs>
              <linearGradient
                id="rankGradient"
                x1="0"
                x2="0"
                y1={svgHeight}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#DE7C7D" />
                <stop offset="40%" stopColor="#CC2B52" />
                <stop offset="70%" stopColor="#AF1740" />
                <stop offset="100%" stopColor="#740938" />
              </linearGradient>
            </defs>
            <g transform="translate(0,20)">
              {gridLines(5)}
              {gridLines(10, true)}
              <motion.path
                d={rankPath}
                fill="none"
                stroke="url(#rankGradient)"
                strokeWidth="3"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
              <Tooltip info={rankHover} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SmoothLineChart;
