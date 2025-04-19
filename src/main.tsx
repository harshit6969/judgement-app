import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  GlobalErrorBoundary,
  NotificationCenter,
} from "./components/GlobalErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <NotificationCenter />
      <App />
    </GlobalErrorBoundary>
  </StrictMode>
);
