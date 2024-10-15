import Routes from "./pages/routes";
import "./styles/App.css";
import RouteChangeTracker from "./RouteChangeTracker.ts";

function App() {
    // ga4 초기화 및 페이지 이동 감지
    RouteChangeTracker();
    return (
        <>
            <Routes />
        </>
    );
}

export default App;
