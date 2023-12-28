import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const ScrollToTop = () => {
  return (
    <div>
      <ScrollHandler />
    </div>
  );
};

export default ScrollToTop;
