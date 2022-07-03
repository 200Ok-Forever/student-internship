import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#fffffe",
    },
    secondary: {
      main: "#3da9fc",
      contrastText: "#fff",
    },
    error: {
      main: "#ef4565",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
