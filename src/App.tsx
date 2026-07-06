import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { trackView } from "./lib/supabase";
import { useIsMobile } from "./hooks/useIsMobile";
import { SystemProvider } from "./store/system";
import { WindowsProvider } from "./store/windows";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import MobileFallback from "./components/MobileFallback";

gsap.registerPlugin(useGSAP);

export default function App() {
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    trackView();
  }, []);

  if (isMobile) return <MobileFallback />;

  return (
    <SystemProvider>
      <WindowsProvider>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
        <Desktop />
      </WindowsProvider>
    </SystemProvider>
  );
}
