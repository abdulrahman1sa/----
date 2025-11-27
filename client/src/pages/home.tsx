import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Crown, 
  Camera, 
  PenTool, 
  Palette, 
  Check,
  ArrowRight,
  MessageCircle,
  Star,
  Send,
  ShieldCheck,
  Rocket,
  Gem,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import logoImage from "@assets/شعار_بديع-removebg-preview_1764209956253.png";

function ProjectRequestForm({ packageName }: { packageName?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    serviceType: packageName || "",
    projectGoal: "",
    budget: "",
    timeline: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
مرحباً، أرغب في بدء مشروع جديد مع BADII:

👤 الاسم: ${formData.name}
📦 الباقة/الخدمة: ${formData.serviceType}
🎯 هدف المشروع: ${formData.projectGoal}
💰 الميزانية المتوقعة: ${formData.budget}
⏱ موعد التسليم المفضل: ${formData.timeline}

أرجو مراجعة طلبي والرد علي. شكراً!
    `.trim();
    
    const whatsappUrl = `https://wa.me/966509567267?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-right" dir="rtl">
      <div className="space-y-2.5">
        <Label htmlFor="name" className="text-sm font-semibold text-neutral">الاسم الكريم / اسم الشركة</Label>
        <Input 
          id="name" 
          placeholder="أدخل اسمك أو اسم شركتك" 
          className="h-12 text-right bg-card border-neon/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-bright"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="service" className="text-sm font-semibold text-neutral">نوع الخدمة المطلوبة</Label>
        <Select required value={formData.serviceType} onValueChange={(val) => setFormData({...formData, serviceType: val})}>
          <SelectTrigger id="service" className="h-12 text-right flex-row-reverse bg-card border-neon/30 focus:border-primary text-bright">
            <SelectValue placeholder="اختر نوع الخدمة" />
          </SelectTrigger>
          <SelectContent dir="rtl" className="bg-card border-neon/30">
            <SelectItem value="الباقة الأساسية (Starter)">📦 الباقة الأساسية</SelectItem>
            <SelectItem value="الباقة الاحترافية (Pro)">🚀 الباقة الاحترافية</SelectItem>
            <SelectItem value="الباقة الشاملة (Elite)">💎 الباقة الشاملة</SelectItem>
            <SelectItem value="تصوير منتجات احترافي">📸 تصوير منتجات</SelectItem>
            <SelectItem value="كتابة محتوى تسويقي">✍️ كتابة محتوى</SelectItem>
            <SelectItem value="تصميم هوية بصرية">🎨 تصميم هوية بصرية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="goal" className="text-sm font-semibold text-neutral">تفاصيل المشروع</Label>
        <Textarea 
          id="goal" 
          placeholder="أخبرنا المزيد عن مشروعك..." 
          className="min-h-[120px] text-right resize-none bg-card border-neon/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-bright"
          required
          value={formData.projectGoal}
          onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Label htmlFor="budget" className="text-sm font-semibold text-neutral">الميزانية</Label>
          <Select required onValueChange={(val) => setFormData({...formData, budget: val})}>
            <SelectTrigger id="budget" className="h-12 text-right flex-row-reverse bg-card border-neon/30 focus:border-primary text-bright">
              <SelectValue placeholder="اختر الميزانية" />
            </SelectTrigger>
            <SelectContent dir="rtl" className="bg-card border-neon/30">
              <SelectItem value="أقل من 500 ريال">أقل من 500 ر.س</SelectItem>
              <SelectItem value="500 - 1500 ريال">500 - 1,500 ر.س</SelectItem>
              <SelectItem value="1500 - 3000 ريال">1,500 - 3,000 ر.س</SelectItem>
              <SelectItem value="أكثر من 3000 ريال">أكثر من 3,000 ر.س</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="timeline" className="text-sm font-semibold text-neutral">موعد التسليم</Label>
          <Select required onValueChange={(val) => setFormData({...formData, timeline: val})}>
            <SelectTrigger id="timeline" className="h-12 text-right flex-row-reverse bg-card border-neon/30 focus:border-primary text-bright">
              <SelectValue placeholder="اختر الموعد" />
            </SelectTrigger>
            <SelectContent dir="rtl" className="bg-card border-neon/30">
              <SelectItem value="مستعجل (24 ساعة)">⚡️ مستعجل (24 ساعة)</SelectItem>
              <SelectItem value="عادي (2-3 أيام)">📅 عادي (2-3 أيام)</SelectItem>
              <SelectItem value="مرن (أسبوع)">🧘‍♂️ مرن (أسبوع)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 text-base font-bold bg-gradient-primary hover:shadow-neon-lg transition-all duration-300 mt-6 text-background"
      >
        <Send className="ml-2 h-5 w-5" />
        إرسال الطلب عبر واتساب
      </Button>
    </form>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const sendPackageToWhatsApp = (packageName: string, price: string, features: string[]) => {
    const message = `
مرحباً فريق BADII 👋

أرغب في طلب *${packageName}*

💰 السعر: ${price} ريال

📋 *مميزات الباقة:*
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

أرجو التواصل معي لمناقشة التفاصيل وبدء المشروع. شكراً!
    `.trim();
    
    const whatsappUrl = `https://wa.me/966509567267?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-card border-b-2 border-neon">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img 
              src={logoImage} 
              alt="BADII Logo" 
              className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </motion.div>

          <div className="hidden md:flex gap-8 font-medium text-sm items-center">
            {['الخدمات', 'الأسعار', 'من نحن', 'تواصل معنا'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item}`}
                className="text-neutral hover:text-primary transition-colors relative group font-semibold"
              >
                {item}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90 text-background font-bold px-8 rounded-lg transition-all">
                ابدأ الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-card border-2 border-neon p-0 overflow-hidden">
              <div className="bg-card p-8 border-b-2 border-neon/30">
                <DialogHeader className="text-right space-y-3">
                  <DialogTitle className="text-3xl font-bold text-gradient flex items-center gap-3">
                    <Sparkles className="w-7 h-7 text-primary" />
                    ابدأ مشروعك الإبداعي
                  </DialogTitle>
                  <DialogDescription className="text-base text-neutral">
                    املأ النموذج وسنتواصل معك فوراً عبر واتساب
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-8">
                <ProjectRequestForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-60 glow-neon" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-xl bg-card border-2 border-primary/40"
              >
                <span className="flex h-3 w-3 rounded-full bg-primary"></span>
                <span className="text-sm font-bold text-primary">موثوق من 500+ عميل سعيد 🎉</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight text-bright">
                أطلق العنان <span className="text-gradient">لإبداعك</span>
                <br />
                <span className="text-gradient">مع بديع</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                نحول رؤيتك الإبداعية إلى واقع مذهل باستخدام أحدث تقنيات الذكاء الاصطناعي
                <span className="block mt-3 text-2xl md:text-3xl font-bold text-gradient">
                  ✨ صور احترافية • محتوى استثنائي • نتائج حقيقية
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="h-16 text-lg px-12 bg-gradient-primary hover:opacity-90 rounded-xl transition-all font-bold text-background"
                    >
                      <Rocket className="ml-3 w-6 h-6" />
                      احجز استشارة مجانية
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-card border-2 border-neon p-0 overflow-hidden">
                    <div className="bg-card p-8 border-b-2 border-neon/30">
                      <DialogHeader className="text-right space-y-3">
                        <DialogTitle className="text-3xl font-bold text-gradient">احجز استشارة مجانية</DialogTitle>
                        <DialogDescription className="text-base text-neutral">
                          املأ النموذج وسنتواصل معك فوراً
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                    <div className="p-8">
                      <ProjectRequestForm />
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-16 text-lg px-12 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all font-bold"
                >
                  <Star className="ml-3 w-6 h-6" />
                  شاهد أعمالنا
                </Button>
              </div>

              {/* Stats Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {[
                  { icon: Zap, title: "سرعة خيالية", desc: "تسليم خلال 24 ساعة" },
                  { icon: Sparkles, title: "أسعار تنافسية", desc: "باقات تناسب الجميع" },
                  { icon: Crown, title: "جودة عالمية", desc: "احترافية في كل تفصيل" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="group p-8 rounded-2xl card-flat card-flat-hover transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-20 h-20 mx-auto mb-5 bg-primary/10 rounded-2xl border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
                      <stat.icon className="w-9 h-9 text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-bright">{stat.title}</h3>
                    <p className="text-neutral font-medium">{stat.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="الخدمات" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 font-bold text-primary bg-primary/10 hover:bg-primary/20 px-6 py-2 text-base border-neon/50">
              خدماتنا
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">
              حلول إبداعية متكاملة
            </h2>
            <p className="text-xl text-neutral font-medium">
              كل ما تحتاجه لتعزيز حضور علامتك التجارية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Camera,
                title: "تصوير احترافي",
                desc: "صور فائقة الجودة تُبرز منتجاتك بأفضل صورة",
                features: ["صور 4K عالية الدقة", "خلفيات احترافية متنوعة", "تنسيق لجميع المنصات"]
              },
              {
                icon: PenTool,
                title: "محتوى تسويقي",
                desc: "كلمات مؤثرة تجذب جمهورك وتزيد مبيعاتك",
                features: ["منشورات جذابة", "أوصاف منتجات مقنعة", "نصوص إعلانية محترفة"]
              },
              {
                icon: Palette,
                title: "تصاميم إبداعية",
                desc: "تصاميم عصرية تعكس هوية علامتك التجارية",
                features: ["بوسترات وإعلانات", "تصاميم سوشال ميديا", "هوية بصرية كاملة"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full card-flat card-flat-hover transition-all duration-200 rounded-2xl overflow-hidden">
                  <CardHeader className="p-8">
                    <div className="w-24 h-24 mb-6 bg-gradient-neon rounded-2xl flex items-center justify-center">
                      <service.icon className="w-12 h-12 text-background" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 text-bright">{service.title}</CardTitle>
                    <CardDescription className="text-base text-neutral leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <ul className="space-y-4">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <div className="w-6 h-6 shrink-0 bg-primary/20 rounded-full border-2 border-primary/50 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                          </div>
                          <span className="font-semibold text-neutral">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 font-bold text-primary border-2 border-primary/40 hover:bg-primary hover:text-background transition-all rounded-lg"
                        >
                          اطلب الخدمة
                          <ArrowRight className="mr-2 w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px] bg-card border-2 border-neon p-0">
                        <div className="bg-card p-8 border-b-2 border-neon/30">
                          <DialogHeader className="text-right space-y-3">
                            <DialogTitle className="text-3xl font-bold text-gradient">اطلب {service.title}</DialogTitle>
                            <DialogDescription className="text-base text-neutral">
                              املأ النموذج وسنتواصل معك فوراً
                            </DialogDescription>
                          </DialogHeader>
                        </div>
                        <div className="p-8">
                          <ProjectRequestForm packageName={service.title} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="الأسعار" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 font-bold text-primary bg-primary/10 px-6 py-2 text-base border-neon/50">
              الأسعار
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">
              باقات تناسب طموحك
            </h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto font-medium">
              شفافية تامة في الأسعار • ابدأ اليوم بثقة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-flat card-flat-hover rounded-2xl transition-all duration-200">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center">
                    <Rocket className="w-7 h-7 text-background" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-bright">الباقة الأساسية</CardTitle>
                  <CardDescription className="text-base mt-2 text-neutral">للمشاريع الناشئة</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold text-primary">399</span>
                    <span className="text-xl text-neutral font-bold mr-2">ريال</span>
                  </div>
                  <ul className="space-y-4">
                    {["8 صور 4K", "مراجعة مجانية", "تسليم 48 ساعة", "حقوق تجارية", "صيغ متعددة"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 shrink-0 bg-primary/20 rounded-full border-2 border-primary/50 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="font-semibold text-neutral">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8">
                  <Button 
                    onClick={() => sendPackageToWhatsApp(
                      "الباقة الأساسية (Starter)",
                      "399",
                      ["8 صور 4K", "مراجعة مجانية", "تسليم 48 ساعة", "حقوق تجارية", "صيغ متعددة"]
                    )}
                    className="w-full h-14 bg-gradient-to-br from-secondary to-primary hover:opacity-90 rounded-lg font-bold text-lg text-background"
                  >
                    اختر الباقة
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:-mt-8"
            >
              <Card className="h-full border-0 bg-gradient-neon text-background rounded-2xl overflow-hidden">
                <div className="absolute top-6 left-6">
                  <Badge className="bg-card text-primary font-bold px-4 py-1.5 text-sm border-2 border-primary/50">
                    🔥 الأكثر طلباً
                  </Badge>
                </div>
                <CardHeader className="p-10">
                  <div className="w-18 h-18 mb-6 bg-background/20 rounded-2xl flex items-center justify-center border-2 border-background/30">
                    <ShieldCheck className="w-9 h-9 text-background" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-3xl font-extrabold text-background">الباقة الاحترافية</CardTitle>
                  <CardDescription className="text-background/80 text-lg mt-2">للنمو المتسارع</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                  <div className="mb-10">
                    <span className="text-6xl font-extrabold text-background">799</span>
                    <span className="text-2xl text-background/80 font-bold mr-2">ريال</span>
                  </div>
                  <ul className="space-y-5">
                    {["20 صورة 4K", "3 مراجعات", "تسليم 24 ساعة", "10 منشورات", "استشارة 30 دقيقة", "كابشنز احترافية"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 shrink-0 bg-background/30 rounded-full border-2 border-background/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-background" strokeWidth={3} />
                        </div>
                        <span className="font-bold text-background">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-10">
                  <Button 
                    onClick={() => sendPackageToWhatsApp(
                      "الباقة الاحترافية (Pro)",
                      "799",
                      ["20 صورة 4K", "3 مراجعات", "تسليم 24 ساعة", "10 منشورات", "استشارة 30 دقيقة", "كابشنز احترافية"]
                    )}
                    className="w-full h-16 bg-background text-primary hover:opacity-90 rounded-lg font-extrabold text-lg transition-all"
                  >
                    اختر الباقة الاحترافية
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Elite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-flat card-flat-hover rounded-2xl transition-all duration-200">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                    <Gem className="w-7 h-7 text-background" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-bright">الباقة الشاملة</CardTitle>
                  <CardDescription className="text-base mt-2 text-neutral">للشركات الكبرى</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold text-primary">1,499</span>
                    <span className="text-xl text-neutral font-bold mr-2">ريال</span>
                  </div>
                  <ul className="space-y-4">
                    {["40 صورة 8K", "مراجعات لا محدودة", "تسليم 12 ساعة", "خطة محتوى شهرية", "مدير حساب VIP", "دعم 24/7"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 shrink-0 bg-primary/20 rounded-full border-2 border-primary/50 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="font-semibold text-neutral">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8">
                  <Button 
                    onClick={() => sendPackageToWhatsApp(
                      "الباقة الشاملة (Elite)",
                      "1,499",
                      ["40 صورة 8K", "مراجعات لا محدودة", "تسليم 12 ساعة", "خطة محتوى شهرية", "مدير حساب VIP", "دعم 24/7"]
                    )}
                    variant="outline" 
                    className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-background rounded-lg font-bold text-lg transition-all"
                  >
                    اختر الباقة
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background text-bright text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-secondary/10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              جاهز لتبدأ <span className="text-gradient">قصتك</span>؟
            </h2>
            <p className="text-xl md:text-2xl text-neutral mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              انضم إلى 500+ عميل سعيد واجعل علامتك التجارية تتألق
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-20 bg-gradient-neon text-background hover:opacity-90 text-xl px-16 rounded-xl transition-all font-extrabold">
                    <MessageCircle className="ml-3 w-7 h-7" />
                    ابدأ مشروعك الآن
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-card border-2 border-neon p-0">
                  <div className="bg-card p-8 border-b-2 border-neon/30">
                    <DialogHeader className="text-right space-y-3">
                      <DialogTitle className="text-3xl font-bold text-gradient">ابدأ مشروعك الآن</DialogTitle>
                      <DialogDescription className="text-base text-neutral">
                        املأ النموذج وسنتواصل معك فوراً
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="p-8">
                    <ProjectRequestForm />
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                size="lg" 
                variant="outline" 
                className="h-20 border-2 border-primary text-primary hover:bg-primary hover:text-background text-xl px-16 rounded-xl font-bold"
              >
                <Phone className="ml-3 w-7 h-7" />
                تواصل معنا
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-neutral py-16 border-t border-neon/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-gradient-neon rounded-2xl blur-md opacity-30"></div>
                <img src={logoImage} alt="BADII Logo" className="relative h-16 w-auto object-contain drop-shadow-xl" />
              </div>
              <p className="text-neutral leading-relaxed">
                شريكك الإبداعي الأول في عالم الذكاء الاصطناعي. نصنع الفرق في كل تفصيل.
              </p>
            </div>
            
            <div>
              <h3 className="text-bright font-bold text-lg mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                {['الرئيسية', 'الخدمات', 'الأسعار', 'من نحن'].map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="hover:text-primary transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-bright font-bold text-lg mb-6">تواصل معنا</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium" dir="ltr">+966 50 956 7267</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">info@badii.sa</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neon/30 pt-8 text-center">
            <p className="text-neutral">
              © 2025 BADII. جميع الحقوق محفوظة • صُنع بـ <span className="text-primary">❤</span> في السعودية
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
