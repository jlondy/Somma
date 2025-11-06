import React, { useContext } from "react";
import { motion } from "framer-motion";
import DataContext from "../DataContext";

const TasterFilter = () => {
  const { data, selectedCountries, selectedTasters, setSelectedTasters } =
    useContext(DataContext);

  // Count wines per taster given selected countries
  const grouped = data.reduce((acc, d) => {
    if (selectedCountries.length > 0 && !selectedCountries.includes(d.country))
      return acc;
    if (!d.taster_name) return acc;
    acc[d.taster_name] = (acc[d.taster_name] || 0) + 1;
    return acc;
  }, {});

  const tasters = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const toggleTaster = (taster) => {
    setSelectedTasters((prev) =>
      prev.includes(taster)
        ? prev.filter((t) => t !== taster)
        : [...prev, taster]
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        maxHeight: "200px",
        overflowY: tasters.length > 5 ? "auto" : "visible",
        paddingRight: "4px",
        marginTop: "10px",
      }}
    >
      {tasters.map(([taster, count]) => {
        const active = selectedTasters.includes(taster);
        const disabled = count === 0;

        return (
          <motion.div
            key={taster}
            onClick={() => !disabled && toggleTaster(taster)}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor: active ? "#740938" : "#28282873",
              opacity: disabled ? 0.4 : 1,
              borderRadius: "8px",
              padding: "6px 10px",
              minHeight: "36px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "70%",
                display: "inline-block",
              }}
              title={taster}
            >
              {taster}
            </span>

            <span style={{ opacity: 0.8 }}>{count.toLocaleString()}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TasterFilter;
