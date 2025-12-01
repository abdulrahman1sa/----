import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ArrowLeft, Crown, Star } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = ["K", "F", "O"];

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 6,
      opacity: 0.1 + Math.random() * 0.4,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
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
        className="absolute -top-20 -right-20 w-80 h-80 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 border border-primary/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-60 h-60 border border-zinc-500/10 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/4 w-4 h-4 bg-primary/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-1/3 w-3 h-3 bg-primary/40 rounded-full blur-sm"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-20 w-5 h-5 bg-zinc-400/20 rounded-full blur-sm"
      />
    </div>
  );
}

function SuccessExplosion() {
  const stars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * 360,
      distance: 100 + Math.random() * 150,
      delay: Math.random() * 0.3,
      size: 8 + Math.random() * 16,
      duration: 0.8 + Math.random() * 0.4,
    })), []
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ 
            scale: 0, 
            x: 0, 
            y: 0,
            opacity: 1 
          }}
          animate={{ 
            scale: [0, 1.5, 0],
            x: Math.cos(star.angle * Math.PI / 180) * star.distance,
            y: Math.sin(star.angle * Math.PI / 180) * star.distance,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: star.duration, 
            delay: star.delay,
            ease: "easeOut"
          }}
          className="absolute"
        >
          <Star 
            className="text-primary fill-primary" 
            style={{ width: star.size, height: star.size }}
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3, 4], opacity: [0.8, 0.4, 0] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-32 h-32 rounded-full bg-primary/30 blur-xl"
      />
    </div>
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
  const [showExplosion, setShowExplosion] = useState(false);
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
          setShowExplosion(true);
          setIsUnlocking(true);
          setTimeout(() => {
            setIsGranted(true);
          }, 1200);
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
        {!isGranted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[180px]" 
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zinc-500/10 rounded-full blur-[150px]" 
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" 
            />
            
            <GeometricShapes />
            <FloatingParticles />
            
            {showExplosion && <SuccessExplosion />}

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
                          "0 0 20px rgba(139, 92, 246, 0.3)",
                          "0 0 60px rgba(139, 92, 246, 0.5)",
                          "0 0 20px rgba(139, 92, 246, 0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full blur-xl"
                    />
                    <img 
                      src={logo} 
                      alt="BADII" 
                      className="h-24 md:h-32 w-auto mx-auto mb-6 relative z-10 drop-shadow-2xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] text-primary text-sm mb-6 shadow-xl shadow-black/5"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">دخول VIP حصري</span>
                    <Lock className="w-4 h-4" />
                  </motion.div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5 leading-tight">
                    <span className="text-foreground">مرحباً بك في</span>
                    <motion.span 
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-primary bg-[length:200%_auto]"
                    >
                      عالم بديع
                    </motion.span>
                  </h1>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    أدخل كود الدخول الخاص بك للوصول
                    <br />
                    <span className="text-primary/70 text-sm">للأعضاء المميزين فقط ✨</span>
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
                    <motion.div 
                      className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl -z-10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-8 shadow-2xl shadow-black/10">
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
                              className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                                bg-white/[0.08] backdrop-blur-xl
                                border-2 rounded-2xl
                                outline-none
                                transition-all duration-300
                                ${error 
                                  ? "border-red-500 bg-red-500/10 animate-shake text-red-400" 
                                  : successIndex >= index
                                    ? "border-green-500 bg-green-500/15 shadow-lg shadow-green-500/30 text-green-400" 
                                    : digits[index]
                                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 text-primary"
                                      : "border-white/20 hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/20 focus:bg-primary/5"
                                }
                              `}
                              style={{ width: '72px', height: '88px' }}
                              data-testid={`input-code-${index}`}
                            />
                            
                            {successIndex >= index && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                              >
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            ❌ الكود غير صحيح، حاول مرة أخرى
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
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-500 shadow-2xl shadow-green-500/40" 
                          : "bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 shadow-xl shadow-primary/30"
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
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-6 h-6" />
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
                  <p className="text-sm text-muted-foreground mb-3">
                    ليس لديك كود؟
                  </p>
                  <a 
                    href="https://wa.me/966509567267?text=مرحباً، أريد الحصول على كود الدخول لموقع BADII"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-full text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-sm font-medium"
                  >
                    <span>تواصل معنا عبر واتساب</span>
                    <span>💬</span>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 text-center"
              >
                <p className="text-sm text-muted-foreground/60">hello@badii.cloud</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isGranted && children}
    </>
  );
}
