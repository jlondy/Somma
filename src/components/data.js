import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DataContext from "../DataContext";
import SidebarFilters from "./sidebar";
import MainContent from "./content";
import "../styles/data.css";

const Data = () => {
  const { selectedCountries, selectedTasters } = useContext(DataContext);
  const [price, setPrice] = useState(0);
  const [rank, setRank] = useState(0);
  const [filters, setFilters] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Update filters when dependencies change
  useEffect(() => {
    setFilters({
      price,
      rank,
      countries: selectedCountries,
      tasters: selectedTasters,
    });
  }, [price, rank, selectedCountries, selectedTasters]);

  // Framer Motion animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.3, 1] },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.3, 1] },
    },
  };

  return (
    <div className="data-layout">
      {/* === Sidebar Toggle Button === */}
      <IconButton
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{
          position: "fixed",
          top: "100px",
          left: sidebarOpen ? "270px" : "10px",
          zIndex: 2200,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
          borderRadius: "16px",
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.3, 1)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
      >
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* === Sidebar (Framer Motion) === */}
      <motion.aside
        className="sidebar"
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        initial={false}
      >
        <SidebarFilters
          price={price}
          setPrice={setPrice}
          rank={rank}
          setRank={setRank}
        />
      </motion.aside>

      {/* === Main Content === */}
      <motion.main
        className="content"
        animate={{
          marginLeft: sidebarOpen ? 260 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1] }}
      >
        <MainContent filters={filters} />
      </motion.main>
    </div>
  );
};

export default Data;
