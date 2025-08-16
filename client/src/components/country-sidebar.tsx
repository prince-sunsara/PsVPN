import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import countries from "@/data/countries.json";

interface CountrySidebarProps {
  currentServer: {
    name: string;
    ip: string;
    flag: string;
  };
  onSelectCountry: (country: any) => void;
  className?: string;
}

export default function CountrySidebar({ currentServer, onSelectCountry, className }: CountrySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="bg-hacker-bg-2/60 backdrop-blur-sm border border-neon-green/30 rounded-xl p-6 hover:border-neon-green/60 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-mono text-neon-green">Server Locations</h2>
          <div className="text-xs font-mono text-text-gray">
            {countries.length} servers
          </div>
        </div>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search locations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-neon-green/30 rounded-lg px-4 py-2 pr-10 font-mono text-sm text-white placeholder-text-gray focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-gray" size={16} />
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          {filteredCountries.map((country, index) => {
            const isActive = country.name === currentServer.name;
            
            return (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`group cursor-pointer bg-black/20 hover:bg-black/60 border transition-all duration-200 rounded-lg p-3 ${
                  isActive 
                    ? "border-neon-green/60 ring-1 ring-neon-green/30" 
                    : "border-transparent hover:border-neon-green/40"
                }`}
                onClick={() => onSelectCountry(country)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-lg">{country.flag}</div>
                  <div className="flex-1">
                    <div className={`font-mono text-sm transition-colors ${
                      isActive ? "text-neon-green" : "text-white group-hover:text-neon-green"
                    }`}>
                      {country.name}
                    </div>
                    <div className="font-mono text-xs text-text-gray">{country.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-neon-green">{country.ping}ms</div>
                    <div className="text-xs font-mono text-text-gray">{country.load}%</div>
                    {isActive && (
                      <div className="flex items-center justify-end mt-1">
                        <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse mr-1"></div>
                        <div className="text-xs font-mono text-neon-green">ACTIVE</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
