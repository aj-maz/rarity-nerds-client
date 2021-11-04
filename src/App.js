import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Router from "./app/router";

const theme = createTheme({
  palette: {
    primary: { main: "#d90429" },
    secondary: { main: "#54ABE3" },
    background: {
      paper: "#f1faee",
      default: "#e5e5e5",
      background: {
        paper: "#edf2f4",
        default: "#8d99ae"
      }
    }
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    secondary: { main: "#2A344D" },
    primary: { main: "#54ABE3" },
    type: "dark",
    background: {
      paper: "#f1faee",
      default: "#8d99ae"
    }
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
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
