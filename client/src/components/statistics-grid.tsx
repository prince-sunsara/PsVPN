import { motion } from "framer-motion";
import { Download, Upload, Shield } from "lucide-react";

const statisticsData = [
  {
    label: "DOWNLOAD SPEED",
    value: "847.3",
    unit: "Mbps",
    icon: Download,
    color: "neon-green",
    bgColor: "neon-green/20"
  },
  {
    label: "UPLOAD SPEED", 
    value: "523.7",
    unit: "Mbps",
    icon: Upload,
    color: "neon-teal",
    bgColor: "neon-teal/20"
  },
  {
    label: "THREATS BLOCKED",
    value: "1,247",
    unit: "",
    icon: Shield,
    color: "red-400",
    bgColor: "red-500/20"
  }
];

export default function StatisticsGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statisticsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
          className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6 hover:border-neon-green/60 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`text-${stat.color} text-xl`} size={24} />
            </div>
            <div>
              <div className="text-xs font-mono text-text-gray mb-1">{stat.label}</div>
              <div className="text-xl font-mono text-white font-semibold">
                {stat.value} 
                {stat.unit && <span className="text-sm text-text-gray ml-1">{stat.unit}</span>}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
