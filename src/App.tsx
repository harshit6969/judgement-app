import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SelectPlayers from "./pages/SelectPlayers";
import Judgement from "./pages/Judgement";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <SelectPlayers />,
      },
      {
        path: "/:id",
        element: <Judgement />,
      },
    ],
    errorElement: <div>Error Page</div>,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
