import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Crown, Terminal } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = ["K", "F", "O"];

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 4,
      opacity: 0.05 + Math.random() * 0.15,
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

function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 border border-white/3 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-60 h-60 border border-white/5 rounded-full"
      />
    </div>
  );
}

function GlitchTransition() {
  const lines = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      y: (i / 30) * 100,
      delay: Math.random() * 0.3,
      width: 50 + Math.random() * 50,
    })), []
  );

  return (
    <motion.div 
      className="fixed inset-0 z-[200] pointer-events-none bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute left-0 h-[4px] bg-white"
          style={{ top: `${line.y}%` }}
          initial={{ width: 0, x: 0 }}
          animate={{ 
            width: [`${line.width}%`, "100%", "100%", 0],
            x: [0, 0, 0, "100%"],
            opacity: [1, 1, 0.8, 0]
          }}
          transition={{ 
            duration: 0.8, 
            delay: line.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.4, 0.5, 0.6, 1] }}
      />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
      >
        <motion.div
          animate={{ 
            x: [-2, 2, -2, 0],
            opacity: [1, 0.5, 1, 0.8]
          }}
          transition={{ duration: 0.1, repeat: 5 }}
          className="text-black text-4xl font-mono font-bold tracking-widest"
        >
          ACCESS GRANTED
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)"
        }}
        animate={{ y: [0, 4] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />
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
  const [showGlitch, setShowGlitch] = useState(false);
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
          setShowGlitch(true);
          setIsUnlocking(true);
          setTimeout(() => {
            setIsGranted(true);
          }, 1000);
        }
      }, 150);
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

  return (
    <>
      <AnimatePresence>
        {showGlitch && <GlitchTransition />}
      </AnimatePresence>

      <AnimatePresence>
        {!isGranted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[180px]" 
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px]" 
            />
            
            <GeometricShapes />
            <FloatingParticles />

            <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center max-w-md w-full"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-10 relative"
                >
                  <div className="relative inline-block">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(255, 255, 255, 0.1)",
                          "0 0 60px rgba(255, 255, 255, 0.2)",
                          "0 0 20px rgba(255, 255, 255, 0.1)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full blur-xl"
                    />
                    <img 
                      src={logo} 
                      alt="BADII" 
                      className="h-24 md:h-32 w-auto mx-auto mb-6 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      initial={{ x: "-200%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-10"
                >
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] text-white text-sm mb-6 shadow-xl"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">دخول VIP حصري</span>
                    <Lock className="w-4 h-4" />
                  </motion.div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5 leading-tight text-white">
                    <span>مرحباً بك في</span>
                    <span className="block text-white/80">
                      عالم بديع
                    </span>
                  </h1>
                  
                  <p className="text-white/50 text-lg leading-relaxed">
                    أدخل كود الدخول الخاص بك للوصول
                    <br />
                    <span className="text-white/30 text-sm">للأعضاء المميزين فقط</span>
                  </p>
                </motion.div>

                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="relative">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl">
                      <div className="flex justify-center gap-4 md:gap-5 direction-ltr" dir="ltr">
                        {[0, 1, 2].map((index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="relative group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
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
                                relative
                                w-18 h-22 md:w-22 md:h-26 
                                text-center text-4xl md:text-5xl font-bold 
                                bg-white/[0.05] backdrop-blur-xl
                                border-2 rounded-2xl
                                outline-none
                                transition-all duration-300
                                text-white
                                ${error 
                                  ? "border-red-500 bg-red-500/10 animate-shake text-red-400" 
                                  : successIndex >= index
                                    ? "border-white bg-white/20 shadow-lg shadow-white/20" 
                                    : digits[index]
                                      ? "border-white/50 bg-white/10 shadow-lg shadow-white/10"
                                      : "border-white/10 hover:border-white/30 focus:border-white/50 focus:shadow-lg focus:shadow-white/10 focus:bg-white/5"
                                }
                              `}
                              style={{ width: '72px', height: '88px' }}
                              data-testid={`input-code-${index}`}
                            />
                            
                            {successIndex >= index && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/30"
                              >
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 text-red-400 text-sm font-medium text-center"
                          >
                            الكود غير صحيح، حاول مرة أخرى
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.div
                    animate={successIndex >= 3 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={digits.some(d => !d) || isUnlocking}
                      className={`w-full h-16 text-xl font-bold rounded-2xl transition-all duration-500 ${
                        isUnlocking || successIndex >= 3
                          ? "bg-white text-black hover:bg-white shadow-2xl shadow-white/30" 
                          : "bg-white text-black hover:bg-white/90 shadow-xl shadow-white/20"
                      }`}
                      data-testid="button-submit-code"
                    >
                      {isUnlocking ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            <Terminal className="w-6 h-6" />
                          </motion.div>
                          <span>جارٍ الدخول...</span>
                        </motion.div>
                      ) : (
                        <span className="flex items-center gap-3">
                          <ArrowLeft className="w-6 h-6" />
                          دخول
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-10"
                >
                  <p className="text-sm text-white/30 mb-3">
                    ليس لديك كود؟
                  </p>
                  <a 
                    href="https://wa.me/966509567267?text=مرحباً، أريد الحصول على كود الدخول لموقع BADII"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium"
                  >
                    <span>تواصل معنا عبر واتساب</span>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 text-center"
              >
                <p className="text-sm text-white/20">hello@badii.cloud</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isGranted && children}
    </>
  );
}
