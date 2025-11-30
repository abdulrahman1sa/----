import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef, useState, useEffect } from "react";
import { 
  Sparkles, 
  Target, 
  Eye, 
  Heart,
  ArrowLeft,
  MessageCircle,
  Lightbulb,
  Rocket,
  Zap,
  Award,
  TrendingUp,
  Users,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.png";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            opacity: 0 
          }}
          animate={{ 
            y: -50,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const stats = [
    { value: 2024, suffix: "", label: "سنة التأسيس", icon: Award },
    { value: 100, suffix: "%", label: "رضا العملاء", icon: Heart },
    { value: 48, suffix: "h", label: "متوسط التسليم", icon: Zap },
  ];

  const timeline = [
    {
      title: "الفكرة",
      description: "لاحظنا أن أصحاب المشاريع يملكون منتجات رائعة لكن يفتقرون لأدوات التسويق البصري",
      icon: Lightbulb,
    },
    {
      title: "الحل",
      description: "استخدام الذكاء الاصطناعي لتحويل صور بسيطة إلى محتوى تسويقي احترافي",
      icon: Sparkles,
    },
    {
      title: "الانطلاق",
      description: "أطلقنا بديع لتمكين كل صاحب مشروع من المنافسة بمحتوى عالي الجودة",
      icon: Rocket,
    },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "الإبداع",
      description: "نبتكر حلولاً فريدة تميز عملاءنا"
    },
    {
      icon: Rocket,
      title: "السرعة", 
      description: "نسلّم المشاريع بسرعة استثنائية"
    },
    {
      icon: Heart,
      title: "الشغف",
      description: "نتعامل مع كل مشروع كأنه مشروعنا"
    },
    {
      icon: TrendingUp,
      title: "النتائج",
      description: "نركز على تحقيق أهداف عملائنا"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground" dir="rtl">
      <FloatingParticles />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-zinc-500/10 rounded-full blur-[120px] -z-10" 
      />

      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <img src={logo} alt="BADII Logo" className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform" />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-white/5">
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
          
          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">من نحن</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-tight">
                  نحول <span className="text-primary">الرؤية</span>
                  <br />
                  إلى <span className="text-primary">واقع</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  نؤمن بأن كل منتج يستحق أن يُروى بطريقة استثنائية تلمس القلوب وتحرك المبيعات
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 opacity-60" />
                      <div className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
              <motion.div 
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                رحلة <span className="text-primary">بديع</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                من فكرة بسيطة إلى منصة إبداعية متكاملة
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
              <div className="absolute right-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative mb-12 md:mr-20"
                >
                  <div className="absolute right-0 top-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hidden md:flex">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, x: -10 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-4 md:hidden">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold font-heading">{item.title}</h3>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-4 hidden md:block group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold font-heading">رؤيتنا</h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      أن نكون الشريك الإبداعي الأول لكل صاحب مشروع يريد أن يروي قصة منتجه بطريقة تلمس القلوب وتحرك المبيعات.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold font-heading">مهمتنا</h2>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      تمكين أصحاب المشاريع من المنافسة بمحتوى بصري عالي الجودة دون الحاجة لميزانيات ضخمة أو خبرة تقنية.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">قيمنا</h2>
              <p className="text-xl text-muted-foreground">المبادئ التي نعمل بها</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full hover:border-primary/30 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <value.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/20 rounded-[40px] blur-3xl" />
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 md:p-16 text-center">
                  <Quote className="w-12 h-12 text-primary/40 mx-auto mb-8 rotate-180" />
                  <p className="text-2xl md:text-3xl font-heading leading-relaxed mb-10 text-foreground/90">
                    "نحن لا نصنع صوراً فقط... نحن نروي قصصاً تُحرّك المشاعر وتصنع المبيعات"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                      ب
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-heading text-lg">فريق بديع</div>
                      <div className="text-muted-foreground text-sm">الشريك الإبداعي</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/30"
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                مستعد تبدأ <span className="text-primary">رحلتك</span> معنا؟
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                تواصل معنا اليوم ودعنا نحول صور منتجاتك إلى قصص نجاح
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/#booking">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-2xl gap-3 px-8 py-7 text-lg shadow-xl shadow-primary/30">
                      <Sparkles className="w-5 h-5" />
                      احجز استشارة مجانية
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-2xl gap-3 px-8 py-7 text-lg border-white/20 hover:bg-white/5"
                    onClick={() => window.open('https://wa.me/966509567267?text=مرحباً، أريد معرفة المزيد عن خدماتكم', '_blank')}
                  >
                    <MessageCircle className="w-5 h-5" />
                    تواصل واتساب
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <img src={logo} alt="BADII" className="h-10 w-auto mx-auto mb-4 opacity-60" />
          <p className="text-sm text-muted-foreground">© 2024 بديع. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
