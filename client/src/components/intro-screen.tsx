import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const hackerPhrases = [
  "BYPASSING FIREWALL...",
  "ENCRYPTING TUNNEL...",
  "MASKING IP ADDRESS...",
  "INITIALIZING GHOST PROTOCOL...",
  "SECURING CONNECTION...",
  "ACCESS GRANTED"
];

export default function IntroScreen() {
  const [currentText, setCurrentText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showMainText, setShowMainText] = useState(false);
  const [fallingCode, setFallingCode] = useState<Array<{id: number, char: string, delay: number}>>([]);
  
  const mainText = "Hello, Hackers";
  const subText = "Welcome to PSVPN";
  const descText = "Military-grade encryption • Zero-log policy • Anonymous browsing";

  // Initialize falling code
  useEffect(() => {
    const codes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? '1' : '0',
      delay: Math.random() * 2000
    }));
    setFallingCode(codes);
  }, []);

  // Phase 1: Show hacker phrases
  useEffect(() => {
    const phraseTimer = setInterval(() => {
      if (currentPhrase < hackerPhrases.length - 1) {
        setCurrentPhrase(prev => prev + 1);
      } else {
        clearInterval(phraseTimer);
        setTimeout(() => setShowMainText(true), 500);
      }
    }, 400);

    return () => clearInterval(phraseTimer);
  }, [currentPhrase]);

  // Phase 2: Type main text
  useEffect(() => {
    if (!showMainText) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= mainText.length) {
        setCurrentText(mainText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [showMainText]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Falling Code Background */}
      <div className="absolute inset-0">
        {fallingCode.map((code) => (
          <motion.div
            key={code.id}
            className="absolute text-neon-green font-mono text-sm opacity-60"
            style={{
              left: `${(code.id * 3) % 100}%`,
              top: '-50px'
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3,
              delay: code.delay / 1000,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {code.char}
          </motion.div>
        ))}
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="text-center relative z-10">
        {!showMainText ? (
          // Phase 1: Hacker initialization
          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="text-lg md:text-xl font-mono text-neon-green mb-4 tracking-wider">
              {hackerPhrases[currentPhrase]}
            </div>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-neon-green rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          // Phase 2: Main content
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-mono text-neon-green mb-4 overflow-hidden whitespace-nowrap border-r-4 border-neon-green animate-blink-caret"
              style={{
                textShadow: "0 0 15px #00ff7f"
              }}
            >
              {currentText}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-mono text-white mb-6 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              {subText}
            </motion.h2>
            
            <motion.div
              className="text-sm md:text-base font-mono text-text-gray max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <div className="border border-neon-green/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse mr-2"></div>
                  <span className="text-neon-green text-xs">ULTRA SECURE</span>
                </div>
                <div className="text-center">{descText}</div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8 text-xs font-mono text-text-gray"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Establishing encrypted tunnel...
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Glitch Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-neon-green mix-blend-screen opacity-0"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 3 }}
      />
    </motion.div>
  );
}
