import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    // 구글 애널리틱스 운영서버만 적용
    useEffect(() => {
        if (import.meta.env.VITE_REACT_APP_GA4_CODE && import.meta.env.MODE === "production") {
            ReactGA.initialize(import.meta.env.VITE_REACT_APP_GA4_CODE);
            setInitialized(true);
        }
    }, []);

    // location 변경 감지시 pageview 이벤트 전송
    useEffect(() => {
        if (initialized) {
            console.log("Tracking pageview for: ", location.pathname);
            ReactGA.set({ page: location.pathname });
            ReactGA.send("pageview");
        }
    }, [initialized, location]);
};

export default RouteChangeTracker;
