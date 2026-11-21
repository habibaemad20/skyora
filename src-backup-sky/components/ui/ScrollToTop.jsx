import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// لما الصفحة تتغير، نرجع لأول الصفحة
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}