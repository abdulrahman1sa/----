import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, MessageCircle } from "lucide-react";
import logo from "@assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6" dir="rtl">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px] -z-10" 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.img 
          src={logo} 
          alt="BADII" 
          className="h-16 w-auto mx-auto mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-zinc-500 mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4">
          عذراً، الصفحة غير موجودة
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8">
          يبدو أن هذه الصفحة انتقلت إلى مكان آخر أو تم حذفها
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 rounded-xl"
            onClick={() => window.location.href = '/'}
          >
            <Home className="ml-2 w-5 h-5" />
            العودة للرئيسية
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="rounded-xl"
            onClick={() => window.open('https://wa.me/966509567267?text=مرحباً، أحتاج مساعدة في الموقع', '_blank')}
          >
            <MessageCircle className="ml-2 w-5 h-5" />
            تواصل معنا
          </Button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          hello@badii.cloud
        </motion.p>
      </motion.div>
    </div>
  );
}
