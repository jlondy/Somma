import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const MySlider = ({ label, value, setValue, max, min }) => {
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Slider
        valueLabelDisplay="auto"
        value={value}
        min={min}
        max={max}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          color: "#740938",
        }}
      />
    </Box>
  );
};

export default MySlider;
