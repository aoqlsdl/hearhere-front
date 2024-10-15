import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import ReactGA from "react-ga4";

// 운영 환경에서만 구글 애널리틱스 초기화
if (import.meta.env.VITE_REACT_APP_GA4_CODE) {
    ReactGA.initialize(import.meta.env.VITE_REACT_APP_GA4_CODE);
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </RecoilRoot>
    </StrictMode>
);
