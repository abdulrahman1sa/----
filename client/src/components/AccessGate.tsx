import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Crown } from "lucide-react";
import logo from "@assets/logo.png";

import portfolio1 from "@assets/portfolio_perfume_match.jpg";
import portfolio2 from "@assets/portfolio_coffee_mud.jpg";
import portfolio3 from "@assets/portfolio_ninja_delivery.jpg";
import portfolio4 from "@assets/portfolio_shrimp_tempura.jpg";
import portfolio5 from "@assets/portfolio_honey_nuts.jpg";
import portfolio6 from "@assets/portfolio_golden_fries.jpg";

const ACCESS_CODE = ["K", "F", "O"];
const portfolioImages = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  
  return reduced;
}

function FloatingParticles({ count = 10 }: { count?: number }) {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 10,
      size: 2 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.15,
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          initial={{ y: '100vh' }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function PortfolioGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50 z-10" />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ 
            duration: 1.8,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <img 
            src={portfolioImages[currentIndex]} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LogoGlowTransition({ onComplete, isMobile, reducedMotion }: { 
  onComplete: () => void; 
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const [phase, setPhase] = useState<'appear' | 'glow' | 'ripple' | 'reveal'>('appear');

  const ringCount = isMobile ? 4 : 6;
  const rings = useMemo(() => 
    Array.from({ length: ringCount }, (_, i) => ({
      id: i,
      delay: i * 0.16,
    })), [ringCount]
  );

  useEffect(() => {
    if (reducedMotion) {
      setTimeout(() => onComplete(), 800);
      return;
    }
    
    const timers = [
      setTimeout(() => setPhase('glow'), 700),
      setTimeout(() => setPhase('ripple'), 2200),
      setTimeout(() => setPhase('reveal'), 3200),
      setTimeout(() => onComplete(), 3800),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete, reducedMotion]);

  if (reducedMotion) {
    return (
      <motion.div 
        className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={logo} alt="BADII" className="h-24 w-auto" />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={
            phase === 'appear' ? { scale: 1, opacity: 1 } :
            phase === 'glow' ? { scale: 1, opacity: 1 } :
            phase === 'ripple' ? { scale: 1.05, opacity: 1 } :
            { scale: 0.9, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            animate={phase === 'glow' ? {
              filter: [
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                "drop-shadow(0 0 50px rgba(255,255,255,0.7))",
                "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
                "drop-shadow(0 0 60px rgba(255,255,255,0.8))",
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
              ]
            } : {}}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="p-4"
          >
            <img 
              src={logo} 
              alt="BADII" 
              className="h-28 md:h-36 w-auto"
            />
          </motion.div>
        </motion.div>

        {(phase === 'ripple' || phase === 'reveal') && rings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full border-2 border-white/40"
            style={{
              width: 100,
              height: 100,
              left: '50%',
              top: '50%',
              marginLeft: -50,
              marginTop: -50,
            }}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ 
              scale: 30,
              opacity: 0,
            }}
            transition={{ 
              duration: 1.0,
              delay: ring.delay,
              ease: "easeOut"
            }}
          />
        ))}

        {phase === 'reveal' && (
          <motion.div
            className="absolute rounded-full bg-white"
            style={{
              width: 80,
              height: 80,
              left: '50%',
              top: '50%',
              marginLeft: -40,
              marginTop: -40,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 50, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          />
        )}
      </div>

      <motion.p
        className="absolute bottom-16 text-white/50 text-base font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: phase === 'glow' || phase === 'ripple' ? 1 : 0,
          y: phase === 'glow' || phase === 'ripple' ? 0 : 10
        }}
        transition={{ duration: 0.4 }}
      >
        جارٍ التحقق من الصلاحيات...
      </motion.p>
    </motion.div>
  );
}

function WelcomeOverlay({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Crown className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-5xl font-bold font-heading text-black mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          ارحب تو نور المكان
        </motion.h1>
        
        <motion.p
          className="text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          مرحباً بك في عالم بديع
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-black rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    playTone(523.25, now, 0.15);
    playTone(659.25, now + 0.1, 0.15);
    playTone(783.99, now + 0.2, 0.25);
  } catch (e) {
    console.log('Audio not supported');
  }
}

interface AccessGateProps {
  children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const [isGranted, setIsGranted] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [successIndex, setSuccessIndex] = useState<number>(-1);
  const [showTransition, setShowTransition] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const triggerHaptic = useCallback((type: 'success' | 'error' | 'tap') => {
    if ('vibrate' in navigator) {
      switch (type) {
        case 'success':
          navigator.vibrate([50, 50, 50, 50, 100]);
          break;
        case 'error':
          navigator.vibrate([100, 50, 100]);
          break;
        case 'tap':
          navigator.vibrate(10);
          break;
      }
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const char = value.toUpperCase().slice(-1);
    
    if (char && !/^[A-Z]$/.test(char)) return;
    
    triggerHaptic('tap');
    
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    
    if (char && index < 2) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (char && index === 2) {
      const fullCode = [...newDigits.slice(0, 2), char];
      setTimeout(() => validateCode(fullCode), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      validateCode(digits);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase().slice(0, 3);
    const chars = pastedData.split('').filter(c => /^[A-Z]$/.test(c));
    
    const newDigits = ["", "", ""];
    chars.forEach((char, i) => {
      if (i < 3) newDigits[i] = char;
    });
    setDigits(newDigits);
    
    if (chars.length === 3) {
      setTimeout(() => validateCode(newDigits), 100);
    } else {
      inputRefs.current[chars.length]?.focus();
    }
  };

  const validateCode = (codeDigits: string[]) => {
    const isCorrect = codeDigits.every((d, i) => d === ACCESS_CODE[i]);
    
    if (isCorrect) {
      setError(false);
      triggerHaptic('success');
      playSuccessSound();
      
      let idx = 0;
      const interval = setInterval(() => {
        setSuccessIndex(idx);
        idx++;
        if (idx > 3) {
          clearInterval(interval);
          setIsUnlocking(true);
          setShowTransition(true);
        }
      }, 1000);
    } else {
      setError(true);
      setShakeError(true);
      triggerHaptic('error');
      setDigits(["", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => {
        setError(false);
        setShakeError(false);
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCode(digits);
  };

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
    setShowWelcome(true);
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    setIsGranted(true);
  }, []);

  if (isGranted) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {showTransition && (
          <LogoGlowTransition 
            onComplete={handleTransitionComplete} 
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcome && (
          <WelcomeOverlay onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
        <PortfolioGallery />
        
        {!isMobile && (
          <>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[80px] z-20" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[60px] z-20" />
          </>
        )}
        
        {!reducedMotion && <FloatingParticles count={isMobile ? 6 : 12} />}

        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 z-30">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <img 
                src={logo} 
                alt="BADII" 
                className="h-20 md:h-24 w-auto mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-5">
                <Crown className="w-3.5 h-3.5" />
                <span>دخول VIP حصري</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-white">
                مرحباً بك في
                <span className="block text-white/70 mt-1">عالم بديع</span>
              </h1>
              
              <p className="text-white/40 text-sm">
                أدخل كود الدخول للوصول
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <motion.div 
                  className="flex justify-center gap-3" 
                  dir="ltr"
                  animate={shakeError ? { 
                    x: [0, -12, 12, -12, 12, -8, 8, -4, 4, 0] 
                  } : { x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="relative">
                      <input
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        value={digits[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        disabled={isUnlocking}
                        autoFocus={index === 0}
                        className={`
                          w-16 h-20 md:w-18 md:h-22
                          text-center text-3xl md:text-4xl font-bold 
                          bg-white/5
                          border-2 rounded-xl
                          outline-none
                          transition-all duration-200
                          text-white
                          ${error 
                            ? "border-red-500/70 bg-red-500/10 text-red-400" 
                            : successIndex >= index
                              ? "border-white bg-white/20" 
                              : digits[index]
                                ? "border-white/40 bg-white/10"
                                : "border-white/15 hover:border-white/25 focus:border-white/40 focus:bg-white/5"
                          }
                        `}
                        style={{
                          boxShadow: digits[index] && !error && successIndex < index
                            ? '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
                            : successIndex >= index
                              ? '0 0 25px rgba(255, 255, 255, 0.5), 0 0 50px rgba(255, 255, 255, 0.2)'
                              : 'none'
                        }}
                        data-testid={`input-code-${index}`}
                      />
                      
                      {successIndex >= index && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
                
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-400 text-xs font-medium text-center"
                  >
                    الكود غير صحيح
                  </motion.p>
                )}
              </div>

            </motion.form>

          </motion.div>

          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-white/40 text-sm font-medium">hello@badii.cloud</p>
          </div>
        </div>
      </div>
    </>
  );
}
