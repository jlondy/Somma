import React, { useContext } from "react";
import { motion } from "framer-motion";
import DataContext from "../DataContext";

const CountryFilter = () => {
  const { data, selectedCountries, selectedTasters, setSelectedCountries } =
    useContext(DataContext);

  // Count wines per country given selected tasters
  const grouped = data.reduce((acc, d) => {
    if (selectedTasters.length > 0 && !selectedTasters.includes(d.taster_name))
      return acc;

    acc[d.country] = (acc[d.country] || 0) + 1;
    return acc;
  }, {});

  const countries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const toggleCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        maxHeight: "200px",
        overflowY: countries.length > 5 ? "auto" : "visible",
        paddingRight: "4px",
        marginTop: "10px",
      }}
    >
      {countries.map(([country, count]) => {
        const active = selectedCountries.includes(country);
        const disabled = count === 0;

        return (
          <motion.div
            key={country}
            onClick={() => !disabled && toggleCountry(country)}
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
              title={country}
            >
              {country}
            </span>

            <span style={{ opacity: 0.8 }}>{count.toLocaleString()}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CountryFilter;
