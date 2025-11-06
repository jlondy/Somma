import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
    h1: { fontWeight: 700, fontSize: "34px" },
    h2: { fontWeight: 700, fontSize: "28px" },
    h3: { fontWeight: 600, fontSize: "22px" },
    h4: { fontWeight: 600, fontSize: "20px" },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    p: { fontWeight: 500, fontSize: "16px" },
    pb: { fontWeight: 700, fontSize: "16px" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#0A0203",
      paper: "#1A050B",
    },
    text: {
      primary: "#ffffff",
      secondary: "#999999",
    },
    primary: {
      main: "#CC2B52",
    },
    secondary: {
      main: "#AF1740",
    },
  },
});

export default theme;
