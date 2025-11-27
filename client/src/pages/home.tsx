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

import logoImage from "@assets/شعار بديع_1764208396947.png";

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
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">الاسم الكريم / اسم الشركة</Label>
        <Input 
          id="name" 
          placeholder="أدخل اسمك أو اسم شركتك" 
          className="h-12 text-right border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="service" className="text-sm font-semibold text-gray-700">نوع الخدمة المطلوبة</Label>
        <Select required value={formData.serviceType} onValueChange={(val) => setFormData({...formData, serviceType: val})}>
          <SelectTrigger id="service" className="h-12 text-right flex-row-reverse border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="اختر نوع الخدمة" />
          </SelectTrigger>
          <SelectContent dir="rtl">
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
        <Label htmlFor="goal" className="text-sm font-semibold text-gray-700">تفاصيل المشروع</Label>
        <Textarea 
          id="goal" 
          placeholder="أخبرنا المزيد عن مشروعك..." 
          className="min-h-[120px] text-right resize-none border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          required
          value={formData.projectGoal}
          onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">الميزانية</Label>
          <Select required onValueChange={(val) => setFormData({...formData, budget: val})}>
            <SelectTrigger id="budget" className="h-12 text-right flex-row-reverse border-gray-200 focus:border-primary">
              <SelectValue placeholder="اختر الميزانية" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="أقل من 500 ريال">أقل من 500 ر.س</SelectItem>
              <SelectItem value="500 - 1500 ريال">500 - 1,500 ر.س</SelectItem>
              <SelectItem value="1500 - 3000 ريال">1,500 - 3,000 ر.س</SelectItem>
              <SelectItem value="أكثر من 3000 ريال">أكثر من 3,000 ر.س</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700">موعد التسليم</Label>
          <Select required onValueChange={(val) => setFormData({...formData, timeline: val})}>
            <SelectTrigger id="timeline" className="h-12 text-right flex-row-reverse border-gray-200 focus:border-primary">
              <SelectValue placeholder="اختر الموعد" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="مستعجل (24 ساعة)">⚡️ مستعجل (24 ساعة)</SelectItem>
              <SelectItem value="عادي (2-3 أيام)">📅 عادي (2-3 أيام)</SelectItem>
              <SelectItem value="مرن (أسبوع)">🧘‍♂️ مرن (أسبوع)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 text-base font-bold bg-gradient-primary hover:shadow-glow-lg transition-all duration-300 mt-6"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white text-foreground overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img 
              src={logoImage} 
              alt="BADII Logo" 
              className="h-14 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
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
                className="text-gray-700 hover:text-primary transition-colors relative group font-semibold"
              >
                {item}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow text-white font-bold px-8 rounded-full transition-all hover:scale-105">
                ابدأ الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white/95 backdrop-blur-2xl border-white/20 p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 p-8 border-b">
                <DialogHeader className="text-right space-y-3">
                  <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 flex items-center gap-3">
                    <Sparkles className="w-7 h-7 text-primary" />
                    ابدأ مشروعك الإبداعي
                  </DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
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
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl opacity-50" style={{ animationDelay: "2s" }} />
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
                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 border border-primary/20 backdrop-blur-sm shadow-lg"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-glow"></span>
                </span>
                <span className="text-sm font-bold text-primary">موثوق من 500+ عميل سعيد 🎉</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
                أطلق العنان <span className="text-gradient">لإبداعك</span>
                <br />
                <span className="text-gradient">مع بديع</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                نحول رؤيتك الإبداعية إلى واقع مذهل باستخدام أحدث تقنيات الذكاء الاصطناعي
                <span className="block mt-3 text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  ✨ صور احترافية • محتوى استثنائي • نتائج حقيقية
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="h-16 text-lg px-12 bg-gradient-primary hover:shadow-glow-lg rounded-full transition-all hover:scale-105 font-bold text-white shadow-xl"
                    >
                      <Rocket className="ml-3 w-6 h-6" />
                      احجز استشارة مجانية
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-white/95 backdrop-blur-2xl p-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 p-8 border-b">
                      <DialogHeader className="text-right space-y-3">
                        <DialogTitle className="text-3xl font-bold text-gradient">احجز استشارة مجانية</DialogTitle>
                        <DialogDescription className="text-base text-gray-600">
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
                  className="h-16 text-lg px-12 rounded-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all hover:scale-105 font-bold shadow-lg"
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
                  { icon: Zap, title: "سرعة خيالية", desc: "تسليم خلال 24 ساعة", color: "from-yellow-500 to-orange-500" },
                  { icon: Sparkles, title: "أسعار تنافسية", desc: "باقات تناسب الجميع", color: "from-primary to-blue-600" },
                  { icon: Crown, title: "جودة عالمية", desc: "احترافية في كل تفصيل", color: "from-purple-500 to-pink-500" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="group p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                    <p className="text-gray-600 font-medium">{stat.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="الخدمات" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 font-bold text-primary bg-primary/10 hover:bg-primary/20 px-6 py-2 text-base">
              خدماتنا
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">
              حلول إبداعية متكاملة
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              كل ما تحتاجه لتعزيز حضور علامتك التجارية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Camera,
                gradient: "from-purple-500 to-pink-500",
                title: "تصوير احترافي",
                desc: "صور فائقة الجودة تُبرز منتجاتك بأفضل صورة",
                features: ["صور 4K عالية الدقة", "خلفيات احترافية متنوعة", "تنسيق لجميع المنصات"]
              },
              {
                icon: PenTool,
                gradient: "from-primary to-blue-600",
                title: "محتوى تسويقي",
                desc: "كلمات مؤثرة تجذب جمهورك وتزيد مبيعاتك",
                features: ["منشورات جذابة", "أوصاف منتجات مقنعة", "نصوص إعلانية محترفة"]
              },
              {
                icon: Palette,
                gradient: "from-orange-500 to-red-500",
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
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white rounded-3xl overflow-hidden">
                  <CardHeader className="p-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3">{service.title}</CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <ul className="space-y-4">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0`}>
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full h-12 font-bold text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all rounded-xl"
                        >
                          اطلب الخدمة
                          <ArrowRight className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px] bg-white/95 backdrop-blur-2xl p-0">
                        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 p-8 border-b">
                          <DialogHeader className="text-right space-y-3">
                            <DialogTitle className="text-3xl font-bold text-gradient">اطلب {service.title}</DialogTitle>
                            <DialogDescription className="text-base">
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
      <section id="الأسعار" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 font-bold text-primary bg-primary/10 px-6 py-2 text-base">
              الأسعار
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">
              باقات تناسب طموحك
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
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
              <Card className="h-full border-2 bg-white shadow-lg hover:shadow-2xl rounded-3xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mb-6">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">الباقة الأساسية</CardTitle>
                  <CardDescription className="text-base mt-2">للمشاريع الناشئة</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold">399</span>
                    <span className="text-xl text-gray-500 font-bold mr-2">ريال</span>
                  </div>
                  <ul className="space-y-4">
                    {["8 صور 4K", "مراجعة مجانية", "تسليم 48 ساعة", "حقوق تجارية", "صيغ متعددة"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-14 bg-gray-900 hover:bg-gray-800 rounded-xl font-bold text-lg">
                        اختر الباقة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] bg-white/95 p-0">
                      <div className="bg-gray-100 p-8 border-b">
                        <DialogHeader className="text-right">
                          <DialogTitle className="text-3xl font-bold">طلب الباقة الأساسية</DialogTitle>
                        </DialogHeader>
                      </div>
                      <div className="p-8">
                        <ProjectRequestForm packageName="الباقة الأساسية (Starter)" />
                      </div>
                    </DialogContent>
                  </Dialog>
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
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <Card className="relative h-full border-0 bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl rounded-3xl overflow-hidden">
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white text-primary font-bold px-4 py-1.5 text-sm">
                      🔥 الأكثر طلباً
                    </Badge>
                  </div>
                  <CardHeader className="p-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold">الباقة الاحترافية</CardTitle>
                    <CardDescription className="text-blue-100 text-lg mt-2">للنمو المتسارع</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 pt-0">
                    <div className="mb-10">
                      <span className="text-6xl font-extrabold">799</span>
                      <span className="text-2xl text-blue-100 font-bold mr-2">ريال</span>
                    </div>
                    <ul className="space-y-5">
                      {["20 صورة 4K", "3 مراجعات", "تسليم 24 ساعة", "10 منشورات", "استشارة 30 دقيقة", "كابشنز احترافية"].map((f, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-bold text-white">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-10">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full h-16 bg-white text-primary hover:bg-gray-50 rounded-xl font-extrabold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                          اختر الباقة الاحترافية
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px] bg-white/95 p-0">
                        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 p-8 border-b">
                          <DialogHeader className="text-right">
                            <DialogTitle className="text-3xl font-bold text-gradient">طلب الباقة الاحترافية</DialogTitle>
                          </DialogHeader>
                        </div>
                        <div className="p-8">
                          <ProjectRequestForm packageName="الباقة الاحترافية (Pro)" />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>

            {/* Elite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 bg-white shadow-lg hover:shadow-2xl rounded-3xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                    <Gem className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">الباقة الشاملة</CardTitle>
                  <CardDescription className="text-base mt-2">للشركات الكبرى</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold">1,499</span>
                    <span className="text-xl text-gray-500 font-bold mr-2">ريال</span>
                  </div>
                  <ul className="space-y-4">
                    {["40 صورة 8K", "مراجعات لا محدودة", "تسليم 12 ساعة", "خطة محتوى شهرية", "مدير حساب VIP", "دعم 24/7"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-lg transition-all">
                        تواصل للطلب
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] bg-white/95 p-0">
                      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8 border-b">
                        <DialogHeader className="text-right">
                          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                            طلب الباقة الشاملة
                          </DialogTitle>
                        </DialogHeader>
                      </div>
                      <div className="p-8">
                        <ProjectRequestForm packageName="الباقة الشاملة (Elite)" />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              جاهز لتبدأ <span className="text-gradient from-blue-400 to-cyan-400">قصتك</span>؟
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              انضم إلى 500+ عميل سعيد واجعل علامتك التجارية تتألق
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-20 bg-white text-gray-900 hover:bg-gray-100 text-xl px-16 rounded-full shadow-2xl transition-all hover:scale-110 font-extrabold">
                    <MessageCircle className="ml-3 w-7 h-7" />
                    ابدأ مشروعك الآن
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-white/95 p-0">
                  <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 p-8 border-b">
                    <DialogHeader className="text-right space-y-3">
                      <DialogTitle className="text-3xl font-bold text-gradient">ابدأ مشروعك الآن</DialogTitle>
                      <DialogDescription className="text-base">
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
                className="h-20 border-2 border-white/30 text-white hover:bg-white/10 text-xl px-16 rounded-full backdrop-blur-sm font-bold"
              >
                <Phone className="ml-3 w-7 h-7" />
                تواصل معنا
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src={logoImage} alt="BADII Logo" className="h-14 mb-6 opacity-90" />
              <p className="text-gray-500 leading-relaxed">
                شريكك الإبداعي الأول في عالم الذكاء الاصطناعي. نصنع الفرق في كل تفصيل.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">روابط سريعة</h3>
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
              <h3 className="text-white font-bold text-lg mb-6">تواصل معنا</h3>
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
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-600">
              © 2025 BADII. جميع الحقوق محفوظة • صُنع بـ <span className="text-red-500">❤</span> في السعودية
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
