import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { clearLegacyChecklistStorage } from "./constants/checklist";
import { clearLegacyBudgetStorage } from "./constants/budget";
import { clearLegacyVendorsStorage } from "./constants/vendors";
import { clearLegacyGuestsStorage } from "./constants/guests";
import { clearLegacyWeddingDateStorage } from "./constants/wedding";
import "./index.css";

clearLegacyWeddingDateStorage();
clearLegacyChecklistStorage();
clearLegacyBudgetStorage();
clearLegacyVendorsStorage();
clearLegacyGuestsStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
