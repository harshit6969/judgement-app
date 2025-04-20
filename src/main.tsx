import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary.tsx";
import { NotificationCenter } from "./components/Notifications.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <NotificationCenter />
      <App />
    </GlobalErrorBoundary>
  </StrictMode>
);
