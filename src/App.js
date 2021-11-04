import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Router from "./app/router";

const theme = createTheme({
  palette: {
    primary: { main: "#14213d" },
    secondary: { main: "#fca311" },
    background: {
      paper: "#ffffff",
      default: "#e5e5e5",
    },
  },
  typography: {
    fontFamily: "'Kanit', sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    secondary: { main: "#2A344D" },
    primary: { main: "#54ABE3" },
    type: "dark",
    background: {
      paper: "#f1faee",
      default: "#8d99ae",
    },
  },
  typography: {
    fontFamily: "'Kanit', sans-serif",
  },
});

const App = () => {
  const dark = false;
  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
