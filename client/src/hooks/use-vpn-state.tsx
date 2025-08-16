import { useState, useEffect, useCallback } from "react";
import countries from "@/data/countries.json";
import { useIPState } from "./use-ip-state";

interface Country {
  name: string;
  flag: string;
  ip: string;
  city: string;
  ping: number;
  load: number;
}

export function useVpnState() {
  const [currentServerIndex, setCurrentServerIndex] = useState(3); // Start with Netherlands
  const [countdown, setCountdown] = useState(60);
  const [isConnected, setIsConnected] = useState(true);
  const ipState = useIPState();

  // Get current server with consistent IP
  const currentServer = {
    ...countries[currentServerIndex],
    ip: ipState.getCurrentIP()?.ip || countries[currentServerIndex].ip
  };

  const selectCountry = useCallback((country: Country) => {
    const countryIndex = countries.findIndex(c => c.name === country.name);
    if (countryIndex !== -1) {
      setCurrentServerIndex(countryIndex);
      setCountdown(60); // Reset countdown when manually selecting
    }
  }, []);

  const nextRotationTime = `${Math.floor(countdown / 60).toString().padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`;

  // Auto-rotate servers every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCurrentServerIndex(current => (current + 1) % countries.length);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const quickConnect = useCallback(() => {
    // Find server with lowest ping
    const optimalServerIndex = countries.reduce((bestIndex, country, index) => {
      return country.ping < countries[bestIndex].ping ? index : bestIndex;
    }, 0);
    
    setCurrentServerIndex(optimalServerIndex);
    setCountdown(60);
    setIsConnected(true);
  }, []);

  return {
    currentServer,
    nextRotationTime,
    isConnected,
    selectCountry,
    disconnect,
    quickConnect,
    countdown,
    ipState
  };
}
