import { createTheme } from "@mui/material/styles";
// change color of mui
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "rgba(255,255,254,0.9)",
    },
    secondary: {
      main: "#3d70b2",
      contrastText: "#fff",
    },
    error: {
      main: "#ef4565",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    button: {
      fontWeight: 700,
    },
  },
});

export default theme;
