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
        path: "/",
        element: <SelectPlayers />,
      },
      {
        path: "/judgement-app/:id",
        element: <Judgement />,
      },
    ],
    errorElement: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
