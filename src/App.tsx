import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import AppRoutes from "./routes";
import CustomLoadingScreen from "./components/layout/CustomLoadingScreen";

function App() {
  return (
    <Suspense fallback={<CustomLoadingScreen />}>
      <>
        <AppRoutes />
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
