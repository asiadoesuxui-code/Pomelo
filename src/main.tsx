import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { clearLegacyChecklistStorage } from "./constants/checklist";
import { clearLegacyBudgetStorage } from "./constants/budget";
import { clearLegacyWeddingDateStorage } from "./constants/wedding";
import "./index.css";

clearLegacyWeddingDateStorage();
clearLegacyChecklistStorage();
clearLegacyBudgetStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
