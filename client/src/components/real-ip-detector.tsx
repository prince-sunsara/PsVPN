import { motion } from "framer-motion";
import { Globe, Shield, Eye, EyeOff } from "lucide-react";
import { useVpnState } from "@/hooks/use-vpn-state";

export default function RealIPDetector({ currentServer }) {
  const { ipState } = useVpnState();
  const { realIP, maskedIP, isVPNActive, isLoading, error, toggleVPN } =
    ipState;

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-mono text-neon-green">
            IP ADDRESS CONTROL
          </h3>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isVPNActive ? "bg-neon-green" : "bg-red-400"
              }`}
            ></div>
            <span
              className={`text-xs font-mono ${
                isVPNActive ? "text-neon-green" : "text-red-400"
              }`}
            >
              {isVPNActive ? "PROTECTED" : "EXPOSED"}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm font-mono">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Real IP Section */}
          <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <EyeOff className="text-red-400" size={16} />
              <span className="text-sm font-mono text-red-400">
                YOUR REAL IDENTITY
              </span>
            </div>

            {realIP && !isVPNActive && (
              <div className="space-y-2 text-sm font-mono">
                <div className="text-white">
                  IP:{" "}
                  <span className="text-red-400 break-all">{realIP.ip}</span>
                </div>
                <div className="text-white">
                  Location:{" "}
                  <span className="text-red-400">
                    {realIP.city}, {realIP.country}
                  </span>
                </div>
                <div className="text-white">
                  ISP: <span className="text-red-400">{realIP.org}</span>
                </div>
                <div className="text-xs text-red-300 mt-2">
                  ⚠️ VISIBLE TO WEBSITES & TRACKERS
                </div>
              </div>
            )}

            {isVPNActive && (
              <div className="text-center py-4">
                <Eye className="text-neon-green mx-auto mb-2" size={24} />
                <div className="text-neon-green font-mono text-sm">
                  IDENTITY HIDDEN
                </div>
              </div>
            )}
          </div>

          {/* Masked IP Section */}
          <div className="bg-black/40 border border-neon-green/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="text-neon-green" size={16} />
              <span className="text-sm font-mono text-neon-green">
                VPN IDENTITY
              </span>
            </div>

            {maskedIP && isVPNActive && (
              <div className="space-y-2 text-sm font-mono">
                <div className="text-white">
                  IP:{" "}
                  <span className="text-neon-green break-all">
                    {currentServer?.ip}
                  </span>
                </div>
                <div className="text-white">
                  Location:{" "}
                  <span className="text-neon-green">
                    {currentServer?.city}, {currentServer?.name}
                  </span>
                </div>
                <div className="text-white">
                  ISP: <span className="text-neon-green">{maskedIP.org}</span>
                </div>
                <div className="text-xs text-neon-green mt-2">
                  ✓ ANONYMOUS & ENCRYPTED
                </div>
              </div>
            )}

            {!isVPNActive && (
              <div className="text-center py-4">
                <Globe className="text-text-gray mx-auto mb-2" size={24} />
                <div className="text-text-gray font-mono text-sm">
                  DISCONNECTED
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Current Status Display */}
        <div className="bg-black/60 border border-neon-green/20 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-sm font-mono text-text-gray mb-2">
              CURRENT IP ADDRESS
            </div>
            <div
              className={`text-2xl font-mono font-bold break-all ${
                isVPNActive ? "text-neon-green" : "text-red-400"
              }`}
            >
              {isLoading ? "DETECTING..." : currentServer?.ip}
            </div>
            <div
              className={`text-sm font-mono ${
                isVPNActive ? "text-neon-green" : "text-red-400"
              }`}
            >
              {isLoading
                ? "Please wait..."
                : `${currentServer?.city}, ${currentServer?.country}`}
            </div>
          </div>
        </div>

        {/* VPN Toggle Button */}
        <motion.button
          onClick={toggleVPN}
          disabled={isLoading}
          className={`w-full py-3 px-6 font-mono font-bold rounded-lg border-2 transition-all ${
            isVPNActive
              ? "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
              : "bg-neon-green/20 border-neon-green text-neon-green hover:bg-neon-green/30"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading
            ? "PROCESSING..."
            : isVPNActive
            ? "DISCONNECT VPN"
            : "CONNECT VPN"}
        </motion.button>

        <div className="mt-4 text-xs font-mono text-text-gray text-center">
          This is a demonstration. For actual IP protection, use a real VPN
          service.
        </div>
      </div>
    </motion.div>
  );
}
