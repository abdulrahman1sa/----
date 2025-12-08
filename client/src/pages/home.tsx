import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
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
  Menu,
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
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
  });

  const handleFinalSubmit = async () => {
    try {
      await createBookingMutation.mutateAsync(formData);
      
      const message = `مرحباً، أرغب في بدء مشروع جديد مع BADII:%0A%0A` +
        `👤 الاسم: ${formData.name}%0A` +
        `📱 الجوال: ${formData.phone}%0A` +
        `🛠 نوع المشروع: ${formData.projectType}%0A` +
        `👥 الجمهور المستهدف: ${formData.audience}%0A` +
        `🎯 الهدف الرئيسي: ${formData.goal}%0A` +
        `🎨 الطابع البصري: ${formData.mood}%0A` +
        `📝 تفاصيل إضافية: ${formData.description}%0A` +
        `💰 الميزانية: ${formData.budget}%0A` +
        `⏱ الموعد: ${formData.timeline}%0A%0A` +
        `أرجو مراجعة طلبي والرد علي. شكراً!`;
        
      window.open(`https://wa.me/966509567267?text=${message}`, '_blank');
    } catch (error) {
      console.error('Failed to save booking:', error);
      alert('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
    }
  };

  const projectTypes = [
    { id: 'products', label: 'تصوير منتجات', icon: <Camera size={24} /> },
    { id: 'content', label: 'كتابة محتوى', icon: <PenTool size={24} /> },
    { id: 'full', label: 'باكج كامل', icon: <Crown size={24} /> },
  ];

  const handlePackageClick = (pkgName: string, price: string) => {
    const message = `*استفسار عن باقة* 💎%0A%0A` +
      `مرحباً، أنا مهتم بـ *${pkgName}* بسعر ${price}.%0A` +
      `ممكن تفاصيل أكثر عن الباقة وآلية العمل؟`;
      
    window.open(`https://wa.me/966509567267?text=${message}`, '_blank');
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

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 border-b border-primary/5 shadow-sm ${isMobile ? 'bg-background' : 'bg-background/80 backdrop-blur-lg'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BADII Logo" className="h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-bold text-sm items-center">
            <a href="#services" className="hover:text-primary transition-colors relative group">
              الخدمات
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#process" className="hover:text-primary transition-colors relative group">
              كيف نعمل
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#booking" className="hover:text-primary transition-colors relative group">
              اطلب الآن
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#faq" className="hover:text-primary transition-colors relative group">
              الأسئلة الشائعة
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <Link href="/about" className="hover:text-primary transition-colors relative group">
              من نحن
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full px-8"
              onClick={() => window.location.href = '#booking'}
            >
              ابدأ الآن 🚀
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[320px] bg-background border-r-0 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-muted">
                    <img src={logo} alt="BADII Logo" className="h-12 w-auto" />
                  </div>
                  <nav className="flex flex-col gap-2 p-4 flex-1">
                    {[
                      { href: "#services", label: "الخدمات", icon: "🎨" },
                      { href: "#process", label: "كيف نعمل", icon: "⚡" },
                      { href: "#portfolio", label: "أعمالنا", icon: "📸" },
                      { href: "#booking", label: "اطلب الآن", icon: "🚀" },
                      { href: "#faq", label: "الأسئلة الشائعة", icon: "❓" },
                    ].map((item) => (
                      <a 
                        key={item.href}
                        href={item.href} 
                        className="flex items-center gap-4 text-lg font-medium hover:text-primary hover:bg-primary/10 transition-all p-4 rounded-xl"
                        onClick={(e) => {
                          const sheet = document.querySelector('[data-state="open"]');
                          if (sheet) {
                            sheet.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Escape' }));
                          }
                        }}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {item.label}
                      </a>
                    ))}
                    <Link 
                      href="/about"
                      className="flex items-center gap-4 text-lg font-medium hover:text-primary hover:bg-primary/10 transition-all p-4 rounded-xl"
                    >
                      <span className="text-xl">👥</span>
                      من نحن
                    </Link>
                  </nav>
                  <div className="p-6 border-t border-muted">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20"
                      onClick={() => {
                        window.location.href = '#booking';
                        const sheet = document.querySelector('[data-state="open"]');
                        if (sheet) {
                          sheet.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Escape' }));
                        }
                      }}
                    >
                      🚀 ابدأ الآن
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      تواصل معنا: hello@badii.cloud
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        {!isMobile && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
        )}
        
        {/* Animated Background Blobs - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px] -z-10" 
            />
          </>
        )}

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-primary/30 text-primary bg-primary/5 backdrop-blur-sm rounded-full">
              ✨ صور احترافية بدون استديو
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
              صوّر منتجك بجوالك <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-zinc-500">ونحولها لإعلان</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              ارسل لنا صورة منتجك العادية، ونرجعها لك صورة إعلانية احترافية.
              بسيط، سريع، وبسعر يناسبك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '#booking'} className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full transition-all hover:scale-105 text-primary-foreground">
                ابدأ مشروعك الآن <ArrowRight className="mr-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 rounded-full hover:bg-secondary transition-all">
                تصفح أعمالنا
              </Button>
            </div>
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
                {!isMobile && <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                <Card className={`relative border-none rounded-2xl ${isMobile ? 'bg-card' : 'glass glass-hover'}`}>
                  <CardContent className="flex flex-col items-center p-4 md:p-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 text-primary">
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
            <p className="text-xl text-muted-foreground">كثير ناس عندهم منتجات ممتازة، بس صورها ما تعطيها حقها</p>
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
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl -z-10 transition-opacity group-hover:opacity-100" />
              <div className={`h-full border border-red-100/50 p-6 md:p-10 rounded-2xl md:rounded-3xl hover:border-red-200/50 transition-all duration-500 ${isMobile ? 'bg-card' : 'bg-card/50 backdrop-blur-sm'}`}>
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 mb-6 shadow-inner">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-red-900/80">المشكلة</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  منتجك ممتاز، بس الصور اللي تنزلها ما توصل الفكرة للناس.
                  تصوير احترافي في استديو يكلف كثير ويحتاج وقت.
                  <br /><span className="font-bold text-red-500/80">النتيجة؟</span> الناس تمر على منتجك ولا توقف.
                </p>
                <div className="space-y-3">
                  {["صور عادية ما تجذب", "تكلفة التصوير عالية", "ما عندك وقت"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-muted-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
                  ارسل لنا صورة منتجك من جوالك، ونرجعها لك صورة إعلانية احترافية.
                  بدون استديو، بدون تكلفة عالية، وبسرعة.
                  <br /><span className="font-bold text-primary">كيف؟</span> مع خبراء توليد الصور بالـ AI.
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
              ثلاث خدمات بسيطة تخلي منتجك يبين بشكل احترافي
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
                
                <div className={`h-full border border-white/[0.12] p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col shadow-lg ${isMobile ? 'bg-card' : 'bg-white/[0.06] backdrop-blur-2xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-primary/5 shadow-black/5'}`}>
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
              نحول التعقيد إلى بساطة. 4 خطوات فقط تفصلك عن المحتوى الذي تحلم به.
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
                  title: "أرسل صورك", 
                  desc: "ارفع صور منتجاتك (حتى لو من الجوال). لا تحتاج لاستوديو.",
                  delay: 0
                },
                { 
                  step: "02", 
                  icon: <Wand2 className="w-8 h-8" />, 
                  title: "سحر الذكاء", 
                  desc: "تقنياتنا تعالج الصور وتضيف الخلفيات والإضاءة السينمائية.",
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
                  title: "استلم وانشر", 
                  desc: "ملفات عالية الدقة جاهزة لتكتسح بها منصات التواصل.",
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
                  <div className={`border border-white/[0.1] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl text-center h-full flex flex-col items-center ${isMobile ? 'bg-zinc-900' : 'bg-white/[0.06] backdrop-blur-2xl hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.1] shadow-black/10 hover:shadow-primary/10'}`}>
                    
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
            <h2 className="text-4xl font-bold font-heading mb-4">لا تصدق الكلمات.. صدق عينيك</h2>
            <p className="text-xl text-muted-foreground">انقل المؤشر لترى كيف نحول الصور العادية إلى مغناطيس للمبيعات</p>
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
                className="bg-card rounded-2xl overflow-hidden shadow-xl border border-muted/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
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
                    <span className="text-red-500/70 flex items-center gap-1">📷 قبل</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Try Before You Pay */}
      <section id="portfolio" className="py-32 overflow-hidden bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2">
                <span className="text-white/90 text-lg font-medium">عرض حصري للعملاء الجدد</span>
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-tight">
              جرّب <span className="text-gradient">مجاناً</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/60 font-normal">قبل ما تدفع ريال</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/50 mb-12 leading-relaxed max-w-2xl mx-auto">
              ارسل صورة منتجك العادية، ونرجعها لك صورة احترافية خلال ٢٤ ساعة.
              <br className="hidden md:block" />
              عجبتك؟ كمّل معنا. ما عجبتك؟ <span className="text-white/70 font-medium">ولا ريال.</span>
            </p>
            
            {/* Trust Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-14 max-w-3xl mx-auto">
              {[
                { icon: <Sparkles className="w-7 h-7" />, title: "صورة مجانية", desc: "أول تجربة علينا بدون أي تكلفة" },
                { icon: <Clock className="w-7 h-7" />, title: "رد سريع", desc: "نرد عليك خلال ٢٤ ساعة كحد أقصى" },
                { icon: <Shield className="w-7 h-7" />, title: "بدون التزام", desc: "لو ما عجبتك النتيجة، ما تدفع شي" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/15 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-black text-xl font-bold px-14 py-8 rounded-full shadow-2xl shadow-white/20 transition-all hover:scale-105 hover:shadow-white/30"
                onClick={() => window.open('https://wa.me/966509567267?text=السلام عليكم، حاب أجرب الصورة المجانية لمنتجي', '_blank')}
                data-testid="button-free-trial-whatsapp"
              >
                <MessageCircle className="ml-3" size={26} />
                جرّب الآن مجاناً
              </Button>
              <p className="text-white/30 text-sm">نرد عليك على الواتساب خلال ساعات العمل</p>
            </motion.div>
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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">نرد بسرعة</h3>
                    <p className="text-muted-foreground">نتواصل معك على الواتساب خلال ساعات.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
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
                <Card className={`border-white/[0.15] shadow-2xl overflow-hidden min-h-[500px] md:min-h-[600px] ${isMobile ? 'bg-card' : 'shadow-primary/10 bg-white/[0.08] backdrop-blur-2xl hover:border-primary/30 transition-all duration-300'}`}>
                  <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8">
                  <CardTitle className="text-2xl font-heading text-center">ابدأ مشروعك الآن</CardTitle>
                  <CardDescription className="text-center text-lg">خطوات بسيطة تفصلك عن النتيجة المذهلة</CardDescription>
                  
                  {/* Progress Steps */}
                  <div className="flex justify-center gap-2 mt-6 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10"></div>
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step}
                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 border-2 ${
                          step <= currentStep 
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
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 flex flex-col items-center gap-4 text-center ${
                              formData.projectType === type.label 
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
                              className={`cursor-pointer px-4 py-2 text-sm border-2 transition-all ${
                                formData.audience.includes(aud) 
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
                              className={`cursor-pointer p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${
                                formData.goal === g.label 
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
                               gradient: 'from-gray-50 to-gray-100', 
                               border: 'group-hover:border-gray-400',
                               icon: <Sparkles size={20} className="text-gray-600" />
                             },
                             { 
                               id: 'luxury', 
                               label: 'فاخر (Luxury)', 
                               desc: 'ذهبي، أسود، أنيق وراقي',
                               gradient: 'from-amber-50 to-amber-100', 
                               border: 'group-hover:border-amber-400',
                               icon: <Crown size={20} className="text-amber-700" />
                             },
                             { 
                               id: 'vibrant', 
                               label: 'حيوي (Vibrant)', 
                               desc: 'ألوان زاهية، طاقة، مرح',
                               gradient: 'from-pink-50 to-rose-100', 
                               border: 'group-hover:border-pink-400',
                               icon: <Zap size={20} className="text-pink-600" />
                             },
                             { 
                               id: 'dark', 
                               label: 'داكن (Dark)', 
                               desc: 'غامق، درامي، سينمائي',
                               gradient: 'from-slate-800 to-slate-900 text-white', 
                               border: 'group-hover:border-slate-500',
                               icon: <ImageIcon size={20} className="text-slate-300" />
                             },
                          ].map((m) => (
                            <div 
                              key={m.id}
                              onClick={() => updateField('mood', m.label)}
                              className={`group cursor-pointer relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-4 h-28 flex flex-col justify-between ${
                                formData.mood === m.label 
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
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-center flex flex-col items-center gap-2 ${
                                formData.budget === b.id 
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
                              className={`cursor-pointer p-3 rounded-lg border text-center font-medium transition-all ${
                                formData.timeline === t.id 
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
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-7 rounded-full shadow-2xl transition-transform hover:scale-105" onClick={() => window.open('https://wa.me/966509567267', '_blank')}>
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
        href="https://wa.me/966509567267"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white" />
      </a>
    </div>
  );
}
