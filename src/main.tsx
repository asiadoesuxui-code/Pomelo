import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { clearLegacyChecklistStorage } from "./constants/checklist";
import { clearLegacyBudgetStorage } from "./constants/budget";
import { clearLegacyGuestsStorage } from "./constants/guests";
import { clearLegacyWeddingDateStorage } from "./constants/wedding";
import "./index.css";

clearLegacyWeddingDateStorage();
clearLegacyChecklistStorage();
clearLegacyBudgetStorage();
clearLegacyGuestsStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
