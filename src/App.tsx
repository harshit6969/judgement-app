import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SelectPlayers from "./pages/SelectPlayers";
import Judgement from "./pages/Judgement";

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
  return <RouterProvider router={router} />;
}

export default App;
