import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface GlobeVisualizationProps {
  currentServer: {
    name: string;
    ip: string;
    flag: string;
    city?: string;
  };
  className?: string;
}

function CSSGlobe() {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    let animationId: number;
    let rotation = 0;

    const animate = () => {
      if (isRotating) {
        rotation += 0.5;
        globe.style.transform = `rotateY(${rotation}deg) rotateX(15deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRotating]);

  return (
    <div className="relative flex items-center justify-center h-full">
      {/* Main Globe */}
      <div
        ref={globeRef}
        className="relative w-48 h-48 rounded-full border-2 border-neon-green/30"
        style={{
          background: `
            conic-gradient(from 0deg, 
              transparent 0deg, 
              rgba(0, 255, 127, 0.1) 45deg, 
              transparent 90deg, 
              rgba(0, 255, 127, 0.05) 135deg, 
              transparent 180deg,
              rgba(0, 255, 127, 0.1) 225deg,
              transparent 270deg,
              rgba(0, 255, 127, 0.05) 315deg,
              transparent 360deg
            ),
            radial-gradient(circle at 30% 30%, rgba(0, 255, 127, 0.2) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(0, 255, 127, 0.1) 50%, transparent 70%)
          `,
          boxShadow: `
            inset 0 0 20px rgba(0, 255, 127, 0.3),
            0 0 30px rgba(0, 255, 127, 0.2),
            0 0 60px rgba(0, 255, 127, 0.1)
          `,
        }}
        onMouseEnter={() => setIsRotating(false)}
        onMouseLeave={() => setIsRotating(true)}
      >
        {/* Grid Lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Latitude lines */}
          {[25, 50, 75].map((top) => (
            <div
              key={`lat-${top}`}
              className="absolute left-0 right-0 h-px bg-neon-green/20"
              style={{ top: `${top}%` }}
            />
          ))}

          {/* Longitude lines */}
          {[25, 50, 75].map((left) => (
            <div
              key={`lng-${left}`}
              className="absolute top-0 bottom-0 w-px bg-neon-green/20"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>

        {/* Connection Point */}
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-neon-green rounded-full animate-pulse">
          <div className="absolute inset-0 bg-neon-green rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Inner Glow */}
        <div
          className="absolute inset-4 rounded-full border border-neon-green/10"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 255, 127, 0.05) 0%, transparent 70%)",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Orbit Ring */}
      <div
        className="absolute inset-0 rounded-full border border-neon-green/10 animate-pulse"
        style={{ width: "300px", height: "300px", margin: "auto" }}
      />
    </div>
  );
}

export default function GlobeVisualization({
  currentServer,
  className,
}: GlobeVisualizationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6 hover:border-neon-green/60 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-mono text-neon-green">Global Network</h2>
          <div className="flex items-center space-x-2 text-xs font-mono text-text-gray">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span>Live Monitoring</span>
          </div>
        </div>

        <div
          className="relative h-96 bg-black/40 rounded-lg border border-neon-green/20 overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CSSGlobe />

          <motion.div
            className="absolute bottom-4 left-4 text-xs font-mono text-text-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1 border border-neon-green/20">
              Hover to pause rotation • Real-time VPN monitoring
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 flex items-center justify-between bg-black/40 rounded-lg p-4 border border-neon-green/20 flex-col md:flex-row"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{currentServer.flag}</div>
            <div>
              <div className="font-mono font-semibold text-white">
                {currentServer.name}
              </div>
              <div className="text-sm font-mono text-text-gray">
                {currentServer.city || "Primary Server"}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono text-neon-green break-all text-center">
              IP: {currentServer.ip}
            </div>
            <div className="text-xs font-mono text-text-gray text-center">
              Ping: 12ms
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
