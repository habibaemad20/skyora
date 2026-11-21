import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* /app بيلف كل صفحاته بالـ Layout (Navbar + Footer + Drawer) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}