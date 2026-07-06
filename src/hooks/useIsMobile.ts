import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px), (pointer: coarse) and (max-width: 1023px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setIsMobile(window.matchMedia(QUERY).matches);
    // Listen to both: `change` misses emulated viewports in some browsers
    mql.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isMobile;
}
