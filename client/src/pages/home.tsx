import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Sparkles,
  Zap,
  Crown,
  Camera,
  PenTool,
  Palette,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Image as ImageIcon,
  Send,
  Video,
  UploadCloud,
  Wand2,
  Share2,
  FileCheck,
  ChevronUp,
  Clock,
  Shield,
  Package,
  Rocket,
  Briefcase,
  Star,
  Film,
  FileText,
  Clapperboard,
  Layers,
  Timer,
  Globe,
  Plus,
  Minus,
  Calculator,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@assets/logo.png";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


// Comparison Images (Uploaded Before vs Generated After)
import workerBefore from "@assets/3_1764338125289.png";
import workerAfter from "@assets/2_1764338122710.png";

import coffeeBefore from "@assets/4_1764338127591.png";
import coffeeAfter from "@assets/1_1764338115865.png";

import perfumeBefore from "@assets/5_1764338633790.png";
import perfumeAfter from "@assets/6_1764338636072.png";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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

// Static Geometric Pattern Background
function StaticGeometricBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Circles */}
            <circle cx="20" cy="20" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
            <circle cx="80" cy="80" r="12" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />

            {/* Squares */}
            <rect x="55" y="10" width="15" height="15" fill="none" stroke="white" strokeWidth="1" opacity="0.25" transform="rotate(45 62.5 17.5)" />
            <rect x="10" y="60" width="20" height="20" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />

            {/* Triangles */}
            <polygon points="85,15 95,30 75,30" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
            <polygon points="40,75 50,90 30,90" fill="none" stroke="white" strokeWidth="1" opacity="0.25" />

            {/* Lines */}
            <line x1="0" y1="50" x2="30" y2="50" stroke="white" strokeWidth="1" opacity="0.2" />
            <line x1="70" y1="0" x2="70" y2="25" stroke="white" strokeWidth="1" opacity="0.25" />
            <line x1="45" y1="45" x2="65" y2="65" stroke="white" strokeWidth="1" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
      </svg>
    </div>
  );
}

export default function Home() {
  const isMobile = useIsMobile();

  const bookingFormRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Skip scroll on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Scroll to booking form only when step changes (not on page load)
    if (bookingFormRef.current) {
      const rect = bookingFormRef.current.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isInView) {
        bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
    audience: "",
    goal: "",
    mood: ""
  });

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentStep(prev => prev - 1);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createBookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        return { id: docRef.id };
      } catch (error) {
        console.error("Error adding document: ", error);
        throw new Error('Failed to create booking');
      }
    },
  });

  const handleFinalSubmit = async () => {
    try {
      await createBookingMutation.mutateAsync(formData);

      const message = `مرحباً، أرغب في بدء مشروع جديد مع BADII:

👤 الاسم: ${formData.name}
📱 الجوال: ${formData.phone}
🛠 نوع المشروع: ${formData.projectType}
👥 الجمهور المستهدف: ${formData.audience}
🎯 الهدف الرئيسي: ${formData.goal}
🎨 الطابع البصري: ${formData.mood}
📝 تفاصيل إضافية: ${formData.description}
💰 الميزانية: ${formData.budget}
⏱ الموعد: ${formData.timeline}

أرجو مراجعة طلبي والرد علي. شكراً!`;

      window.open(`https://wa.me/966507553404?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      console.error('Failed to save booking:', error);
      alert('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
    }
  };

  const projectTypes = [
    { id: 'products', label: 'تصوير منتجات', icon: <Camera size={24} /> },
    { id: 'web', label: 'تصميم مواقع', icon: <Globe size={24} /> },
    { id: 'content', label: 'كتابة محتوى', icon: <PenTool size={24} /> },
    { id: 'full', label: 'باكج كامل', icon: <Crown size={24} /> },
  ];

  const [calculatorItems, setCalculatorItems] = useState([
    { id: 'photo', label: 'صور احترافية', price: 15, count: 0, icon: <Camera size={22} /> },
    { id: 'content', label: 'كتابة محتوى (بوست)', price: 30, count: 0, icon: <PenTool size={22} /> },
    { id: 'reel', label: 'فيديو ريلز', price: 99, count: 0, icon: <Film size={22} /> },
    { id: 'web', label: 'صفحة موقع', price: 350, count: 0, icon: <Globe size={22} /> },
  ]);

  const updateCalcCount = (id: string, delta: number) => {
    setCalculatorItems(prev => prev.map(item =>
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
  };

  const calcTotal = calculatorItems.reduce((sum, item) => sum + (item.price * item.count), 0);


  const handlePackageClick = (pkgName: string, price: string) => {
    const message = `*استفسار عن باقة* 💎

مرحباً، أنا مهتم بـ *${pkgName}* بسعر ${price}.
ممكن تفاصيل أكثر عن الباقة وآلية العمل؟`;

    window.open(`https://wa.me/966507553404?text=${encodeURIComponent(message)}`, '_blank');
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 left-6 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-back-to-top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        {!isMobile && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
        )}

        {/* Static Geometric Background */}
        {!isMobile && <StaticGeometricBackground />}

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-primary/30 text-primary bg-primary/5 backdrop-blur-sm rounded-full">
                ✨ حلول إبداعية رقمية متكاملة
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
              نطور مشروعك <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-zinc-500">ونبني حضورك الرقمي</span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.7 }}
            >
              من التصوير الاحترافي إلى تصميم المواقع العصرية، "بديع" شريكك الإبداعي لتقديم مشروعك بأبهى صورة تجذب العملاء وتزيد المبيعات.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <Button size="lg" onClick={() => window.location.href = '#booking'} className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full transition-all hover:scale-105 text-primary-foreground">
                ابدأ مشروعك الآن <ArrowRight className="mr-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: isMobile ? 0.3 : 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20 max-w-4xl mx-auto"
          >
            {[
              { icon: <Zap size={24} />, title: "سريع", desc: "تسليم خلال يومين" },
              { icon: <Sparkles size={24} />, title: "بسيط", desc: "بدون تعقيد" },
              { icon: <Crown size={24} />, title: "واضح", desc: "سعر ثابت" },
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Card className="relative border border-white/[0.1] rounded-2xl bg-white/[0.03] backdrop-blur-2xl shadow-xl shadow-black/10 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-500">
                  <CardContent className="flex flex-col items-center p-4 md:p-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] rounded-xl flex items-center justify-center mb-3 md:mb-4 text-primary">
                      {stat.icon}
                    </div>
                    <h3 className="text-base md:text-xl font-bold mb-1">{stat.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-base">{stat.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution (Storytelling) */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-[0.02]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">المشكلة والحل</h2>
            <p className="text-xl text-muted-foreground">كثير من المشاريع الرائعة تفتقر للحضور البصري الذي يعكس جودتها الحقيقية</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            {/* The Struggle */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="h-full border border-white/[0.08] p-6 md:p-10 rounded-2xl md:rounded-3xl hover:border-white/[0.15] transition-all duration-500 bg-white/[0.03] backdrop-blur-2xl shadow-xl shadow-black/10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white/70 mb-6 shadow-inner">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-foreground/80">المشكلة</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  مشروعك ممتاز، بس حضورك الرقمي وقوة براندك ما تعكس جودتك الحقيقية.
                  المواقع التقليدية والمحتوى العادي ما صاروا يسوون فرق في سوق المنافسة اليوم.
                  <br /><span className="font-bold text-foreground/80">النتيجة؟</span> العملاء يفضلون المنافس اللي برانده يبين احترافي أكثر.
                </p>
                <div className="space-y-3">
                  {["موقع قديم أو بدون حضور هادف", "محتوى بصري متواضع", "صعوبة في الوصول لعملاء جدد"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-muted-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* The Transformation */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10 transition-opacity group-hover:opacity-100" />
              <div className="h-full bg-card border-2 border-primary/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />

                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-inner">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-primary">الحل مع بديع</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  نقدم لك حزم إبداعية متكاملة تبدأ من بناء موقعك وتطوير تجربة المستخدم، وصولاً لإنتاج محتوى بصري احترافي يخطف الأنظار.
                  حلول رقمية ذكية تناسب ميزانيتك وتختصر عليك الوقت.
                  <br /><span className="font-bold text-primary">كيف؟</span> ندمج الخبرة الإبداعية مع أحدث تقنيات AI.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                    <h4 className="font-bold text-2xl text-primary mb-1">48 ساعة</h4>
                    <p className="text-xs text-muted-foreground font-medium">وقت التسليم</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                    <h4 className="font-bold text-2xl text-primary mb-1">من 99 ر.س</h4>
                    <p className="text-xs text-muted-foreground font-medium">يبدأ السعر</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 relative bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1 text-sm">خدماتنا</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">وش نقدر نسوي لك؟</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              حلول إبداعية متكاملة تضمن حضوراً استثنائياً لمشروعك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-12 h-12 text-white" />,
                color: "bg-zinc-900",
                title: "صور منتجات",
                desc: "صوّر منتجك بجوالك وارسله لنا. نحوله لصورة إعلانية احترافية بخلفيات وإضاءة مميزة.",
                features: ["خلفيات حسب طلبك", "جودة عالية 4K", "تسليم خلال 48 ساعة"]
              },
              {
                icon: <PenTool className="w-12 h-12 text-white" />,
                color: "bg-zinc-800",
                title: "كتابة محتوى",
                desc: "نكتب لك وصف المنتج وكابشنات السوشال ميديا بطريقة تجذب الناس وتخليهم يشترون.",
                features: ["وصف منتجات جذاب", "كابشنات انستقرام وتويتر", "هاشتاقات مناسبة"]
              },
              {
                icon: <Video className="w-12 h-12 text-white" />,
                color: "bg-zinc-700",
                title: "فيديو ريلز",
                desc: "نحول صور منتجاتك لفيديوهات قصيرة جذابة تنفع للانستقرام وتيك توك.",
                features: ["فيديو 15-30 ثانية", "موسيقى مناسبة", "تصميم احترافي"]
              },
              {
                icon: <Globe className="w-12 h-12 text-white" />,
                color: "bg-zinc-600",
                title: "تصميم مواقع",
                desc: "نبني لك موقع إلكتروني عصري يعكس هوية براندك ويحول الزوار إلى عملاء.",
                features: ["تصميم عصري ومتجاوب", "تجربة مستخدم سلسة", "سرعة في التحميل"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                {!isMobile && <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background rounded-[2rem] transform transition-transform duration-500 group-hover:scale-[1.02] -z-10 shadow-2xl shadow-black/5" />}

                <div className="h-full border border-white/[0.08] p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col shadow-2xl bg-white/[0.03] backdrop-blur-3xl transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08] hover:shadow-white/5 shadow-black/20">
                  <div className={`${service.color} w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center mb-8 shadow-xl shadow-current/30 transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold font-heading mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>

                  <ul className="space-y-4 mt-auto pt-6 border-t border-white/5">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className={`w-5 h-5 rounded-full ${service.color}/20 flex items-center justify-center shrink-0 mt-0.5`}>
                          <CheckCircle2 size={12} className={service.color.replace('bg-', 'text-')} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Note: Grid columns should be adjusted for 4 items if needed, or keep it responsive */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @media (min-width: 768px) {
              #services .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            @media (min-width: 1024px) {
              #services .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            }
          `}} />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 border-white/10 text-white/60 px-4 py-1">كيف نعمل؟</Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">رحلتك مع <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">BADII</span></h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              نحول التعقيد إلى بساطة. 4 خطوات فقط تفصلك عن المشروع الذي تحلم به.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-4 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  icon: <UploadCloud className="w-8 h-8" />,
                  title: "شاركنا رؤيتك",
                  desc: "أخبرنا عن مشروعك (موقع، هوية، أو تصوير) وأرسل ملفاتك الأولية.",
                  delay: 0
                },
                {
                  step: "02",
                  icon: <Wand2 className="w-8 h-8" />,
                  title: "الإبداع والذكاء",
                  desc: "ندمج خبرتنا الإبداعية مع تقنيات الذكاء الاصطناعي لبناء مشروعك.",
                  delay: 0.2
                },
                {
                  step: "03",
                  icon: <FileCheck className="w-8 h-8" />,
                  title: "راجع واعتمد",
                  desc: "نرسل لك النتائج. نعدل حتى تصل لمرحلة الانبهار التام.",
                  delay: 0.4
                },
                {
                  step: "04",
                  icon: <Share2 className="w-8 h-8" />,
                  title: "الانطلاق والنجاح",
                  desc: "استلم ملفاتك بجودة عالية وانطلق ببراندك في فضاء المنافسة.",
                  delay: 0.6
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="border border-white/[0.08] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center h-full flex flex-col items-center bg-white/[0.03] backdrop-blur-3xl hover:border-white/[0.2] transition-all duration-500 hover:bg-white/[0.08] shadow-black/20 hover:shadow-white/5">

                    {/* Step Number Badge */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-sm px-3 py-1 rounded-full">
                      STEP {item.step}
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-white/10">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-24 overflow-hidden bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-none">الفرق مذهل</Badge>
            <h2 className="text-4xl font-bold font-heading mb-4">النتائج تتحدث عن نفسها</h2>
            <p className="text-xl text-muted-foreground">استخدم المؤشر لتشاهد كيف نحول المحتوى البسيط إلى أداة جذب قوية للمبيعات</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                before: workerBefore,
                after: workerAfter,
                title: "إبداع بلا حدود",
                desc: "نحول الأفكار المجنونة إلى واقع بصري يخطف الأنظار"
              },
              {
                before: coffeeBefore,
                after: coffeeAfter,
                title: "لذة تراها العين",
                desc: "نجعل منتجك يبدو شهياً لدرجة أن العميل سيشعر بطعمه"
              },
              {
                before: perfumeBefore,
                after: perfumeAfter,
                title: "فخامة تليق ببراندك",
                desc: "نبرز أدق التفاصيل التي تعكس قيمة وجودة منتجك الحقيقية"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/[0.1] hover:shadow-white/5 hover:border-white/[0.2] transition-all duration-500"
              >
                <div className="h-[300px] w-full">
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={item.before} alt="صورة عادية" style={{ objectFit: 'cover', objectPosition: 'top' }} />}
                    itemTwo={<ReactCompareSliderImage src={item.after} alt="صورة احترافية" style={{ objectFit: 'cover', objectPosition: 'top' }} />}
                    className="h-full w-full"
                    position={50}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-2xl mb-2 font-heading text-primary">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between px-8 mt-6 text-xs font-bold uppercase tracking-wider opacity-80">
                    <span className="text-primary flex items-center gap-1">✨ بعد</span>
                    <span className="text-muted-foreground flex items-center gap-1">📷 قبل</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Try Before You Pay - Premium Redesign */}
      <section id="portfolio" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto mb-20"
          >
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-white/40 mb-6 font-heading">
              عرض خاص
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading text-white leading-[0.9] mb-8">
              التجربة الأولى
              <br />
              <span className="text-white/30">برهان الجودة</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              نقدم لك عينة مجانية لتحكم بنفسك على مستوى احترافنا.
              <br />
              إذا لم تكن النتيجة مذهلة، <span className="text-white font-medium">فلن تتحمل أي تكلفة.</span>
            </p>
          </motion.div>

          {/* 3 Steps Process */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
              {[
                {
                  step: "01",
                  title: "أرسل صورتك",
                  desc: "صوّر منتجك بجوالك وأرسله لنا على الواتساب",
                  icon: <Camera className="w-8 h-8" />
                },
                {
                  step: "02",
                  title: "نشتغل عليها",
                  desc: "نحولها لصورة احترافية خلال ٢٤ ساعة",
                  icon: <Sparkles className="w-8 h-8" />
                },
                {
                  step: "03",
                  title: "قرر بنفسك",
                  desc: "عجبتك؟ كمّل معنا. ما عجبتك؟ خلاص انتهينا",
                  icon: <CheckCircle2 className="w-8 h-8" />
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Connector Line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
                  )}

                  <div className="relative z-10 bg-black p-8 md:p-10 text-center">
                    {/* Step Number */}
                    <div className="text-7xl md:text-8xl font-black text-white/[0.03] absolute top-0 left-1/2 -translate-x-1/2 font-heading select-none">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="relative w-20 h-20 mx-auto mb-6 rounded-full border-2 border-white/20 bg-white/[0.03] flex items-center justify-center text-white/70 group-hover:border-white/40 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <span className="text-xs text-white/30 tracking-widest uppercase mb-2 block">الخطوة {item.step}</span>
                      <h3 className="text-2xl font-bold font-heading text-white mb-3">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Customer Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "جربت الصورة المجانية وانبهرت من الجودة. الحين كل صور منتجاتي عندهم",
                  name: "أحمد الشمري",
                  business: "متجر إلكتروني - الرياض"
                },
                {
                  quote: "ما توقعت الفرق يكون كذا كبير. صور مطعمي صارت تجذب الزباين أكثر",
                  name: "محمد العتيبي",
                  business: "مطعم - جدة"
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-white" />
                    ))}
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-white/40 text-sm">{testimonial.business}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Big CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block rounded-[32px] border border-white/20 bg-white/[0.03] p-10 md:p-14">
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                جاهز تجرب؟
              </h3>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                أرسل صورة منتجك الآن ونرجعها لك صورة احترافية خلال ٢٤ ساعة - مجاناً
              </p>
              <a
                href={`https://wa.me/966507553404?text=${encodeURIComponent('السلام عليكم، حاب أجرب الصورة المجانية لمنتجي')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black text-xl font-bold px-12 py-6 rounded-full transition-all duration-300 hover:scale-105"
                data-testid="button-free-trial-whatsapp"
              >
                <MessageCircle size={24} />
                ابدأ التجربة المجانية
              </a>
              <p className="text-white/30 text-sm mt-4">نرد خلال ساعات العمل</p>
            </div>
          </motion.div>

        </div>
      </section>
      {/* Pricing Packages */}
      <section id="pricing" className="py-24 bg-[#080808] relative overflow-hidden">
        {/* Extreme Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-none text-sm px-4 py-1.5 font-bold">باقاتنا المدروسة</Badge>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">اختر الباقة المناسبة لمشروعك</h2>
            <p className="text-xl text-zinc-300">خيارات متنوعة مصممة لتناسب مختلف الاحتياجات والميزانيات</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "باكيج الانطلاقة",
                price: "199",
                priceText: "ر.س",
                desc: "مثالية للمشاريع الناشئة التي تحتاج حضوراً بصرياً أساسياً.",
                features: ["7 صور منتجات احترافية", "كتابة 3 أوصاف جذابة", "تعديل ألوان سينمائي", "تسليم خلال 48 ساعة"],
                popular: false,
                color: "border-white/10",
                glow: "hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.08)]"
              },
              {
                name: "باكيج الحضور الرقمي",
                price: "749",
                priceText: "ر.س",
                desc: "باقة متكاملة لبناء هويتك الرقمية وجذب العملاء.",
                features: ["صفحة هبوط (Landing Page)", "15 صورة منتج إعلانية", "5 فيديوهات ريلز قصيرة", "دعم فني لمدة شهر"],
                popular: true,
                color: "border-primary/40",
                glow: "shadow-[0_0_50px_-15px_rgba(var(--primary),0.35)]"
              },
              {
                name: "الباقة الشاملة",
                price: "1999",
                priceText: "ر.س",
                desc: "الحل النهائي لتحويل مشروعك إلى قصة نجاح باهرة.",
                features: ["موقع تعريفي متكامل", "محتوى بصري لـ 30 يوم", "إدارة حسابات السوشيال", "استشارة تسويقية مجانية"],
                popular: false,
                color: "border-white/10",
                glow: "group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]"
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                animate={pkg.popular ? {
                  y: [0, -10, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                } : {}}
                className={`group relative p-8 md:p-10 rounded-[2.5rem] border ${pkg.color} bg-zinc-900/90 flex flex-col h-full transition-all duration-500 ${pkg.glow} ${pkg.popular ? 'bg-gradient-to-b from-primary/[0.06] to-zinc-900/90' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-black px-6 py-1.5 rounded-full shadow-lg shadow-primary/30 z-20">
                    الأكثر طلباً
                  </div>
                )}

                {/* Internal glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] -z-10" />

                <div className="mb-8 relative">
                  <h3 className="text-2xl font-bold mb-3 text-white">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm text-zinc-400">تبدأ من</span>
                    <span className="text-5xl font-black tracking-tighter text-white">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-zinc-400">{pkg.priceText}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed min-h-[3rem]">{pkg.desc}</p>
                </div>

                <div className="h-px w-full bg-white/10 mb-8" />

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm group/item">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-zinc-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePackageClick(pkg.name, `${pkg.price} ${pkg.priceText}`)}
                  variant={pkg.popular ? "default" : "outline"}
                  className={`w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300 ${pkg.popular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30'
                    : 'border-white/10 text-white hover:bg-white/5'
                    }`}
                >
                  اطلب الباقة الآن
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Calculator */}
      <section id="calculator" className="py-24 bg-[#050505] relative overflow-hidden">
        {/* Background glow for calculator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[700px] bg-primary/10 rounded-full blur-[180px] -z-10" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-zinc-900 border border-white/10 overflow-hidden shadow-[0_50px_150px_-30px_rgba(0,0,0,0.7)] rounded-[4rem]"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-l border-white/5 bg-zinc-950/30">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-white/5">
                    <Calculator size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">حاسبة الطلبات المرنة</h2>
                    <p className="text-sm text-zinc-400">صمم باقتك الخاصة بلمسة واحدة</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {calculatorItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center justify-between p-5 bg-black/60 border border-white/5 rounded-[1.25rem] group hover:border-primary/20 hover:bg-black/80 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-zinc-200 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-white">{item.label}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{item.price} ر.س / للوحدة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => updateCalcCount(item.id, -1)}
                          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 hover:border-white/20 transition-all active:scale-90 disabled:opacity-5 text-white shadow-xl shadow-black/20"
                          disabled={item.count === 0}
                        >
                          <Minus size={18} strokeWidth={3} />
                        </button>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={item.count}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-10 text-center font-black text-2xl tabular-nums text-white"
                          >
                            {item.count}
                          </motion.span>
                        </AnimatePresence>
                        <button
                          onClick={() => updateCalcCount(item.id, 1)}
                          className="w-11 h-11 rounded-full border border-primary/40 bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/30 transition-all active:scale-90 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                        >
                          <Plus size={18} strokeWidth={3} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-10 md:p-14 bg-gradient-to-br from-primary/[0.03] to-transparent flex flex-col justify-center items-center text-center relative">
                {/* Decorative circle behind total */}
                <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />

                <div className="mb-10 w-full">
                  <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary/60 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-primary/40 rotate-3 border border-white/10">
                    <ShoppingCart size={40} />
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-zinc-200 uppercase tracking-widest">التكلفة التقديرية</h3>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-sm text-zinc-400 font-bold">ريال</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={calcTotal}
                        initial={{ opacity: 0, scale: 0.7, y: 20, filter: "blur(15px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                        className="text-8xl md:text-9xl font-black text-white transition-all duration-300 tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(var(--primary),0.3)] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
                      >
                        {calcTotal}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-lg text-primary uppercase font-black mb-1">يبدأ من</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-6 py-2.5 bg-white/5 rounded-full mb-10 border border-white/10 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <p className="text-xs text-zinc-400">دقة الحسبة تعتمد على التفاصيل النهائية</p>
                </div>

                <Button
                  size="lg"
                  disabled={calcTotal === 0}
                  onClick={() => {
                    const breakdown = calculatorItems
                      .filter(i => i.count > 0)
                      .map(i => `- ${i.label}: ${i.count}`)
                      .join('\n');
                    const message = `مرحباً، أرغب في طلب باقة مخصصة عبر الحاسبة:\n\n${breakdown}\n\nالتكلفة التقديرية: ${calcTotal} ريال`;
                    window.open(`https://wa.me/966507553404?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full h-20 rounded-[1.5rem] text-2xl font-black bg-primary text-white shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] hover:shadow-[0_25px_50px_-12px_rgba(var(--primary),0.5)] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <MessageCircle size={28} className="ml-3" />
                  اطلب هذه الحسبة الآن
                </Button>

                <p className="text-xs text-zinc-400 mt-6 font-medium">سيتم توجيهك للمحادثة المباشرة مع فريق التنفيذ</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-background to-secondary/20 -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 text-base">
                ابدأ الآن 🚀
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                خلنا نشتغل على <br />
                <span className="text-gradient">منتجاتك</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                عبّي النموذج البسيط هذا ونتواصل معك على الواتساب. ما ياخذ دقيقتين.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-black/10">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">نرد بسرعة</h3>
                    <p className="text-muted-foreground">نتواصل معك على الواتساب خلال ساعات.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-black/10">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">نسلّم بسرعة</h3>
                    <p className="text-muted-foreground">تسليم خلال 48 ساعة لأغلب الطلبات.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div ref={bookingFormRef}>
                <Card className="border border-white/[0.1] shadow-2xl overflow-hidden min-h-[500px] md:min-h-[600px] shadow-black/20 bg-white/[0.03] backdrop-blur-3xl hover:border-white/[0.2] transition-all duration-500">
                  <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8">
                    <CardTitle className="text-2xl font-heading text-center">ابدأ مشروعك الآن</CardTitle>
                    <CardDescription className="text-center text-lg">خطوات بسيطة تفصلك عن النتيجة المذهلة</CardDescription>

                    {/* Progress Steps */}
                    <div className="flex justify-center gap-2 mt-6 relative">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10"></div>
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 border-2 ${step <= currentStep
                            ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30"
                            : "bg-background border-muted text-muted-foreground"
                            }`}
                        >
                          {step < currentStep ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{step}</span>}
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 flex flex-col justify-between">

                    {/* Step 1: Project Type */}
                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold text-center mb-8">ما هو نوع مشروعك؟</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {projectTypes.map((type) => (
                            <div
                              key={type.id}
                              onClick={() => { updateField('projectType', type.label); nextStep(); }}
                              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 flex flex-col items-center gap-4 text-center ${formData.projectType === type.label
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                                : "border-muted hover:border-primary/50 bg-background/50"
                                }`}
                            >
                              <div className={`p-4 rounded-full transition-colors duration-300 ${formData.projectType === type.label ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" : "bg-muted text-muted-foreground group-hover:text-primary"}`}>
                                {type.icon}
                              </div>
                              <span className="font-bold text-lg">{type.label}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Project Details & Understanding */}
                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold text-center mb-2">لنفهم مشروعك أكثر</h3>
                        <p className="text-center text-muted-foreground mb-6">ساعدنا في التعرف على جمهورك وأهدافك لتقديم الأفضل</p>

                        {/* Audience Selection */}
                        <div className="space-y-3">
                          <Label className="text-base font-bold">من هو جمهورك المستهدف؟</Label>
                          <div className="flex flex-wrap gap-2">
                            {["شباب وجيل Z", "عائلات", "نخبة (VIP)", "شركات (B2B)", "نساء", "أطفال", "عام"].map((aud) => (
                              <Badge
                                key={aud}
                                variant="outline"
                                className={`cursor-pointer px-4 py-2 text-sm border-2 transition-all ${formData.audience.includes(aud)
                                  ? "bg-primary text-white border-primary shadow-md"
                                  : "hover:border-primary/50 bg-background"
                                  }`}
                                onClick={() => updateField('audience', aud)} // For simple single select, or toggle logic for multi
                              >
                                {aud}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Goal Selection */}
                        <div className="space-y-3">
                          <Label className="text-base font-bold">ما هو هدفك الرئيسي؟</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: 'sales', label: 'زيادة المبيعات 📈' },
                              { id: 'brand', label: 'الوعي بالعلامة التجارية 🌟' },
                              { id: 'launch', label: 'إطلاق منتج جديد 🚀' },
                              { id: 'content', label: 'تحسين مظهر الحساب ✨' },
                            ].map((g) => (
                              <div
                                key={g.id}
                                onClick={() => updateField('goal', g.label)}
                                className={`cursor-pointer p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${formData.goal === g.label
                                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                                  : "border-muted hover:border-primary/30 bg-background/50"
                                  }`}
                              >
                                {g.label}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Mood Selector (Redesigned) */}
                        <div className="space-y-4">
                          <Label className="text-base font-bold flex items-center gap-2">
                            <Palette size={18} className="text-primary" />
                            الطابع البصري المفضل
                          </Label>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                id: 'minimal',
                                label: 'بسيط (Minimal)',
                                desc: 'نظيف، مساحات بيضاء، عصري',
                                gradient: 'from-gray-100 to-gray-200',
                                border: 'group-hover:border-gray-400',
                                icon: <Sparkles size={20} className="text-gray-700" />
                              },
                              {
                                id: 'luxury',
                                label: 'فاخر (Luxury)',
                                desc: 'أسود، أنيق وراقي',
                                gradient: 'from-gray-200 to-gray-300',
                                border: 'group-hover:border-gray-500',
                                icon: <Crown size={20} className="text-gray-800" />
                              },
                              {
                                id: 'vibrant',
                                label: 'حيوي (Vibrant)',
                                desc: 'طاقة عالية، مرح',
                                gradient: 'from-gray-100 to-gray-200',
                                border: 'group-hover:border-gray-400',
                                icon: <Zap size={20} className="text-gray-700" />
                              },
                              {
                                id: 'dark',
                                label: 'داكن (Dark)',
                                desc: 'غامق، درامي، سينمائي',
                                gradient: 'from-gray-800 to-gray-900 text-white',
                                border: 'group-hover:border-gray-500',
                                icon: <ImageIcon size={20} className="text-gray-300" />
                              },
                            ].map((m) => (
                              <div
                                key={m.id}
                                onClick={() => updateField('mood', m.label)}
                                className={`group cursor-pointer relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-4 h-28 flex flex-col justify-between ${formData.mood === m.label
                                  ? `ring-2 ring-primary ring-offset-2 border-transparent bg-gradient-to-br ${m.gradient} shadow-xl scale-[1.02]`
                                  : `border-muted bg-gradient-to-br ${m.gradient} hover:shadow-lg hover:scale-[1.02] opacity-80 hover:opacity-100`
                                  }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className={`p-2 rounded-full bg-white/20 backdrop-blur-md ${formData.mood === m.label ? 'scale-110' : ''} transition-transform`}>
                                    {m.icon}
                                  </div>
                                  {formData.mood === m.label && (
                                    <div className="bg-primary text-white rounded-full p-1 shadow-sm">
                                      <CheckCircle2 size={14} />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm mb-0.5">{m.label}</h4>
                                  <p className="text-[10px] opacity-70 font-medium">{m.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-2">
                          <Label className="text-base font-bold">ملاحظات إضافية</Label>
                          <Textarea
                            placeholder="أي تفاصيل أخرى تود إخبارنا بها..."
                            className="min-h-[80px] bg-background/50 resize-none border-muted focus:border-primary"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                          />
                        </div>

                        <div className="flex gap-4 mt-6">
                          <Button variant="outline" onClick={prevStep} type="button" className="flex-1 h-12 text-lg rounded-xl border-2 hover:bg-secondary/80">رجوع</Button>
                          <Button onClick={nextStep} type="button" className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" disabled={!formData.audience || !formData.goal || !formData.mood}>التالي</Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Budget & Timeline */}
                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <h3 className="text-xl font-bold text-center mb-8">الميزانية والوقت</h3>

                        <div className="space-y-4">
                          <Label className="text-base font-bold">الميزانية المتوقعة</Label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: 'اقتصادية', label: 'اقتصادية', icon: '💰', desc: 'مناسبة للبدايات' },
                              { id: 'متوسطة', label: 'متوسطة', icon: '⚖️', desc: 'أفضل قيمة' },
                              { id: 'مفتوحة', label: 'مفتوحة', icon: '💎', desc: 'أعلى جودة' }
                            ].map((b) => (
                              <div
                                key={b.id}
                                onClick={() => updateField('budget', b.id)}
                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-center flex flex-col items-center gap-2 ${formData.budget === b.id
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg"
                                  : "border-muted hover:border-primary/30 bg-background/50"
                                  }`}
                              >
                                <div className="text-3xl mb-1">{b.icon}</div>
                                <div className="font-bold">{b.label}</div>
                                <div className="text-xs text-muted-foreground">{b.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-bold">موعد التسليم المفضل</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: 'عاجل جداً (24 ساعة)', label: '⚡️ عاجل (24 ساعة)' },
                              { id: 'خلال أسبوع', label: '📅 خلال أسبوع' },
                              { id: 'خلال شهر', label: '🗓 خلال شهر' },
                              { id: 'غير محدد', label: '⏳ غير محدد' },
                            ].map((t) => (
                              <div
                                key={t.id}
                                onClick={() => updateField('timeline', t.id)}
                                className={`cursor-pointer p-3 rounded-lg border text-center font-medium transition-all ${formData.timeline === t.id
                                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                                  : "border-muted hover:border-primary/30 bg-background/50"
                                  }`}
                              >
                                {t.label}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <Button variant="outline" onClick={prevStep} type="button" className="flex-1 h-12 text-lg rounded-xl border-2 hover:bg-secondary/80">رجوع</Button>
                          <Button onClick={nextStep} type="button" className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" disabled={!formData.budget || !formData.timeline}>التالي</Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Contact Info */}
                    {currentStep === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold text-center mb-8">كيف نتواصل معك؟</h3>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-lg">الاسم الكريم</Label>
                            <Input
                              placeholder="أدخل اسمك"
                              className="h-14 text-lg bg-background/50"
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-lg">رقم الجوال (واتساب)</Label>
                            <Input
                              placeholder="05xxxxxxxx"
                              className="h-14 text-lg bg-background/50"
                              value={formData.phone}
                              onChange={(e) => updateField('phone', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <Button variant="outline" onClick={prevStep} type="button" className="flex-1 h-12 text-lg">رجوع</Button>
                          <Button
                            onClick={handleFinalSubmit}
                            type="button"
                            className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 animate-pulse hover:animate-none transform hover:scale-105 transition-all duration-300"
                            disabled={!formData.name || !formData.phone}
                          >
                            <Send className="ml-2 w-5 h-5" />
                            إرسال الآن عبر واتساب
                          </Button>
                        </div>
                      </motion.div>
                    )}

                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">أسئلة متوقعة</h2>
            <p className="text-xl text-muted-foreground">الأجوبة على اللي يسألون عنه كثير</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "كيف الطريقة؟",
                a: "بسيطة جداً: 1) ترسل لنا صور منتجك من جوالك على الواتساب. 2) نشتغل عليها ونحولها لصور احترافية. 3) نرسلها لك جاهزة خلال يومين. خلاص!"
              },
              {
                q: "طيب لو ما عجبتني النتيجة؟",
                a: "كل باقة فيها تعديلات مجانية. لو حاب تغير الخلفية أو الإضاءة أو أي شي، قول لنا ونعدل. هدفنا إنك ترضى 100%."
              },
              {
                q: "الصور تصير ملكي؟",
                a: "أكيد! كل الصور والمحتوى اللي نسويه لك يصير ملكك الكامل. تقدر تستخدمه في أي مكان تبيه - موقعك، سوشال ميديا، إعلانات، أي شي."
              },
              {
                q: "احتاج أرسل لكم المنتج الفعلي؟",
                a: "لا أبداً! بس صوّر منتجك بجوالك بإضاءة واضحة وارسل لنا الصور. ما تحتاج ترسل شي، كل شي يتم أونلاين."
              },
              {
                q: "كم ياخذ الوقت؟",
                a: "التسليم خلال 48 ساعة لأغلب الباقات. لو عندك طلب مستعجل، كلمنا وننسق معك."
              }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-muted bg-card rounded-xl px-4 shadow-sm hover:shadow-md transition-all duration-300">
                <AccordionTrigger className="text-right text-lg font-bold py-6 hover:no-underline hover:text-primary transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-loose pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">جاهز تبدأ؟</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            كلمنا على الواتساب وخلنا نشتغل على منتجاتك
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-7 rounded-full shadow-2xl transition-transform hover:scale-105" onClick={() => window.open('https://wa.me/966507553404', '_blank')}>
            <MessageCircle className="ml-2" />
            تحدث معنا عبر واتساب
          </Button>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={logo} alt="BADII Logo" className="h-24 w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
          <div className="mb-8">
            <p className="text-lg mb-2">تواصل معنا</p>
            <a href="mailto:hello@badii.cloud" className="text-2xl font-bold text-white hover:text-primary transition-colors">
              hello@badii.cloud
            </a>
          </div>
          <p>© 2025 BADII. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966507553404"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-white hover:bg-gray-100 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={32} fill="currentColor" className="text-black" />
      </a>
    </div>
  );
}
