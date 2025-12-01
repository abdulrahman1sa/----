import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Crown, Terminal } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = ["K", "F", "O"];

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      size: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.2,
    })), []
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
          initial={{ bottom: -20, opacity: 0 }}
          animate={{ 
            bottom: "110%", 
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
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

function CreativeParticlesTransition({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'gather' | 'form' | 'scatter'>('gather');
  
  const particles = useMemo(() => {
    const points: { id: number; startX: number; startY: number; targetX: number; targetY: number; size: number; delay: number }[] = [];
    
    const text = "بديع";
    const letterSpacing = 80;
    const startX = 50 - (text.length * letterSpacing) / 2 / 4;
    
    const letterPatterns: { [key: string]: number[][] } = {
      'ب': [
        [0, 0], [1, 0], [2, 0], [3, 0],
        [3, 1], [3, 2],
        [0, 2], [1, 2], [2, 2],
        [1.5, 3.5]
      ],
      'د': [
        [0, 0], [1, 0], [2, 0],
        [2, 1], [2, 2],
        [0, 2], [1, 2]
      ],
      'ي': [
        [0, 0], [1, 0], [2, 0], [3, 0],
        [0, 1], [3, 1],
        [0, 2], [1, 2], [2, 2], [3, 2],
        [1, 3.5], [2, 3.5]
      ],
      'ع': [
        [1, 0], [2, 0],
        [0, 1], [2, 1],
        [0, 2], [1, 2], [2, 2]
      ]
    };

    let id = 0;
    const scale = 12;
    const baseY = 45;

    text.split('').forEach((char, charIndex) => {
      const pattern = letterPatterns[char] || [];
      const offsetX = startX + (text.length - 1 - charIndex) * letterSpacing / 4;
      
      pattern.forEach(([px, py]) => {
        for (let i = 0; i < 3; i++) {
          points.push({
            id: id++,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            targetX: offsetX + px * scale / 4 + (Math.random() - 0.5) * 2,
            targetY: baseY + py * scale / 4 + (Math.random() - 0.5) * 2,
            size: 3 + Math.random() * 4,
            delay: Math.random() * 0.3,
          });
        }
      });
    });

    for (let i = 0; i < 50; i++) {
      points.push({
        id: id++,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        targetX: 30 + Math.random() * 40,
        targetY: 40 + Math.random() * 20,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.5,
      });
    }

    return points;
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('form'), 800);
    const timer2 = setTimeout(() => setPhase('scatter'), 2200);
    const timer3 = setTimeout(() => onComplete(), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={
            phase === 'gather' ? {
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              opacity: 1,
              scale: 1,
            } : phase === 'form' ? {
              left: `${particle.targetX}%`,
              top: `${particle.targetY}%`,
              opacity: 1,
              scale: 1,
            } : {
              left: `${50 + (Math.random() - 0.5) * 200}%`,
              top: `${50 + (Math.random() - 0.5) * 200}%`,
              opacity: 0,
              scale: 2,
            }
          }
          transition={{
            duration: phase === 'scatter' ? 0.8 : 0.6,
            delay: particle.delay,
            ease: phase === 'form' ? "easeOut" : "easeIn",
          }}
        />
      ))}

      {phase === 'form' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </motion.div>
      )}

      {phase === 'scatter' && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
      )}
    </motion.div>
  );
}

interface AccessGateProps {
  children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const [isGranted, setIsGranted] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [successIndex, setSuccessIndex] = useState<number>(-1);
  const [showTransition, setShowTransition] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      
      let idx = 0;
      const interval = setInterval(() => {
        setSuccessIndex(idx);
        idx++;
        if (idx > 3) {
          clearInterval(interval);
          setIsUnlocking(true);
          setShowTransition(true);
        }
      }, 120);
    } else {
      setError(true);
      triggerHaptic('error');
      setDigits(["", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => {
        setError(false);
      }, 1500);
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
        {showTransition && <CreativeParticlesTransition onComplete={handleTransitionComplete} />}
      </AnimatePresence>

      <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px]" 
        />
        
        <FloatingParticles />

        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src={logo} 
                alt="BADII" 
                className="h-20 md:h-24 w-auto mx-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-center gap-3" dir="ltr">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.08 }}
                      className="relative"
                    >
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
                            ? "border-red-500/70 bg-red-500/10 animate-shake text-red-400" 
                            : successIndex >= index
                              ? "border-white bg-white/20" 
                              : digits[index]
                                ? "border-white/40 bg-white/10"
                                : "border-white/15 hover:border-white/25 focus:border-white/40 focus:bg-white/5"
                          }
                        `}
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
                    </motion.div>
                  ))}
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-red-400 text-xs font-medium text-center"
                    >
                      الكود غير صحيح
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={digits.some(d => !d) || isUnlocking}
                className="w-full h-14 text-lg font-bold rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                data-testid="button-submit-code"
              >
                {isUnlocking ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                    >
                      <Terminal className="w-5 h-5" />
                    </motion.span>
                    جارٍ الدخول...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    دخول
                  </span>
                )}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <p className="text-xs text-white/25 mb-2">ليس لديك كود؟</p>
              <a 
                href="https://wa.me/966509567267?text=مرحباً، أريد الحصول على كود الدخول لموقع BADII"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs"
              >
                تواصل معنا عبر واتساب
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-0 right-0 text-center"
          >
            <p className="text-white/50 text-sm font-medium">hello@badii.cloud</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
