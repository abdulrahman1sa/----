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

import logoImage from "@assets/شعار بديع_1764208396947.png";

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
          className="h-12 text-right bg-white/50 border-black/10 focus:border-primary"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service" className="text-base font-medium">نوع الخدمة المطلوبة</Label>
        <Select required value={formData.serviceType} onValueChange={(val) => setFormData({...formData, serviceType: val})}>
          <SelectTrigger id="service" className="h-12 text-right flex-row-reverse bg-white/50 border-black/10 focus:border-primary">
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
          className="min-h-[100px] text-right resize-none bg-white/50 border-black/10 focus:border-primary"
          required
          value={formData.projectGoal}
          onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">الميزانية المتوقعة</Label>
          <Select required onValueChange={(val) => setFormData({...formData, budget: val})}>
            <SelectTrigger id="budget" className="h-12 text-right flex-row-reverse bg-white/50 border-black/10 focus:border-primary">
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
            <SelectTrigger id="timeline" className="h-12 text-right flex-row-reverse bg-white/50 border-black/10 focus:border-primary">
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

      <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white mt-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
        إرسال الطلب عبر واتساب <Send className="mr-2 h-5 w-5" />
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="BADII Logo" 
              className="h-14 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="hidden md:flex gap-8 font-medium text-sm items-center text-black">
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
            <DialogContent className="sm:max-w-[500px] bg-white backdrop-blur-2xl border-black/5 p-0 overflow-hidden gap-0">
               <div className="bg-primary/5 p-6 border-b border-black/5">
                <DialogHeader className="text-right space-y-2">
                  <DialogTitle className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    ابدأ مشروعك الإبداعي
                  </DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.02]" />
        
        {/* Abstract Shapes - Blue & Black */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100 rounded-full blur-[100px] -z-10" />

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

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-[1.1] tracking-tight text-black">
              أطلق العنان لإبداعك <br />
              مع <span className="text-primary">BADII</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              نحول رؤيتك الإبداعية إلى واقع مذهل باستخدام أحدث تقنيات الذكاء الاصطناعي.
              <span className="block mt-2 text-black font-medium">صور احترافية. محتوى استثنائي. نتائج حقيقية.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-14 text-lg px-10 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 rounded-full transition-all hover:scale-105 hover:-translate-y-1">
                    احجز استشارة مجانية
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white backdrop-blur-2xl border-black/5 p-0 overflow-hidden">
                  <div className="bg-primary/5 p-6 border-b border-black/5">
                    <DialogHeader className="text-right space-y-2">
                      <DialogTitle className="text-2xl font-bold font-heading text-primary">احجز استشارة مجانية</DialogTitle>
                      <DialogDescription className="text-base text-gray-600">
                        املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="p-6">
                    <ProjectRequestForm />
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button size="lg" variant="outline" className="h-14 text-lg px-10 rounded-full border-2 border-black/10 text-black hover:bg-black hover:text-white transition-all hover:scale-105">
                شاهد أعمالنا <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Stats - Monochrome/Blue */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto"
          >
            <div className="group p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 mx-auto bg-black/5 rounded-2xl flex items-center justify-center mb-4 text-black group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">سرعة خيالية</h3>
              <p className="text-gray-500 text-sm">تسليم المشاريع خلال ساعات معدودة بجودة عالية</p>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">أسعار تنافسية</h3>
              <p className="text-gray-500 text-sm">باقات مرنة تناسب جميع الميزانيات والاحتياجات</p>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 mx-auto bg-black/5 rounded-2xl flex items-center justify-center mb-4 text-black group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Crown size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">جودة احترافية</h3>
              <p className="text-gray-500 text-sm">نتائج مبهرة تضاهي كبرى الاستوديوهات العالمية</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 relative bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 font-bold text-primary bg-primary/10 hover:bg-primary/20">خدماتنا</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-black">حلول إبداعية متكاملة</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لتعزيز حضور علامتك التجارية في مكان واحد</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8 text-white" />,
                bgClass: "bg-black",
                title: "توليد الصور الاحترافية",
                desc: "صور فائقة الجودة لمنتجاتك. من تصوير الأطعمة الشهية إلى صور المنتجات التجارية المثالية.",
                features: ["صور منتجات بخلفيات احترافية", "جودة 4K وصيغ متعددة", "تناسب جميع المنصات"]
              },
              {
                icon: <PenTool className="w-8 h-8 text-white" />,
                bgClass: "bg-primary",
                title: "كتابة المحتوى التسويقي",
                desc: "محتوى مقنع ومؤثر يتحدث بصوت علامتك التجارية ويجذب جمهورك المستهدف.",
                features: ["محتوى سوشال ميديا إبداعي", "أوصاف منتجات جذابة", "نصوص إعلانية مقنعة"]
              },
              {
                icon: <Palette className="w-8 h-8 text-white" />,
                bgClass: "bg-black",
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
                <div className="relative h-full bg-white border border-black/5 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgClass} flex items-center justify-center shadow-lg mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold font-heading mb-4 text-black">{service.title}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">{service.desc}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <div className={`w-6 h-6 rounded-full ${service.bgClass} bg-opacity-10 flex items-center justify-center shrink-0`}>
                          <Check size={14} className={service.bgClass === 'bg-primary' ? 'text-primary' : 'text-black'} />
                        </div>
                        {f}
                      </div>
                    ))}
                  </ul>

                  <Button variant="ghost" className="w-full group-hover:bg-primary/5 group-hover:text-primary justify-between text-black">
                    اطلب الخدمة <ArrowRight className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 font-bold text-primary bg-primary/10">الأسعار</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-black">باقات تناسب طموحك</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">شفافية تامة في الأسعار. اختر الباقة التي تناسب حجم عملك وابدأ فوراً</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {/* Starter */}
            <Card className="relative h-full border-black/10 bg-white shadow-sm rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 text-black">
                  <Rocket size={24} />
                </div>
                <CardTitle className="text-2xl font-bold font-heading text-black">الباقة الأساسية</CardTitle>
                <CardDescription className="text-base mt-2 text-gray-500">للمشاريع الناشئة والتجربة</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold tracking-tight text-black">399</span>
                  <span className="text-xl text-gray-500 font-medium">ريال</span>
                </div>
                <div className="space-y-4">
                  {[
                    "8 صور عالية الجودة (4K)", 
                    "مراجعة واحدة مجانية", 
                    "تسليم خلال 48 ساعة", 
                    "حقوق استخدام تجاري",
                    "صيغ متعددة (PNG, JPG)"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 text-base rounded-xl bg-black hover:bg-black/80 text-white transition-all shadow-lg hover:shadow-xl">
                      اختر الباقة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden">
                    <div className="bg-gray-50 p-6 border-b border-black/5">
                       <DialogHeader className="text-right">
                        <DialogTitle className="text-2xl font-bold text-black">طلب الباقة الأساسية</DialogTitle>
                      </DialogHeader>
                    </div>
                    <div className="p-6">
                      <ProjectRequestForm packageName="الباقة الأساسية (Starter)" />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Pro - Featured */}
            <div className="relative group -mt-4 md:-mt-8">
              <div className="absolute inset-0 bg-primary rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500" />
              <Card className="relative h-full border-0 bg-primary text-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ring-2 ring-primary/50">
                <div className="absolute top-6 left-6">
                   <span className="bg-white text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                     الأكثر طلباً
                   </span>
                </div>
                <CardHeader className="p-10 pb-0">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                    <ShieldCheck size={30} />
                  </div>
                  <CardTitle className="text-3xl font-bold font-heading">الباقة الاحترافية</CardTitle>
                  <CardDescription className="text-blue-100 text-lg mt-2">للنمو المتسارع والاحترافية</CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-6xl font-bold tracking-tight">799</span>
                    <span className="text-2xl text-blue-200 font-medium">ريال</span>
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
                      <div key={i} className="flex items-center gap-3 text-base font-medium text-blue-50">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
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
                      <Button className="w-full h-14 text-lg rounded-xl bg-white hover:bg-gray-50 text-primary border-none transition-all shadow-lg shadow-black/10 hover:scale-[1.02]">
                        اختر الباقة الاحترافية
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden text-black">
                       <div className="bg-primary/5 p-6 border-b border-black/5">
                         <DialogHeader className="text-right">
                          <DialogTitle className="text-2xl font-bold text-primary">طلب الباقة الاحترافية</DialogTitle>
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
            <Card className="relative h-full border-black/10 bg-white shadow-sm rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="p-8 pb-0">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 text-black">
                  <Gem size={24} />
                </div>
                <CardTitle className="text-2xl font-bold font-heading text-black">الباقة الشاملة</CardTitle>
                <CardDescription className="text-base mt-2 text-gray-500">للشركات والعلامات الكبرى</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold tracking-tight text-black">1,499</span>
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
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 text-base rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-black">
                      تواصل للطلب
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden">
                     <div className="bg-gray-50 p-6 border-b border-black/5">
                       <DialogHeader className="text-right">
                        <DialogTitle className="text-2xl font-bold text-black">طلب الباقة الشاملة</DialogTitle>
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-xl px-12 py-8 rounded-full shadow-2xl shadow-primary/20 transition-transform hover:scale-105 font-bold">
                <MessageCircle className="ml-3 w-6 h-6" />
                ابدأ مشروعك الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white backdrop-blur-xl border-black/10 text-foreground">
              <div className="bg-primary/5 p-6 border-b border-black/5">
                <DialogHeader className="text-right space-y-2">
                  <DialogTitle className="text-2xl font-bold font-heading text-primary">ابدأ مشروعك الآن</DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
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
                <img 
                  src={logoImage} 
                  alt="BADII Logo" 
                  className="h-12 w-auto object-contain opacity-90"
                />
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
