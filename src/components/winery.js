import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import DataContext from "../DataContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/winery.css";
import BottomNav from "./bottomNav";

const Winery = () => {
  const { data } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const currentWine = useMemo(
    () => data?.find((d) => String(d.id) === String(id)),
    [data, id]
  );

  // Watch SVG container resize dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!currentWine) {
    return <div className="winery-empty">Winery not found</div>;
  }

  // Filter all wines from this winery
  const winesFromSameWinery = data.filter(
    (d) => d.winery === currentWine.winery
  );

  const { width, height } = size;

  // Compute winery stats
  const avgScore =
    winesFromSameWinery.reduce((sum, d) => sum + Number(d.points || 0), 0) /
    winesFromSameWinery.length;
  const maxPrice = Math.max(
    ...winesFromSameWinery.map((d) => Number(d.price) || 0)
  );
  const minPrice = Math.min(
    ...winesFromSameWinery.map((d) => Number(d.price) || 0)
  );

  return (
    <div className="winery-container" ref={containerRef}>
      <div className="winery-header">
        <Typography variant="h1" className="winery-name">
          {currentWine.winery}
        </Typography>
        <Typography className="winery-subheader" variant="p">
          WINERY
        </Typography>
      </div>
      <div className="winery-content">
        <div className="winery-stats">
          <div className="statistic">
            <Typography variant="h4" className="score">
              +{avgScore.toFixed(1)}
            </Typography>
            <Typography className="subtext" variant="p">
              AVERAGE RANK
            </Typography>
          </div>
          <div className="statistic">
            <Typography variant="h4" className="score">
              ${maxPrice.toFixed(1)}
            </Typography>
            <Typography className="subtext" variant="p">
              HIGHEST PRICE
            </Typography>
          </div>
          <div className="statistic">
            <Typography variant="h4" className="score">
              ${minPrice.toFixed(1)}
            </Typography>
            <Typography className="subtext" variant="p">
              LOWEST PRICE
            </Typography>
          </div>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="winery-svg"
        viewBox={`0 0 ${width || window.innerWidth} ${
          height || window.innerHeight
        }`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* Left side → center */}
            <stop offset="0%" stopColor="#CD2C58" />
            <stop offset="25%" stopColor="#E06B80" />
            <stop offset="50%" stopColor="#FFC69D" />
            {/* Center → right side (mirror of left) */}
            <stop offset="75%" stopColor="#E06B80" />
            <stop offset="100%" stopColor="#CD2C58" />
          </linearGradient>
        </defs>

        {winesFromSameWinery.map((d, i) => {
          const total = winesFromSameWinery.length;
          const half = Math.floor(total / 2);
          const isEven = total % 2 === 0;

          const w = width || window.innerWidth;
          const h = height || window.innerHeight;
          const gap = 25;
          const offset = (i - half + (isEven ? 0.5 : 0)) * gap;

          const baseY = h * 0.5 + offset;
          const isCenterLine = !isEven && i === half;

          const curvatureX = 0.25; // horizontal pull toward center
          const midX = w * 0.5;
          const midY = h * 0.5; // all lines converge here

          let dPath;
          if (isCenterLine) {
            // straight line through center
            dPath = `M0,${midY} L${w},${midY}`;
          } else {
            // symmetrical Bezier curve meeting exactly at (midX, midY)
            dPath = `
      M0,${baseY}
      C${w * curvatureX},${baseY}
       ${w * (0.5 - curvatureX)},${midY}
       ${midX},${midY}
      S${w * (1 - curvatureX)},${baseY}
       ${w},${baseY}
    `;
          }

          return (
            <motion.path
              key={i}
              d={dPath}
              stroke="url(#path-gradient)"
              strokeWidth="5"
              fill="none"
              initial={{ y: h * 0.5, opacity: 0 }}
              animate={{
                y: 0,
                opacity:
                  hovered && hovered.id !== winesFromSameWinery[i].id
                    ? 0.1 // fade others
                    : 1, // active or none hovered
              }}
              transition={{
                duration: 1.3,
                delay: i * 0.025,
                ease: [0.42, 0, 0.58, 1],
              }}
              onMouseEnter={() => setHovered(winesFromSameWinery[i])}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/wine?id=${winesFromSameWinery[i].id}`)}
              style={{
                cursor: "pointer",
                transition: "opacity 0.3s ease",
              }}
            />
          );
        })}
      </svg>

      {hovered && (
        <div className="winery-tooltip">
          <Typography variant="h3" gutterBottom color="text.primary">
            {hovered.title}
          </Typography>
          <Typography variant="p" color="text.secondary">
            Price: ${hovered.price} | Score: {hovered.points}/100
          </Typography>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Winery;
