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
    h1: {
      fontFamily: "Montserrat",
    },
    h2: {
      fontFamily: "Montserrat",
    },
    h3: {
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Montserrat",
    },
    h5: {
      fontFamily: "Montserrat",
    },
    h6: {
      fontFamily: "Montserrat",
    },
    subtitle1: {
      fontFamily: "Montserrat",
    },
    subtitle2: {
      fontFamily: "Montserrat",
    },
    body1: {
      fontFamily: "Montserrat",
    },
    body2: {
      fontFamily: "Montserrat",
    },
  },
});

export default theme;
