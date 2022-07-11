import { createTheme } from "@mui/material/styles";
// change color of mui
const theme = createTheme({
  palette: {
    type: "light",
    secondary: {
      main: "rgba(255,255,254,0.9)",
    },
    primary: {
      main: "#3d70b2",
      contrastText: "#fff",
    },
    error: {
      main: "#c62828",
    },
    success: {
      main: "#9ccc9e",
    },
    greyColor: {
      main: "#616161",
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
