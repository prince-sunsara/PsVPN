import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Zap, AlertTriangle, CheckCircle } from "lucide-react";

const securityFeatures = [
  {
    name: "DNS LEAK PROTECTION",
    status: "ACTIVE",
    level: "MAXIMUM",
    icon: Shield,
    color: "neon-green"
  },
  {
    name: "IP MASKING",
    status: "SECURED",
    level: "MILITARY",
    icon: Eye,
    color: "neon-green"
  },
  {
    name: "TRAFFIC ENCRYPTION",
    status: "AES-256",
    level: "QUANTUM-PROOF",
    icon: Lock,
    color: "neon-green"
  },
  {
    name: "KILL SWITCH",
    status: "ARMED",
    level: "INSTANT",
    icon: Zap,
    color: "red-400"
  }
];

const threats = [
  "Blocked tracking attempt from ad-network",
  "Prevented DNS hijacking attack",
  "Stopped fingerprinting script",
  "Blocked malicious redirect",
  "Prevented geo-location leak"
];

export default function SecurityPanel() {
  const [threatsBlocked, setThreatsBlocked] = useState(1247);
  const [recentThreat, setRecentThreat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setThreatsBlocked(prev => prev + 1);
        setRecentThreat(Math.floor(Math.random() * threats.length));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6 hover:border-neon-green/60 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-mono text-neon-green">SECURITY MATRIX</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-neon-green">ULTRA SECURE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              className="bg-black/40 border border-neon-green/20 rounded-lg p-4 hover:border-neon-green/40 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-2">
                <feature.icon className={`text-${feature.color}`} size={16} />
                <span className="text-xs font-mono text-text-gray">{feature.name}</span>
              </div>
              <div className={`text-sm font-mono font-bold text-${feature.color} mb-1`}>
                {feature.status}
              </div>
              <div className="text-xs font-mono text-text-gray">
                {feature.level}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Counter */}
          <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="text-red-400" size={16} />
              <span className="text-sm font-mono text-red-400">THREATS NEUTRALIZED</span>
            </div>
            <motion.div 
              className="text-2xl font-mono font-bold text-white mb-2"
              key={threatsBlocked}
              initial={{ scale: 1.2, color: "#ff0000" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              {threatsBlocked.toLocaleString()}
            </motion.div>
            <div className="text-xs font-mono text-text-gray">
              Last: {threats[recentThreat]}
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-black/40 border border-neon-green/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="text-neon-green" size={16} />
              <span className="text-sm font-mono text-neon-green">STEALTH STATUS</span>
            </div>
            <div className="space-y-2">
              {[
                "Location: MASKED",
                "ISP: HIDDEN", 
                "OS: SPOOFED",
                "Browser: ANONYMOUS"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center space-x-2 text-xs font-mono"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                >
                  <div className="w-1 h-1 bg-neon-green rounded-full"></div>
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Security Feed */}
        <div className="mt-6 bg-black/40 border border-neon-green/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-neon-green">LIVE SECURITY FEED</span>
          </div>
          <div className="space-y-1 max-h-20 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="text-xs font-mono text-text-gray"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              >
                [{new Date().toTimeString().split(' ')[0]}] {threats[Math.floor(Math.random() * threats.length)]}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}