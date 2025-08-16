import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Shield, Code, Download, ExternalLink, AlertTriangle } from "lucide-react";

const implementationOptions = [
  {
    title: "Browser-Based Proxy (Possible)",
    difficulty: "Beginner",
    feasibility: "High",
    description: "Implement HTTP/HTTPS proxy through browser extensions or web workers",
    requirements: [
      "Browser Extension Development",
      "Proxy server setup",
      "CORS configuration",
      "SSL certificate handling"
    ],
    limitations: [
      "Only works for web traffic",
      "No system-level protection",
      "Limited to browser requests",
      "Requires user permission"
    ],
    implementation: "Chrome Extension API + Proxy Auto-Config (PAC)"
  },
  {
    title: "WebRTC/WebSocket Tunnel",
    difficulty: "Intermediate", 
    feasibility: "Medium",
    description: "Create encrypted tunnels using WebRTC data channels",
    requirements: [
      "WebRTC peer connections",
      "STUN/TURN servers", 
      "Signaling server",
      "Custom protocol implementation"
    ],
    limitations: [
      "Complex NAT traversal",
      "Firewall restrictions",
      "Limited by browser security",
      "Performance overhead"
    ],
    implementation: "WebRTC + Custom Signaling + Encryption"
  },
  {
    title: "Desktop Application",
    difficulty: "Advanced",
    feasibility: "High",
    description: "Build native VPN client with system-level network control",
    requirements: [
      "System administration privileges",
      "Network interface manipulation",
      "VPN protocols (OpenVPN, WireGuard)",
      "Platform-specific networking APIs"
    ],
    limitations: [
      "Requires installation",
      "Platform-specific code",
      "Admin privileges needed",
      "Complex deployment"
    ],
    implementation: "Electron + Node.js + Native Modules"
  },
  {
    title: "Full VPN Infrastructure",
    difficulty: "Expert",
    feasibility: "High (with resources)",
    description: "Complete VPN service with global server network",
    requirements: [
      "Global server infrastructure",
      "VPN protocol implementation",
      "User authentication system",
      "Payment processing",
      "Legal compliance (GDPR, etc.)",
      "24/7 monitoring"
    ],
    limitations: [
      "Extremely high cost",
      "Legal complexities",
      "Ongoing maintenance",
      "Scalability challenges"
    ],
    implementation: "Cloud Infrastructure + VPN Protocols + Full Stack"
  }
];

export default function VPNImplementationGuide() {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Code className="text-neon-green" size={20} />
          <h3 className="text-lg font-mono text-neon-green">ACTUAL VPN IMPLEMENTATION OPTIONS</h3>
        </div>

        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-yellow-400" size={16} />
            <span className="text-yellow-400 font-mono text-sm">IMPORTANT DISCLAIMER</span>
          </div>
          <p className="text-yellow-300 text-sm font-mono">
            This web application cannot change your actual IP address due to browser security restrictions. 
            The options below require different approaches and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {implementationOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedOption === index
                  ? 'border-neon-green bg-neon-green/10'
                  : 'border-neon-green/30 bg-black/40 hover:border-neon-green/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-mono font-bold text-neon-green mb-2">{option.title}</div>
              <div className="text-xs font-mono text-text-gray mb-1">
                Difficulty: <span className={`${
                  option.difficulty === 'Beginner' ? 'text-green-400' :
                  option.difficulty === 'Intermediate' ? 'text-yellow-400' :
                  option.difficulty === 'Advanced' ? 'text-orange-400' : 'text-red-400'
                }`}>{option.difficulty}</span>
              </div>
              <div className="text-xs font-mono text-text-gray">
                Feasibility: <span className={`${
                  option.feasibility.includes('High') ? 'text-green-400' :
                  option.feasibility.includes('Medium') ? 'text-yellow-400' : 'text-red-400'
                }`}>{option.feasibility}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detailed Information */}
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 border border-neon-green/20 rounded-lg p-6"
        >
          <h4 className="text-neon-green font-mono font-bold mb-4">
            {implementationOptions[selectedOption].title}
          </h4>
          
          <p className="text-white font-mono text-sm mb-4">
            {implementationOptions[selectedOption].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-neon-green font-mono text-sm mb-2">REQUIREMENTS:</h5>
              <ul className="space-y-1">
                {implementationOptions[selectedOption].requirements.map((req, i) => (
                  <li key={i} className="text-text-gray font-mono text-xs flex items-center">
                    <div className="w-1 h-1 bg-neon-green rounded-full mr-2"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-red-400 font-mono text-sm mb-2">LIMITATIONS:</h5>
              <ul className="space-y-1">
                {implementationOptions[selectedOption].limitations.map((limit, i) => (
                  <li key={i} className="text-text-gray font-mono text-xs flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded">
            <div className="text-neon-green font-mono text-xs mb-1">IMPLEMENTATION APPROACH:</div>
            <div className="text-white font-mono text-sm">
              {implementationOptions[selectedOption].implementation}
            </div>
          </div>
        </motion.div>

        {/* Quick Start Options */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.a
            href="https://developer.chrome.com/docs/extensions/reference/proxy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-black/40 border border-neon-green/30 rounded-lg hover:border-neon-green/60 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <ExternalLink className="text-neon-green" size={16} />
            <span className="text-neon-green font-mono text-sm">Chrome Extension Guide</span>
          </motion.a>

          <motion.a
            href="https://webrtc.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-black/40 border border-neon-green/30 rounded-lg hover:border-neon-green/60 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <ExternalLink className="text-neon-green" size={16} />
            <span className="text-neon-green font-mono text-sm">WebRTC Documentation</span>
          </motion.a>

          <motion.a
            href="https://www.wireguard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-black/40 border border-neon-green/30 rounded-lg hover:border-neon-green/60 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <ExternalLink className="text-neon-green" size={16} />
            <span className="text-neon-green font-mono text-sm">WireGuard Protocol</span>
          </motion.a>
        </div>

        <div className="mt-6 text-center">
          <div className="text-neon-green font-mono text-sm mb-2">NEXT STEPS</div>
          <div className="text-text-gray font-mono text-xs">
            Would you like me to start implementing any of these approaches or explore specific VPN technologies?
          </div>
        </div>
      </div>
    </motion.div>
  );
}