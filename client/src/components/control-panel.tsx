import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Zap } from "lucide-react";

export default function ControlPanel() {
  const [protocol, setProtocol] = useState("OpenVPN UDP");
  const [killSwitch, setKillSwitch] = useState(true);
  const [dnsProtection, setDnsProtection] = useState(true);
  const [autoReconnect, setAutoReconnect] = useState(false);

  const handleDisconnect = () => {
    console.log("Disconnecting VPN...");
  };

  const handleQuickConnect = () => {
    console.log("Quick connecting to optimal server...");
  };

  return (
    <motion.div 
      className="mt-8 mb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6 hover:border-neon-green/60 transition-colors">
        <h3 className="text-lg font-mono text-neon-green mb-6">Advanced Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-mono text-text-gray mb-2 block">Protocol</span>
              <select 
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="w-full bg-black/40 border border-neon-green/30 rounded-lg px-3 py-2 font-mono text-sm text-white focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-colors"
              >
                <option>OpenVPN UDP</option>
                <option>OpenVPN TCP</option>
                <option>WireGuard</option>
                <option>IKEv2</option>
              </select>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={killSwitch}
                onChange={(e) => setKillSwitch(e.target.checked)}
                className="w-4 h-4 bg-black/40 border border-neon-green/30 rounded focus:ring-neon-green text-neon-green"
              />
              <span className="text-sm font-mono text-text-gray">Kill Switch</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={dnsProtection}
                onChange={(e) => setDnsProtection(e.target.checked)}
                className="w-4 h-4 bg-black/40 border border-neon-green/30 rounded focus:ring-neon-green text-neon-green"
              />
              <span className="text-sm font-mono text-text-gray">DNS Leak Protection</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoReconnect}
                onChange={(e) => setAutoReconnect(e.target.checked)}
                className="w-4 h-4 bg-black/40 border border-neon-green/30 rounded focus:ring-neon-green text-neon-green"
              />
              <span className="text-sm font-mono text-text-gray">Auto-Reconnect</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <motion.button 
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/60 text-red-400 font-mono text-sm py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={handleDisconnect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Power size={16} className="mr-2" />
              Disconnect
            </motion.button>
            
            <motion.button 
              className="w-full bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/30 hover:border-neon-green/60 text-neon-green font-mono text-sm py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={handleQuickConnect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={16} className="mr-2" />
              Quick Connect
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
