import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SelectPlayers from "./pages/SelectPlayers";
import Judgement from "./pages/Judgement";

const router = createBrowserRouter([
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
    errorElement: <h1>404</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
