import { useState, useEffect, useCallback } from "react";

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}

interface IPState {
  realIP: IPInfo | null;
  maskedIP: IPInfo | null;
  isVPNActive: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useIPState() {
  const [ipState, setIPState] = useState<IPState>({
    realIP: null,
    maskedIP: null,
    isVPNActive: false,
    isLoading: true,
    error: null
  });

  // Fetch real IP address
  const fetchRealIP = useCallback(async () => {
    try {
      setIPState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const services = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json',
        'https://api.ipify.org?format=json'
      ];

      let ipData: IPInfo | null = null;

      for (const service of services) {
        try {
          const response = await fetch(service);
          if (response.ok) {
            const data = await response.json();
            
            if (service.includes('ipapi.co')) {
              ipData = {
                ip: data.ip,
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                country: data.country_name || 'Unknown',
                loc: `${data.latitude || 0},${data.longitude || 0}`,
                org: data.org || 'Unknown',
                timezone: data.timezone || 'Unknown'
              };
            } else if (service.includes('ipinfo.io')) {
              ipData = {
                ip: data.ip,
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                country: data.country || 'Unknown',
                loc: data.loc || '0,0',
                org: data.org || 'Unknown',
                timezone: data.timezone || 'Unknown'
              };
            } else if (service.includes('ipify')) {
              ipData = {
                ip: data.ip,
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown',
                loc: '0,0',
                org: 'Unknown',
                timezone: 'Unknown'
              };
            }
            break;
          }
        } catch (serviceError) {
          console.log(`Service ${service} failed, trying next...`);
          continue;
        }
      }

      if (ipData) {
        setIPState(prev => ({ 
          ...prev, 
          realIP: ipData, 
          isLoading: false 
        }));
        generateMaskedIP();
      } else {
        throw new Error('All IP services failed');
      }
    } catch (err) {
      setIPState(prev => ({
        ...prev,
        error: 'Unable to detect real IP. Using simulation mode.',
        realIP: {
          ip: '192.168.1.100',
          city: 'Your City',
          region: 'Your Region',
          country: 'Your Country',
          loc: '0,0',
          org: 'Your ISP',
          timezone: 'Local'
        },
        isLoading: false
      }));
      generateMaskedIP();
    }
  }, []);

  // Generate masked IP for VPN simulation
  const generateMaskedIP = useCallback(() => {
    const vpnServers = [
      {
        ip: '185.231.154.23',
        city: 'Stockholm',
        region: 'Stockholm',
        country: 'Sweden',
        loc: '59.3293,18.0686',
        org: 'PSVPN Secure Servers AB',
        timezone: 'Europe/Stockholm'
      },
      {
        ip: '89.238.183.45',
        city: 'Zurich',
        region: 'Zurich',
        country: 'Switzerland',
        loc: '47.3769,8.5417',
        org: 'PSVPN Private Network AG',
        timezone: 'Europe/Zurich'
      },
      {
        ip: '103.251.167.89',
        city: 'Singapore',
        region: 'Singapore',
        country: 'Singapore',
        loc: '1.3521,103.8198',
        org: 'PSVPN Asia Pacific Pte Ltd',
        timezone: 'Asia/Singapore'
      },
      {
        ip: '198.245.51.147',
        city: 'New York',
        region: 'New York',
        country: 'United States',
        loc: '40.7128,-74.0060',
        org: 'PSVPN Americas Inc',
        timezone: 'America/New_York'
      },
      {
        ip: '51.79.173.205',
        city: 'London',
        region: 'England',
        country: 'United Kingdom',
        loc: '51.5074,-0.1278',
        org: 'PSVPN Europe Ltd',
        timezone: 'Europe/London'
      }
    ];

    const randomServer = vpnServers[Math.floor(Math.random() * vpnServers.length)];
    setIPState(prev => ({ ...prev, maskedIP: randomServer }));
  }, []);

  // Toggle VPN connection
  const toggleVPN = useCallback(async () => {
    setIPState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate VPN connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIPState(prev => ({ 
      ...prev, 
      isVPNActive: !prev.isVPNActive, 
      isLoading: false 
    }));
  }, []);

  // Get current displayed IP (real or masked based on VPN status)
  const getCurrentIP = useCallback(() => {
    return ipState.isVPNActive ? ipState.maskedIP : ipState.realIP;
  }, [ipState.isVPNActive, ipState.maskedIP, ipState.realIP]);

  // Initialize IP detection on mount
  useEffect(() => {
    fetchRealIP();
  }, [fetchRealIP]);

  return {
    ...ipState,
    toggleVPN,
    getCurrentIP,
    refreshIP: fetchRealIP
  };
}