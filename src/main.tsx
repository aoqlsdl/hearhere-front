// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <BrowserRouter>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </BrowserRouter>
    // </StrictMode>
);
