import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@assets/logo.png";

const ACCESS_CODE = "KFO";
const STORAGE_KEY = "badii_access_granted";

interface AccessGateProps {
  children: React.ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const [isGranted, setIsGranted] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setIsGranted(stored === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === ACCESS_CODE) {
      setIsUnlocking(true);
      setError(false);
      
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, "true");
        setIsGranted(true);
      }, 1500);
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isGranted === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

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
                  className="mb-8"
                >
                  <img 
                    src={logo} 
                    alt="BADII" 
                    className="h-20 md:h-28 w-auto mx-auto mb-6"
                  />
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
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="أدخل الكود هنا"
                      className={`text-center text-2xl font-bold tracking-[0.5em] h-16 bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 ${
                        error 
                          ? "border-red-500 bg-red-500/10 animate-shake" 
                          : isUnlocking 
                            ? "border-green-500 bg-green-500/10" 
                            : "border-muted hover:border-primary/50 focus:border-primary"
                      }`}
                      maxLength={10}
                      disabled={isUnlocking}
                      autoFocus
                      data-testid="input-access-code"
                    />
                    
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-8 inset-x-0 text-red-500 text-sm"
                        >
                          الكود غير صحيح، حاول مرة أخرى
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!code || isUnlocking}
                    className={`w-full h-14 text-lg rounded-xl transition-all duration-300 ${
                      isUnlocking 
                        ? "bg-green-500 hover:bg-green-500" 
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
