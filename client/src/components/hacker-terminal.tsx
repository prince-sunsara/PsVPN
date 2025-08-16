import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";

const hackerCommands = [
  "nmap -sS -A target.network",
  "hydra -l admin -P rockyou.txt ssh://target",
  "sqlmap -u 'http://target/login' --dbs",
  "john --wordlist=passwords.txt hashes.txt",
  "metasploit > use exploit/multi/handler",
  "wireshark -i eth0 -k",
  "aircrack-ng -w wordlist capture.cap",
  "steghide extract -sf image.jpg",
  "hashcat -m 1000 -a 0 hashes.txt wordlist.txt",
  "nikto -h http://target.com",
  "gobuster dir -u http://target -w /usr/share/wordlists/common.txt",
  "volatility -f memory.dmp imageinfo"
];

const responses = [
  "[+] Port scan completed - 22,80,443 open",
  "[+] Brute force attack initiated",
  "[+] SQL injection vulnerability detected",
  "[+] Password cracked: admin123",
  "[+] Meterpreter session established",
  "[+] Network traffic captured",
  "[+] WPA handshake captured",
  "[+] Hidden data extracted",
  "[+] Hash cracked successfully",
  "[+] 5 vulnerabilities found",
  "[+] 47 directories discovered",
  "[+] Memory dump analyzed"
];

export default function HackerTerminal() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<Array<{command: string, response: string, timestamp: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping && Math.random() < 0.4) {
        executeRandomCommand();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTyping]);

  const executeRandomCommand = async () => {
    setIsTyping(true);
    const command = hackerCommands[Math.floor(Math.random() * hackerCommands.length)];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Type command
    for (let i = 0; i <= command.length; i++) {
      setCurrentCommand(command.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add to history
    const timestamp = new Date().toTimeString().split(' ')[0];
    setCommandHistory(prev => [
      ...prev.slice(-4), // Keep only last 4 commands
      { command, response, timestamp }
    ]);
    
    setCurrentCommand("");
    setIsTyping(false);
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <div className="bg-black/80 border border-neon-green/30 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between bg-black/60 border-b border-neon-green/20 px-4 py-2">
          <div className="flex items-center space-x-2">
            <Terminal className="text-neon-green" size={16} />
            <span className="text-neon-green font-mono text-sm">PSVPN Terminal v2.1.0</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="p-4 font-mono text-sm h-48 overflow-y-auto">
          <div className="text-neon-green mb-2">
            Welcome to PSVPN Secure Terminal
            <br />
            Type 'help' for available commands
            <br />
            ---
          </div>
          
          {/* Command History */}
          {commandHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              <div className="text-text-gray">
                <span className="text-neon-green">[{entry.timestamp}]</span> root@psvpn:~# {entry.command}
              </div>
              <div className="text-green-400 ml-4">{entry.response}</div>
            </motion.div>
          ))}
          
          {/* Current Command */}
          <div className="flex items-center">
            <span className="text-neon-green mr-2">
              [{new Date().toTimeString().split(' ')[0]}] root@psvpn:~#
            </span>
            <span className="text-white">{currentCommand}</span>
            <motion.div
              className="w-2 h-4 bg-neon-green ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
        
        <div className="bg-black/60 border-t border-neon-green/20 px-4 py-2 text-xs font-mono text-text-gray">
          Status: GHOST MODE ACTIVE | Encryption: AES-256 | Logs: DISABLED
        </div>
      </div>
    </motion.div>
  );
}