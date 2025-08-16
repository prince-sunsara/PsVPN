import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface StatusBarProps {
  currentServer: {
    name: string;
    ip: string;
    flag: string;
  };
  nextRotationTime: string;
}

export default function StatusBar({
  currentServer,
  nextRotationTime,
}: StatusBarProps) {
  const statusItems = [
    {
      label: "CONNECTION STATUS",
      value: "SECURED",
      icon: (
        <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
      ),
      valueClass: "text-neon-green",
    },
    {
      label: "CURRENT IP",
      value: currentServer.ip,
      valueClass: "text-white",
    },
    {
      label: "ENCRYPTION",
      value: "AES-256",
      valueClass: "text-neon-green",
    },
    {
      label: "NEXT ROTATION",
      value: nextRotationTime,
      valueClass: "text-white",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {statusItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-lg p-4 hover:border-neon-green/60 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-text-gray mb-1">
                {item.label}
              </div>
              <div
                className={`text-lg font-mono font-semibold break-all ${item.valueClass}`}
              >
                {item.value}
              </div>
            </div>
            {item.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
