import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/intro-screen";
import MatrixBackground from "@/components/matrix-background";
import Header from "@/components/header";
import StatusBar from "@/components/status-bar";
import GlobeVisualization from "@/components/globe-visualization";
import CountrySidebar from "@/components/country-sidebar";
import StatisticsGrid from "@/components/statistics-grid";
import ControlPanel from "@/components/control-panel";
import SecurityPanel from "@/components/security-panel";
import HackerTerminal from "@/components/hacker-terminal";
import RealIPDetector from "@/components/real-ip-detector";
import VPNImplementationGuide from "@/components/vpn-implementation-guide";
import { useVpnState } from "@/hooks/use-vpn-state";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { currentServer, nextRotationTime, selectCountry } = useVpnState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-hacker-bg text-white font-sans overflow-x-hidden">
      <MatrixBackground />

      {/* Scan Line Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30 animate-scan"></div>
      </div>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="min-h-screen"
          >
            <Header />

            <main className="relative z-10 min-h-screen pt-8">
              <div className="container mx-auto px-4">
                <StatusBar
                  currentServer={currentServer}
                  nextRotationTime={nextRotationTime}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <GlobeVisualization
                    currentServer={currentServer}
                    className="lg:col-span-2"
                  />

                  <CountrySidebar
                    currentServer={currentServer}
                    onSelectCountry={selectCountry}
                    className="lg:col-span-1"
                  />
                </div>

                <RealIPDetector currentServer={currentServer} />
                <VPNImplementationGuide />
                <StatisticsGrid />
                <ControlPanel />
                <SecurityPanel />
                <HackerTerminal />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
