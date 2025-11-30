import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = ["K", "F", "O"];

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10,
      size: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
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

interface AccessGateProps {
  children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const [isGranted, setIsGranted] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [successIndex, setSuccessIndex] = useState<number>(-1);
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
          setTimeout(() => {
            setIsGranted(true);
          }, 800);
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
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px]" 
            />
            
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
                  className="mb-8 relative"
                >
                  <div className="relative inline-block">
                    <img 
                      src={logo} 
                      alt="BADII" 
                      className="h-20 md:h-28 w-auto mx-auto mb-6"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      initial={{ x: "-200%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                    <Lock className="w-4 h-4" />
                    <span>دخول حصري</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    مرحباً بك في عالم
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-zinc-500">
                      الإبداع الحصري
                    </span>
                  </h1>
                  
                  <p className="text-muted-foreground text-lg">
                    أدخل كود الدخول للوصول إلى تجربتك الإبداعية
                  </p>
                </motion.div>

                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div className="flex justify-center gap-3 md:gap-4 direction-ltr" dir="ltr">
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
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
                              w-16 h-20 md:w-20 md:h-24 
                              text-center text-3xl md:text-4xl font-bold 
                              bg-background/50 backdrop-blur-sm 
                              border-2 rounded-2xl
                              outline-none
                              transition-all duration-300
                              ${error 
                                ? "border-red-500 bg-red-500/10 animate-shake" 
                                : successIndex >= index
                                  ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20" 
                                  : digits[index]
                                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                    : "border-muted hover:border-primary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                              }
                            `}
                            data-testid={`input-code-${index}`}
                          />
                          
                          {successIndex >= index && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                          
                          {digits[index] && successIndex < 0 && !error && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 rounded-2xl pointer-events-none"
                              style={{
                                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)"
                              }}
                            />
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
                          className="absolute -bottom-8 inset-x-0 text-red-500 text-sm font-medium"
                        >
                          الكود غير صحيح، حاول مرة أخرى
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={successIndex >= 3 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={digits.some(d => !d) || isUnlocking}
                      className={`w-full h-14 text-lg rounded-xl transition-all duration-300 ${
                        isUnlocking || successIndex >= 3
                          ? "bg-green-500 hover:bg-green-500 shadow-lg shadow-green-500/30" 
                          : "bg-primary hover:bg-primary/90"
                      }`}
                      data-testid="button-submit-code"
                    >
                      {isUnlocking ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>جارٍ الدخول...</span>
                        </motion.div>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ArrowLeft className="w-5 h-5" />
                          دخول
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-12 text-sm text-muted-foreground"
                >
                  ليس لديك كود؟{" "}
                  <a 
                    href="https://wa.me/966509567267?text=مرحباً، أريد الحصول على كود الدخول لموقع BADII"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    تواصل معنا عبر واتساب
                  </a>
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 text-center text-sm text-muted-foreground"
              >
                <p>hello@badii.cloud</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isGranted && children}
    </>
  );
}
