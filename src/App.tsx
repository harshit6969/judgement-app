import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SelectPlayers from "./pages/SelectPlayers";
import Judgement from "./pages/Judgement";
import { ThemeProviderWrapper } from "./components/ThemeProvider";

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
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  );
}

export default App;
