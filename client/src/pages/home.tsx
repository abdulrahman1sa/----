import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  Star,
  Send,
  Menu
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
import workerBefore from "@assets/worker_before.jpg";
import workerAfter from "@assets/worker_after.png";

import coffeeBefore from "@assets/coffee_before.jpg";
import coffeeAfter from "@assets/coffee_after_new.png";

import perfumeBefore from "@assets/perfume_before.jpg";
import perfumeAfter from "@assets/perfume_after_new.png";

// Portfolio Images
import portfolio1 from "@assets/portfolio_perfume_match.jpg";
import portfolio2 from "@assets/portfolio_coffee_mud.jpg";
import portfolio3 from "@assets/portfolio_ninja_delivery.jpg";
import portfolio4 from "@assets/portfolio_shrimp_tempura.jpg";
import portfolio5 from "@assets/portfolio_honey_nuts.jpg";
import portfolio6 from "@assets/portfolio_golden_fries.jpg";
import portfolio7 from "@assets/portfolio_leopard_alula.jpg";
import portfolio8 from "@assets/portfolio_coffee_berry.jpg";
import portfolio9 from "@assets/portfolio_matcha.jpg";
import portfolio10 from "@assets/portfolio_gaming_chair.jpg";
import portfolio11 from "@assets/portfolio_eid_sweets.jpg";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  
  const [currentStep, setCurrentStep] = useState(1);
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

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = () => {
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

  const portfolioItems = [
    { img: portfolio11, category: "أطعمة ومشروبات", title: "حلويات العيد", size: "large" },
    { img: portfolio10, category: "منتجات", title: "كرسي قيمنق", size: "small" },
    { img: portfolio9, category: "أطعمة ومشروبات", title: "ماتشا بارد", size: "small" },
    { img: portfolio8, category: "أطعمة ومشروبات", title: "قهوة بيري", size: "small" },
    { img: portfolio7, category: "إبداعي", title: "العلا - النمر العربي", size: "small" },
    { img: portfolio6, category: "أطعمة ومشروبات", title: "بطاطس ذهبية", size: "small" },
    { img: portfolio5, category: "أطعمة ومشروبات", title: "عسل ومكسرات", size: "small" },
    { img: portfolio4, category: "أطعمة ومشروبات", title: "تمبورا روبيان", size: "small" },
    { img: portfolio3, category: "إبداعي", title: "توصيل نينجا", size: "small" },
    { img: portfolio2, category: "أطعمة ومشروبات", title: "قهوة الطين", size: "small" },
    { img: portfolio1, category: "منتجات", title: "عطر فاخر", size: "large" },
  ];

  const filteredPortfolio = activeCategory === "الكل" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/5 shadow-sm">
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
            <a href="#pricing" className="hover:text-primary transition-colors relative group">
              الأسعار
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#faq" className="hover:text-primary transition-colors relative group">
              الأسئلة الشائعة
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
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
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-10">
                  <a href="#services" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => document.querySelector('[data-state=open]')?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Escape' }))}>الخدمات</a>
                  <a href="#process" className="text-lg font-medium hover:text-primary transition-colors">كيف نعمل</a>
                  <a href="#pricing" className="text-lg font-medium hover:text-primary transition-colors">الأسعار</a>
                  <a href="#faq" className="text-lg font-medium hover:text-primary transition-colors">الأسئلة الشائعة</a>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white w-full mt-4"
                    onClick={() => window.location.href = '#booking'}
                  >
                    ابدأ الآن
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" 
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-primary/30 text-primary bg-primary/5 backdrop-blur-sm rounded-full">
              ✨ شريكك الإبداعي الأول في عالم الذكاء الاصطناعي
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
              حوّل صور منتجاتك إلى <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">مبيعات حقيقية</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              نبتكر محتوى بصرياً مذهلاً باستخدام أحدث تقنيات الذكاء الاصطناعي. 
              جودة سينمائية، سرعة فائقة، وتكلفة تناسب طموحك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '#booking'} className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full transition-all hover:scale-105">
                ابدأ مشروعك الآن <ArrowRight className="mr-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 rounded-full hover:bg-secondary transition-all">
                تصفح أعمالنا
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
          >
            <Card className="glass border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-500">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">سريع</h3>
                <p className="text-muted-foreground">خلال ساعات</p>
              </CardContent>
            </Card>
            <Card className="glass border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-500">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">أسعار</h3>
                <p className="text-muted-foreground">تنافسية جداً</p>
              </CardContent>
            </Card>
            <Card className="glass border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
                  <Crown size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">احترافي</h3>
                <p className="text-muted-foreground">100% جودة</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">صورك الحالية لا تعكس جودة منتجك؟</h2>
              <ul className="space-y-4">
                {[
                  "إضاءة سيئة وألوان باهتة",
                  "تفاصيل غير واقعية ولا تبرز المنتج",
                  "تقلل من قيمة علامتك التجارية أمام المنافسين"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-muted-foreground bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                      <span className="text-sm">✕</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-primary">الحل مع BADII</h2>
              <ul className="space-y-4">
                {[
                  "إضاءة سينمائية وألوان تجذب العين",
                  "إظهار منتجك بأفضل صورة ممكنة",
                  "زيادة ثقة العملاء ومضاعفة المبيعات"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">خدماتنا المتكاملة</h2>
            <p className="text-xl text-muted-foreground">ماذا نقدم لك لتحقيق أهدافك الإبداعية</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Camera className="w-10 h-10 text-purple-500" />,
                title: "تصوير منتجات بالذكاء الاصطناعي",
                desc: "نحول صور الجوال العادية إلى لقطات إعلانية عالمية. مناسب للمطاعم، المقاهي، والمتاجر الإلكترونية.",
                features: ["خلفيات احترافية تناسب هويتك", "دقة عالية 4K للطباعة والنشر"]
              },
              {
                icon: <PenTool className="w-10 h-10 text-blue-500" />,
                title: "صياغة محتوى يبيع",
                desc: "لا نكتب مجرد نصوص، بل نكتب كلمات تقنع عميلك بالشراء وتبرز مميزات منتجك بأسلوب جذاب.",
                features: ["كابشن لمنصات التواصل الاجتماعي", "وصف منتجات متوافق مع SEO"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-muted bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mb-4 bg-background w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">رحلتك مع BADII في 4 خطوات</h2>
            <p className="text-xl text-gray-400">عملية بسيطة وسهلة من البداية إلى النهاية</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
            
            {[
              { step: "01", title: "أرسل صورك", desc: "أرسل لنا صور منتجاتك (حتى لو كانت بالجوال) مع وصف بسيط للفكرة." },
              { step: "02", title: "السحر يبدأ", desc: "نستخدم أدواتنا المتقدمة لتحويل صورك وتصميم المحتوى المناسب." },
              { step: "03", title: "راجع واعتمد", desc: "نرسل لك النماذج الأولية. نعدل حتى تكون راضياً تماماً." },
              { step: "04", title: "استلم وانشر", desc: "تستلم ملفاتك بجودة عالية جاهزة للنشر ومضاعفة مبيعاتك." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full border-4 border-gray-800 flex items-center justify-center text-3xl font-bold text-primary mb-6 relative z-10 shadow-2xl shadow-primary/10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-24 overflow-hidden bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-none">الفرق مذهل</Badge>
            <h2 className="text-4xl font-bold font-heading mb-4">شاهد الفرق بنفسك</h2>
            <p className="text-xl text-muted-foreground">اسحب المؤشر لترى كيف نحول الصور العادية إلى تحف فنية</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                before: workerBefore, 
                after: workerAfter,
                title: "التعديلات الإبداعية",
                desc: "دمج الخيال بالواقع لإنتاج محتوى تسويقي فريد"
              },
              { 
                before: coffeeBefore, 
                after: coffeeAfter,
                title: "تصوير الأطعمة والمشروبات",
                desc: "إظهار جمال المنتج بجودة إعلانية عالية"
              },
              { 
                before: perfumeBefore, 
                after: perfumeAfter,
                title: "تصوير المنتجات الفاخرة",
                desc: "إبراز الفخامة والتفاصيل الدقيقة للمنتج"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl overflow-hidden shadow-xl border border-muted/50"
              >
                <div className="h-[300px] w-full">
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={item.before} alt="صورة عادية" />}
                    itemTwo={<ReactCompareSliderImage src={item.after} alt="صورة احترافية" />}
                    className="h-full w-full object-cover"
                    position={50}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <div className="flex justify-between px-8 mt-4 text-xs font-bold uppercase tracking-wider">
                    <span className="text-red-400/70">صورة عادية (جوال)</span>
                    <span className="text-primary">احترافية مع AI ✨</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-24 overflow-hidden bg-background relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-heading mb-4">أعمالنا تتحدث عن نفسها</h2>
            <p className="text-xl text-muted-foreground mb-8">نماذج حقيقية تم توليدها وتصميمها بواسطة BADII</p>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-3">
              {["الكل", "منتجات", "أطعمة ومشروبات", "إبداعي"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105" 
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item, i) => (
                <motion.div 
                  layout
                  key={item.img} // Using img src as key since it's unique enough here
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 ${
                    item.size === 'large' ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-60 md:h-64'
                  }`}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Enhanced Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      <Badge className="mb-2 bg-primary text-white border-none">{item.category}</Badge>
                      <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm flex items-center gap-1">
                        عرض التفاصيل <ArrowRight size={14} />
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12 text-center">
             <Button variant="outline" className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5">
               مشاهدة المزيد من الأعمال
             </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-heading text-center mb-16">عملاؤنا يشاركون تجربتهم</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "خالد العتيبي",
                role: "مالك مطعم 'نكهة الأصالة'",
                text: "تجربة رائعة! الصور اللي سووها لمطعمي كانت أكثر من توقعاتي. زادت متابعيني على إنستقرام من 500 إلى 3000.",
                stat: "500 → 3000 متابع"
              },
              {
                name: "نورة السعدي",
                role: "صاحبة متجر 'أناقة العصر'",
                text: "كنت محتارة كيف أسوق لمنتجاتي. BADII حل لي المشكلة! صور احترافية بسعر معقول. مبيعاتي زادت 180%.",
                stat: "مبيعات +180%"
              },
              {
                name: "أحمد الرويلي",
                role: "مؤسس متجر إلكتروني",
                text: "أفضل استثمار قررت أعمله لمتجري. معدل التحويل ارتفع بشكل واضح والعملاء أصبحوا يتفاعلون أكثر.",
                stat: "تحويل +240%"
              },
              {
                name: "فاطمة الشمري",
                role: "صاحبة كافيه 'قهوة الفن'",
                text: "الصور الاحترافية للقهوة والمعجنات جعلت الكافيه يبدو أكثر احترافية. العملاء يقولون إنهم جاؤوا بسبب الصور.",
                stat: "عملاء جدد +320%"
              }
            ].map((t, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-lg mb-6 text-muted-foreground leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {t.stat}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                دعنا نحول فكرتك إلى <br />
                <span className="text-gradient">واقع مذهل</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                املأ النموذج البسيط وسنقوم بتحضير عرض مخصص يناسب احتياجاتك التجارية. نحن نفهم لغة الأعمال ونقدر وقتك.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">استشارة مجانية</h3>
                    <p className="text-muted-foreground">نناقش أهدافك ونقترح الحلول الأنسب لعلامتك التجارية.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">تنفيذ سريع واحترافي</h3>
                    <p className="text-muted-foreground">نلتزم بالمواعيد ونضمن جودة تليق بسمعة نشاطك التجاري.</p>
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
              <Card className="border-muted/50 shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-xl overflow-hidden">
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
                <CardContent className="p-8 min-h-[400px] flex flex-col justify-between">
                  
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
                        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 text-lg rounded-xl border-2 hover:bg-secondary/80">رجوع</Button>
                        <Button onClick={nextStep} className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" disabled={!formData.audience || !formData.goal || !formData.mood}>التالي</Button>
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
                        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 text-lg rounded-xl border-2 hover:bg-secondary/80">رجوع</Button>
                        <Button onClick={nextStep} className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" disabled={!formData.budget || !formData.timeline}>التالي</Button>
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
                        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 text-lg">رجوع</Button>
                        <Button 
                          onClick={handleFinalSubmit} 
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">باقات مصممة لتناسب احتياجاتك</h2>
            <p className="text-xl text-muted-foreground">اختر الباقة المناسبة وابدأ رحلتك الإبداعية معنا</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="relative overflow-hidden border-muted hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">باقة البداية</CardTitle>
                <CardDescription>للانطلاق بقوة في السوق</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">499</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "10 صور منتجات احترافية (AI)", 
                    "تعديل الألوان والإضاءة", 
                    "إزالة الخلفية أو تغييرها", 
                    "تسليم خلال 48 ساعة",
                    "حقوق استخدام تجاري"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => handlePackageClick('باقة البداية', '499 ريال')}>احجز الآن</Button>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card className="relative overflow-hidden border-primary shadow-2xl shadow-primary/10 scale-105 z-10 bg-primary/5">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">الأكثر مبيعاً</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary">باقة النمو</CardTitle>
                <CardDescription>للمتاجر والمطاعم النشطة</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">999</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "25 صورة منتجات إبداعية (4K)", 
                    "تصميم 5 بوسترات إعلانية", 
                    "كتابة محتوى لـ 10 منشورات", 
                    "تسليم سريع (24 ساعة)", 
                    "استشارة تسويقية مجانية"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 size={18} className="text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6" onClick={() => handlePackageClick('باقة النمو', '999 ريال')}>احجز الآن</Button>
              </CardFooter>
            </Card>

            {/* Elite */}
            <Card className="relative overflow-hidden border-muted hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">باقة التميز</CardTitle>
                <CardDescription>حلول متكاملة للشركات</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">1,999</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "50 صورة عالية الجودة (8K)", 
                    "تصميم هوية بصرية للسوشيال ميديا", 
                    "خطة محتوى شهرية كاملة", 
                    "فيديو ترويجي قصير (Reels)",
                    "مدير حساب خاص + دعم أولوي"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => handlePackageClick('باقة التميز', '1999 ريال')}>احجز الآن</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold font-heading text-center mb-12">أسئلة شائعة</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              "ما هو الذكاء الاصطناعي وكيف تستخدمونه؟",
              "هل الصور ملكي بالكامل؟",
              "كم تستغرق عملية التسليم؟",
              "ماذا لو لم تعجبني النتيجة؟",
              "هل تقدمون خدمات تعديل الصور القديمة؟"
            ].map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-right text-lg font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  نعم، نحن نستخدم أحدث التقنيات لضمان أفضل النتائج لعملائنا. تواصل معنا لمزيد من التفاصيل حول هذا الموضوع.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">جاهز لبدء رحلتك الإبداعية؟</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            لا تضيع المزيد من الوقت في البحث. دعنا نساعدك في إنشاء محتوى احترافي يميز علامتك التجارية.
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
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white" />
      </a>
    </div>
  );
}
