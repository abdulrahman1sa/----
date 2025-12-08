import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Crown, Sparkles, Star } from "lucide-react";
import logo from "@assets/logo.png";
import wrongCodeImage from "@assets/ابو سعيد_1764631024854.jpg";
import redemptionImage from "@assets/D4sWOGmWkAArMVN_1764631581664.jpg";

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

function PortfolioBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5 }}
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

function FloatingElements({ count = 8 }: { count?: number }) {
  const elements = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 15,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.1,
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${el.x}%`,
            width: el.size,
            height: el.size,
            opacity: el.opacity,
          }}
          initial={{ y: '100vh' }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
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
  const [showWrongCodeImage, setShowWrongCodeImage] = useState(false);
  const [showRedemptionImage, setShowRedemptionImage] = useState(false);
  const [hadWrongAttempt, setHadWrongAttempt] = useState(false);
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

  const proceedWithSuccess = () => {
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
  };

  const validateCode = (codeDigits: string[]) => {
    const isCorrect = codeDigits.every((d, i) => d === ACCESS_CODE[i]);
    
    if (isCorrect) {
      setError(false);
      triggerHaptic('success');
      playSuccessSound();
      
      if (hadWrongAttempt) {
        setShowRedemptionImage(true);
        setTimeout(() => {
          setShowRedemptionImage(false);
          proceedWithSuccess();
        }, 3000);
      } else {
        proceedWithSuccess();
      }
    } else {
      setError(true);
      setShowWrongCodeImage(true);
      setHadWrongAttempt(true);
      triggerHaptic('error');
      setDigits(["", "", ""]);
      
      setTimeout(() => {
        setShowWrongCodeImage(false);
        setError(false);
        inputRefs.current[0]?.focus();
      }, 3000);
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
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWrongCodeImage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[250] bg-black flex items-center justify-center"
          >
            <img 
              src={wrongCodeImage} 
              alt="يبن الحلال الكود KFO" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRedemptionImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[250] bg-white flex items-center justify-center"
          >
            <img 
              src={redemptionImage} 
              alt="براڤو! أحسنت!" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
        
        <PortfolioBackground />
        
        {!reducedMotion && <FloatingElements count={isMobile ? 5 : 10} />}

        <div className="relative min-h-screen flex z-30">
          
          {/* Left Side - Branding (Desktop Only) */}
          <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-10"
              >
                <img src={logo} alt="BADII" className="h-20 w-auto" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl xl:text-6xl font-black font-heading text-white leading-[1.1] mb-6"
              >
                محتوى بصري
                <br />
                <span className="text-white/40">يرفع مبيعاتك</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-white/50 leading-relaxed mb-10"
              >
                نحوّل صور منتجاتك العادية لمحتوى تسويقي احترافي
                <br />
                باستخدام الذكاء الاصطناعي
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-10 h-10 rounded-full bg-white/10 border-2 border-black flex items-center justify-center"
                      >
                        <Star className="w-4 h-4 text-white/70" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white font-bold">+50 عميل</p>
                  <p className="text-white/40 text-sm">يثقون فينا</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md"
            >
              {/* Mobile Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="lg:hidden text-center mb-10"
              >
                <img src={logo} alt="BADII" className="h-16 w-auto mx-auto mb-4" />
                <p className="text-white/50 text-sm">محتوى بصري يرفع مبيعاتك</p>
              </motion.div>

              {/* Premium Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-white/5 rounded-[2.5rem] blur-xl" />
                
                {/* Main card */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10">
                  
                  {/* Top accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
                  
                  {/* VIP Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                      <Crown className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-sm font-medium">دخول VIP</span>
                      <Sparkles className="w-4 h-4 text-white/70" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-8"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-3">
                      أهلاً وسهلاً
                    </h1>
                    <p className="text-white/40 text-sm">
                      أدخل كود الوصول للمتابعة
                    </p>
                  </motion.div>

                  {/* Code Input Form */}
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="flex justify-center gap-4 mb-8" dir="ltr">
                      {[0, 1, 2].map((index) => (
                        <motion.div 
                          key={index} 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
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
                              w-[70px] h-[85px] md:w-20 md:h-24
                              text-center text-3xl md:text-4xl font-bold 
                              bg-white/[0.03]
                              border-2 rounded-2xl
                              outline-none
                              transition-all duration-300
                              text-white
                              ${error 
                                ? "border-white/60 bg-white/10 animate-pulse" 
                                : successIndex >= index
                                  ? "border-white bg-white/20" 
                                  : digits[index]
                                    ? "border-white/40 bg-white/[0.08]"
                                    : "border-white/15 hover:border-white/30 focus:border-white/50 focus:bg-white/[0.06]"
                              }
                            `}
                            data-testid={`input-code-${index}`}
                          />
                          
                          {/* Success checkmark */}
                          {successIndex >= index && (
                            <motion.div 
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                      >
                        <p className="text-white/60 text-sm font-medium">
                          الكود غير صحيح، حاول مرة ثانية
                        </p>
                      </motion.div>
                    )}

                    {/* Hint */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                        <Lock className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-white/30 text-xs">كود الدخول مكون من ٣ أحرف</span>
                      </div>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 text-center"
              >
                <p className="text-white/30 text-sm">hello@badii.cloud</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
