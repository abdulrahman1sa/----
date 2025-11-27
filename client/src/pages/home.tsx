import { useState } from "react";
import { motion } from "framer-motion";
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
  Image as ImageIcon,
  Star,
  Send,
  ShieldCheck,
  Rocket,
  Gem
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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
    <form onSubmit={handleSubmit} className="space-y-6 py-4 text-right" dir="rtl">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium">الاسم الكريم / اسم الشركة</Label>
        <Input 
          id="name" 
          placeholder="أدخل اسمك أو اسم شركتك" 
          className="h-12 text-right bg-white/50"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service" className="text-base font-medium">نوع الخدمة المطلوبة</Label>
        <Select required value={formData.serviceType} onValueChange={(val) => setFormData({...formData, serviceType: val})}>
          <SelectTrigger id="service" className="h-12 text-right flex-row-reverse bg-white/50">
            <SelectValue placeholder="اختر نوع الخدمة" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="الباقة الأساسية (Starter)">📦 الباقة الأساسية (Starter)</SelectItem>
            <SelectItem value="الباقة الاحترافية (Pro)">🚀 الباقة الاحترافية (Pro)</SelectItem>
            <SelectItem value="الباقة الشاملة (Elite)">💎 الباقة الشاملة (Elite)</SelectItem>
            <SelectItem value="تصوير منتجات احترافي">📸 تصوير منتجات احترافي</SelectItem>
            <SelectItem value="كتابة محتوى تسويقي">✍️ كتابة محتوى تسويقي</SelectItem>
            <SelectItem value="تصميم هوية بصرية وشعارات">🎨 تصميم هوية بصرية وشعارات</SelectItem>
            <SelectItem value="باقة متكاملة">✨ طلب مخصص / باقة متكاملة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal" className="text-base font-medium">تفاصيل المشروع / الهدف منه</Label>
        <Textarea 
          id="goal" 
          placeholder="أخبرنا المزيد عن مشروعك.. مثلاً: أحتاج صور لمنتجات قهوة لمتجري الإلكتروني لزيادة المبيعات" 
          className="min-h-[100px] text-right resize-none bg-white/50"
          required
          value={formData.projectGoal}
          onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">الميزانية المتوقعة</Label>
          <Select required onValueChange={(val) => setFormData({...formData, budget: val})}>
            <SelectTrigger id="budget" className="h-12 text-right flex-row-reverse bg-white/50">
              <SelectValue placeholder="الميزانية" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="أقل من 500 ريال">أقل من 500 ريال</SelectItem>
              <SelectItem value="500 - 1500 ريال">500 - 1,500 ريال</SelectItem>
              <SelectItem value="1500 - 3000 ريال">1,500 - 3,000 ريال</SelectItem>
              <SelectItem value="أكثر من 3000 ريال">أكثر من 3,000 ريال</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-base font-medium">موعد التسليم</Label>
          <Select required onValueChange={(val) => setFormData({...formData, timeline: val})}>
            <SelectTrigger id="timeline" className="h-12 text-right flex-row-reverse bg-white/50">
              <SelectValue placeholder="الموعد" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="مستعجل (24 ساعة)">⚡️ مستعجل (24 ساعة)</SelectItem>
              <SelectItem value="عادي (2-3 أيام)">📅 عادي (2-3 أيام)</SelectItem>
              <SelectItem value="مرن (أسبوع)">🧘‍♂️ مرن (أسبوع)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
        إرسال الطلب عبر واتساب <Send className="mr-2 h-5 w-5" />
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25">
              B
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight">BADII | بديع</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-sm items-center">
            <a href="#services" className="hover:text-primary transition-colors relative group">
              الخدمات
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#process" className="hover:text-primary transition-colors relative group">
              كيف نعمل
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="hover:text-primary transition-colors relative group">
              الأسعار
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#faq" className="hover:text-primary transition-colors relative group">
              الأسئلة الشائعة
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 rounded-full px-6 transition-all hover:scale-105">
                ابدأ الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-2xl border-white/20 p-0 overflow-hidden gap-0">
               <div className="bg-primary/10 p-6 border-b border-white/10">
                <DialogHeader className="text-right space-y-2">
                  <DialogTitle className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    ابدأ مشروعك الإبداعي
                  </DialogTitle>
                  <DialogDescription className="text-base text-foreground/80">
                    املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                  </DialogDescription>
                </DialogHeader>
               </div>
               <div className="p-6">
                 <ProjectRequestForm />
               </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.07]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium">موثوق من 500+ عميل سعيد</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-[1.1] tracking-tight">
              أطلق العنان لإبداعك <br />
              مع <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">BADII</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              نحول رؤيتك الإبداعية إلى واقع مذهل باستخدام أحدث تقنيات الذكاء الاصطناعي.
              <span className="block mt-2 text-foreground/80">صور احترافية. محتوى استثنائي. نتائج حقيقية.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-14 text-lg px-10 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full transition-all hover:scale-105 hover:-translate-y-1">
                    احجز استشارة مجانية
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-2xl border-white/20 p-0 overflow-hidden">
                  <div className="bg-primary/10 p-6 border-b border-white/10">
                    <DialogHeader className="text-right space-y-2">
                      <DialogTitle className="text-2xl font-bold font-heading text-primary">احجز استشارة مجانية</DialogTitle>
                      <DialogDescription className="text-base">
                        املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="p-6">
                    <ProjectRequestForm />
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button size="lg" variant="outline" className="h-14 text-lg px-10 rounded-full border-2 hover:bg-secondary/50 backdrop-blur-sm transition-all hover:scale-105">
                شاهد أعمالنا <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto"
          >
            <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-14 h-14 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform duration-300">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">سرعة خيالية</h3>
              <p className="text-muted-foreground text-sm">تسليم المشاريع خلال ساعات معدودة بجودة عالية</p>
            </div>

            <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-14 h-14 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">أسعار تنافسية</h3>
              <p className="text-muted-foreground text-sm">باقات مرنة تناسب جميع الميزانيات والاحتياجات</p>
            </div>

            <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                <Crown size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">جودة احترافية</h3>
              <p className="text-muted-foreground text-sm">نتائج مبهرة تضاهي كبرى الاستوديوهات العالمية</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 font-bold text-primary bg-primary/10 hover:bg-primary/20">خدماتنا</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">حلول إبداعية متكاملة</h2>
            <p className="text-xl text-muted-foreground">كل ما تحتاجه لتعزيز حضور علامتك التجارية في مكان واحد</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8 text-white" />,
                color: "bg-purple-500",
                title: "توليد الصور الاحترافية",
                desc: "صور فائقة الجودة لمنتجاتك. من تصوير الأطعمة الشهية إلى صور المنتجات التجارية المثالية.",
                features: ["صور منتجات بخلفيات احترافية", "جودة 4K وصيغ متعددة", "تناسب جميع المنصات"]
              },
              {
                icon: <PenTool className="w-8 h-8 text-white" />,
                color: "bg-blue-500",
                title: "كتابة المحتوى التسويقي",
                desc: "محتوى مقنع ومؤثر يتحدث بصوت علامتك التجارية ويجذب جمهورك المستهدف.",
                features: ["محتوى سوشال ميديا إبداعي", "أوصاف منتجات جذابة", "نصوص إعلانية مقنعة"]
              },
              {
                icon: <Palette className="w-8 h-8 text-white" />,
                color: "bg-pink-500",
                title: "التصاميم الإبداعية",
                desc: "تصاميم مبتكرة تجمع بين الجمال والفعالية لتحقيق أهدافك التسويقية.",
                features: ["بوسترات وإعلانات رقمية", "تصاميم قصص وريلز", "هوية بصرية متكاملة"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-muted rounded-3xl p-8 hover:bg-card hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center shadow-lg mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold font-heading mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{service.desc}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <div className={`w-6 h-6 rounded-full ${service.color} bg-opacity-20 flex items-center justify-center shrink-0`}>
                          <Check size={14} className={service.color.replace('bg-', 'text-')} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="w-full group-hover:bg-primary/5 group-hover:text-primary justify-between">
                    اطلب الخدمة <ArrowRight className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 font-bold text-primary bg-primary/10">الأسعار</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">باقات تناسب طموحك</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">شفافية تامة في الأسعار. اختر الباقة التي تناسب حجم عملك وابدأ فوراً</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {/* Starter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/40 rounded-[2rem] blur-xl transition-all opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/60 bg-white/50 backdrop-blur-xl rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader className="p-8 pb-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-gray-600">
                    <Rocket size={24} />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading">الباقة الأساسية</CardTitle>
                  <CardDescription className="text-base mt-2">للمشاريع الناشئة والتجربة</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-bold tracking-tight">399</span>
                    <span className="text-xl text-muted-foreground font-medium">ريال</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      "8 صور عالية الجودة (4K)", 
                      "مراجعة واحدة مجانية", 
                      "تسليم خلال 48 ساعة", 
                      "حقوق استخدام تجاري",
                      "صيغ متعددة (PNG, JPG)"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-12 text-base rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition-all shadow-lg hover:shadow-xl">
                        اختر الباقة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-2xl p-0 overflow-hidden">
                      <div className="bg-gray-100 p-6 border-b">
                         <DialogHeader className="text-right">
                          <DialogTitle className="text-2xl font-bold text-gray-900">طلب الباقة الأساسية</DialogTitle>
                        </DialogHeader>
                      </div>
                      <div className="p-6">
                        <ProjectRequestForm packageName="الباقة الأساسية (Starter)" />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>

            {/* Pro - Featured */}
            <div className="relative group -mt-4 md:-mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500" />
              <Card className="relative h-full border-0 bg-gray-900 text-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ring-2 ring-white/10">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500" />
                <div className="absolute top-6 left-6">
                   <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                     الأكثر طلباً
                   </span>
                </div>
                <CardHeader className="p-10 pb-0">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-primary border border-white/10">
                    <ShieldCheck size={30} />
                  </div>
                  <CardTitle className="text-3xl font-bold font-heading">الباقة الاحترافية</CardTitle>
                  <CardDescription className="text-gray-400 text-lg mt-2">للنمو المتسارع والاحترافية</CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-6xl font-bold tracking-tight">799</span>
                    <span className="text-2xl text-gray-400 font-medium">ريال</span>
                  </div>
                  <div className="space-y-5">
                    {[
                      "20 صورة عالية الجودة (4K)", 
                      "3 مراجعات مجانية", 
                      "تسليم سريع (24 ساعة)", 
                      "كتابة 10 منشورات تسويقية",
                      "كابشنز وهاشتاقات احترافية",
                      "استشارة تسويقية (30 دقيقة)"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-base font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-10 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-none transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]">
                        اختر الباقة الاحترافية
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden text-white">
                       <div className="bg-white/5 p-6 border-b border-white/10">
                         <DialogHeader className="text-right">
                          <DialogTitle className="text-2xl font-bold text-white">طلب الباقة الاحترافية</DialogTitle>
                        </DialogHeader>
                       </div>
                       <div className="p-6">
                        <ProjectRequestForm packageName="الباقة الاحترافية (Pro)" />
                       </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>

            {/* Elite */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/40 rounded-[2rem] blur-xl transition-all opacity-0 group-hover:opacity-100" />
              <Card className="relative h-full border-muted/60 bg-white/50 backdrop-blur-xl rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader className="p-8 pb-0">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
                    <Gem size={24} />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading">الباقة الشاملة</CardTitle>
                  <CardDescription className="text-base mt-2">للشركات والعلامات الكبرى</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-bold tracking-tight">1,499</span>
                    <span className="text-xl text-muted-foreground font-medium">ريال</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      "40 صورة فائقة الجودة (8K)", 
                      "مراجعات غير محدودة", 
                      "تسليم فوري (12 ساعة)", 
                      "خطة محتوى شهرية كاملة",
                      "مدير حساب خاص",
                      "دعم فني VIP على مدار الساعة"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-12 text-base rounded-xl bg-white border-2 border-gray-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all">
                        تواصل للطلب
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-2xl p-0 overflow-hidden">
                       <div className="bg-amber-500/10 p-6 border-b border-amber-500/20">
                         <DialogHeader className="text-right">
                          <DialogTitle className="text-2xl font-bold text-amber-700">طلب الباقة الشاملة</DialogTitle>
                        </DialogHeader>
                       </div>
                       <div className="p-6">
                        <ProjectRequestForm packageName="الباقة الشاملة (Elite)" />
                       </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 tracking-tight">جاهز لتبدأ قصتك؟</h2>
          <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-3xl mx-auto font-light">
            نحن هنا لنساعدك في كل خطوة. دعنا نحول أفكارك إلى واقع ملموس يزيد من نجاحك.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-xl px-12 py-8 rounded-full shadow-2xl shadow-white/10 transition-transform hover:scale-105 font-bold">
                <MessageCircle className="ml-3 w-6 h-6" />
                ابدأ مشروعك الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20 text-foreground">
              <div className="bg-primary/10 p-6 border-b border-white/10">
                <DialogHeader className="text-right space-y-2">
                  <DialogTitle className="text-2xl font-bold font-heading text-primary">ابدأ مشروعك الآن</DialogTitle>
                  <DialogDescription className="text-base">
                    املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-6">
                <ProjectRequestForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">B</div>
                <span className="text-2xl font-bold text-white font-heading">BADII</span>
              </div>
              <p className="text-gray-500 max-w-xs mx-auto md:mx-0">شريكك الإبداعي الأول في عالم الذكاء الاصطناعي. نصنع الفرق في كل تفصيل.</p>
            </div>
            
            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors">الرئيسية</a>
              <a href="#services" className="hover:text-primary transition-colors">خدماتنا</a>
              <a href="#pricing" className="hover:text-primary transition-colors">الباقات</a>
              <a href="#" className="hover:text-primary transition-colors">تواصل معنا</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-600">
            © 2025 BADII. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
