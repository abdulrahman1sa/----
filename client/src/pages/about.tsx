import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useRef, useState, useEffect } from "react";
import { 
  Sparkles, 
  Target, 
  Eye, 
  Heart,
  ArrowLeft,
  ArrowUp,
  MessageCircle,
  Lightbulb,
  Rocket,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Quote,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.png";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
          data-testid="button-scroll-top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const whyChooseUs = [
    {
      icon: Sparkles,
      title: "تقنية ذكاء اصطناعي متقدمة",
      description: "نستخدم أحدث تقنيات AI لتحويل صورك"
    },
    {
      icon: Zap,
      title: "سرعة في التنفيذ",
      description: "نلتزم بمواعيد التسليم المتفق عليها"
    },
    {
      icon: Shield,
      title: "أسعار واضحة",
      description: "لا رسوم مخفية - تعرف التكلفة مقدماً"
    }
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
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <ScrollToTop />
      
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
            <img src={logo} alt="BADII Logo" className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform" data-testid="link-logo" />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-white/5" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm">من نحن</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight"
              >
                نحول <span className="text-primary">الرؤية</span> إلى <span className="text-primary">واقع</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
              >
                نؤمن بأن كل منتج يستحق أن يُروى بطريقة استثنائية تلمس القلوب وتحرك المبيعات
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 rounded-xl gap-2 px-6"
                  onClick={() => window.open('https://wa.me/966509567267?text=مرحباً، أريد معرفة المزيد عن خدماتكم', '_blank')}
                  data-testid="button-whatsapp-hero"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل معنا الآن
                </Button>
                <Link href="/#services">
                  <Button size="lg" variant="outline" className="rounded-xl gap-2 px-6 border-white/20 hover:bg-white/5" data-testid="button-services">
                    <Eye className="w-5 h-5" />
                    شاهد خدماتنا
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                لماذا <span className="text-primary">بديع</span>؟
              </h2>
              <p className="text-lg text-muted-foreground">ما يميزنا عن غيرنا</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold font-heading text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                رحلة <span className="text-primary">بديع</span>
              </h2>
              <p className="text-lg text-muted-foreground">من فكرة بسيطة إلى منصة إبداعية</p>
            </motion.div>

            <div className="max-w-3xl mx-auto relative">
              <div className="absolute right-6 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative mb-8 md:mr-16"
                >
                  <div className="absolute right-0 top-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hidden md:flex">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-3 md:hidden">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-heading">{item.title}</h3>
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2 hidden md:block">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading">رؤيتنا</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  أن نكون الشريك الإبداعي الأول لكل صاحب مشروع يريد أن يروي قصة منتجه بطريقة تلمس القلوب وتحرك المبيعات.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading">مهمتنا</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  تمكين أصحاب المشاريع من المنافسة بمحتوى بصري عالي الجودة دون الحاجة لميزانيات ضخمة أو خبرة تقنية.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">قيمنا</h2>
              <p className="text-lg text-muted-foreground">المبادئ التي نعمل بها</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center">
                <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6 rotate-180" />
                <p className="text-xl md:text-2xl font-heading leading-relaxed mb-8 text-foreground/90">
                  "نحن لا نصنع صوراً فقط... نحن نروي قصصاً تُحرّك المشاعر وتصنع المبيعات"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    ب
                  </div>
                  <div className="text-right">
                    <div className="font-bold font-heading">فريق بديع</div>
                    <div className="text-muted-foreground text-sm">الشريك الإبداعي</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                مستعد تبدأ <span className="text-primary">رحلتك</span> معنا؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                تواصل معنا اليوم ودعنا نحول صور منتجاتك إلى قصص نجاح
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#booking">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl gap-2 px-6 shadow-lg shadow-primary/30" data-testid="button-book-consultation">
                    <Sparkles className="w-5 h-5" />
                    احجز استشارة مجانية
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-xl gap-2 px-6 border-white/20 hover:bg-white/5"
                  onClick={() => window.open('https://wa.me/966509567267?text=مرحباً، أريد معرفة المزيد عن خدماتكم', '_blank')}
                  data-testid="button-whatsapp-cta"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل واتساب
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <img src={logo} alt="BADII" className="h-8 w-auto mx-auto mb-3 opacity-60" />
          <p className="text-sm text-muted-foreground">© 2024 بديع. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
