import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Menu, Zap, Lock, Eye, Terminal } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-20 bg-hacker-bg-2/80 backdrop-blur-md border-b border-neon-green/20">
      {/* Top status bar */}
      <div className="bg-black/60 border-b border-neon-green/10 py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4 text-neon-green">
              <span>[{currentTime.toTimeString().split(' ')[0]}]</span>
              <span>SESSION: ENCRYPTED</span>
              <span>MODE: GHOST</span>
            </div>
            <div className="flex items-center space-x-4 text-text-gray">
              <span>UPTIME: 99.9%</span>
              <span>NODES: 247</span>
              <span>PING: 12ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.div 
              className="text-2xl font-mono font-bold text-neon-green"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{
                textShadow: "0 0 15px #00ff7f"
              }}
            >
              <Shield className="inline mr-2" size={24} />
              PSVPN
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Lock className="text-neon-green" size={12} />
                <span className="text-neon-green">AES-256</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Eye className="text-neon-green" size={12} />
                <span className="text-neon-green">NO-LOGS</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Zap className="text-neon-green" size={12} />
                <span className="text-neon-green">KILL-SWITCH</span>
              </div>
            </div>
          </div>
          
          <button 
            className="md:hidden text-neon-green hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6 font-mono text-sm">
              {[
                { name: "MATRIX", icon: Terminal },
                { name: "NODES", icon: Shield },
                { name: "STEALTH", icon: Eye }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href="#"
                  className="text-text-gray hover:text-neon-green transition-colors relative group flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon size={14} />
                  <span>{item.name}</span>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-neon-green transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                </motion.a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-2 bg-black/40 border border-neon-green/30 rounded px-3 py-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-neon-green font-mono text-xs">ULTRA SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/90 border-t border-neon-green/20"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {["MATRIX", "NODES", "STEALTH"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-text-gray hover:text-neon-green transition-colors font-mono text-sm py-2"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
