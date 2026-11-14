import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "./index";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The portfolio root element is missing.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
