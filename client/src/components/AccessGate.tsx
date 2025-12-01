import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, Sparkles, Camera, FileText, Video } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = ["K", "F", "O"];

const services = [
  { icon: Camera, label: "تصوير" },
  { icon: FileText, label: "محتوى" },
  { icon: Video, label: "فيديو" },
];

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

function ServicesRow() {
  return (
    <motion.div 
      className="flex justify-center items-center gap-6 md:gap-8 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center gap-2 group cursor-default"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/[0.05]">
            <service.icon className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors duration-300">
            {service.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LogoGlowTransition({ onComplete, reducedMotion }: { 
  onComplete: () => void; 
  reducedMotion: boolean;
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, reducedMotion ? 600 : 1800);
    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src={logo} 
          alt="BADII" 
          className="h-24 md:h-28 w-auto"
        />
      </motion.div>
      
      <motion.p
        className="absolute bottom-20 text-white/30 text-sm font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        جارٍ الدخول...
      </motion.p>
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
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    playTone(523.25, now, 0.12);
    playTone(659.25, now + 0.08, 0.12);
    playTone(783.99, now + 0.16, 0.2);
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const triggerHaptic = useCallback((type: 'success' | 'error' | 'tap') => {
    if ('vibrate' in navigator) {
      switch (type) {
        case 'success':
          navigator.vibrate([30, 30, 30]);
          break;
        case 'error':
          navigator.vibrate([50, 30, 50]);
          break;
        case 'tap':
          navigator.vibrate(5);
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
      }, 400);
    } else {
      setError(true);
      setShakeError(true);
      triggerHaptic('error');
      setDigits(["", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => {
        setError(false);
        setShakeError(false);
      }, 1200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCode(digits);
  };

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
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
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
        <div className="relative min-h-screen flex flex-col items-center justify-center px-8 py-16 z-30">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <img 
                src={logo} 
                alt="BADII" 
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-10"
            >
              <h1 className="text-xl md:text-2xl font-light text-white/90 mb-2 tracking-wide">
                استوديو الذكاء الاصطناعي
              </h1>
              <p className="text-sm text-white/40 font-light">
                للمحتوى الإبداعي
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleSubmit}
            >
              <div className="rounded-2xl p-8 bg-white/[0.02] border border-white/[0.04]">
                <p className="text-white/30 text-xs mb-6 font-light">أدخل كود الدخول</p>
                
                <motion.div 
                  className="flex justify-center gap-4" 
                  dir="ltr"
                  animate={shakeError ? { 
                    x: [0, -8, 8, -8, 8, -4, 4, 0] 
                  } : { x: 0 }}
                  transition={{ duration: 0.4 }}
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
                          w-14 h-16 md:w-16 md:h-18
                          text-center text-2xl md:text-3xl font-light 
                          bg-transparent
                          border rounded-lg
                          outline-none
                          transition-all duration-300
                          text-white/90
                          ${error 
                            ? "border-red-400/40 text-red-400/80" 
                            : successIndex >= index
                              ? "border-white/40" 
                              : digits[index]
                                ? "border-white/20"
                                : "border-white/[0.06] hover:border-white/10 focus:border-white/20"
                          }
                        `}
                        data-testid={`input-code-${index}`}
                      />
                      
                      {successIndex >= index && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-white/90 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
                
                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 text-red-400/70 text-xs font-light"
                    >
                      كود غير صحيح، حاول مرة أخرى
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>

            <ServicesRow />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex justify-center gap-4"
            >
              <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                <Sparkles className="w-3 h-3" />
                <span>AI</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                <Shield className="w-3 h-3" />
                <span>آمن</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                <Lock className="w-3 h-3" />
                <span>مشفر</span>
              </div>
            </motion.div>

          </motion.div>

          <motion.div 
            className="absolute bottom-8 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-white/15 text-[11px] font-light tracking-wide">hello@badii.cloud</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
