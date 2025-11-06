import React, { useEffect, useState } from "react";
import Chart from "./chart";
import LineChart from "./lineChart";

const MainContent = ({ filters }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Screen size check
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <Chart valuesFromParent={filters} />
      {!isMobile && <LineChart valuesFromParent={filters} />}
    </>
  );
};

export default MainContent;
