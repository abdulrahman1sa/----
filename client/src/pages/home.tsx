import { useState } from "react";
import { motion } from "framer-motion";
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
  Send
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

function ProjectRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    projectGoal: "",
    budget: "",
    timeline: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
مرحباً، أرغب في بدء مشروع جديد مع BADII:

👤 الاسم: ${formData.name}
🛠 نوع الخدمة: ${formData.serviceType}
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
          className="h-12 text-right"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service" className="text-base font-medium">نوع الخدمة المطلوبة</Label>
        <Select required onValueChange={(val) => setFormData({...formData, serviceType: val})}>
          <SelectTrigger id="service" className="h-12 text-right flex-row-reverse">
            <SelectValue placeholder="اختر نوع الخدمة" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="تصوير منتجات احترافي">📸 تصوير منتجات احترافي</SelectItem>
            <SelectItem value="كتابة محتوى تسويقي">✍️ كتابة محتوى تسويقي</SelectItem>
            <SelectItem value="تصميم هوية بصرية وشعارات">🎨 تصميم هوية بصرية وشعارات</SelectItem>
            <SelectItem value="تصاميم سوشال ميديا">📱 تصاميم سوشال ميديا</SelectItem>
            <SelectItem value="باقة متكاملة (تصوير + محتوى + تصميم)">🚀 باقة متكاملة (تصوير + محتوى + تصميم)</SelectItem>
            <SelectItem value="أخرى">✨ أخرى</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal" className="text-base font-medium">تفاصيل المشروع / الهدف منه</Label>
        <Textarea 
          id="goal" 
          placeholder="أخبرنا المزيد عن مشروعك.. مثلاً: أحتاج صور لمنتجات قهوة لمتجري الإلكتروني لزيادة المبيعات" 
          className="min-h-[100px] text-right resize-none"
          required
          value={formData.projectGoal}
          onChange={(e) => setFormData({...formData, projectGoal: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">الميزانية المتوقعة</Label>
          <Select required onValueChange={(val) => setFormData({...formData, budget: val})}>
            <SelectTrigger id="budget" className="h-12 text-right flex-row-reverse">
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
            <SelectTrigger id="timeline" className="h-12 text-right flex-row-reverse">
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

      <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 mt-4">
        إرسال الطلب عبر واتساب <Send className="mr-2 h-5 w-5" />
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-bold font-heading">BADII | بديع</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#services" className="hover:text-primary transition-colors">الخدمات</a>
            <a href="#process" className="hover:text-primary transition-colors">كيف نعمل</a>
            <a href="#pricing" className="hover:text-primary transition-colors">الأسعار</a>
            <a href="#faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</a>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                ابدأ الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20">
              <DialogHeader className="text-right space-y-4">
                <DialogTitle className="text-2xl font-bold font-heading text-primary">ابدأ مشروعك الإبداعي</DialogTitle>
                <DialogDescription className="text-base">
                  املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                </DialogDescription>
              </DialogHeader>
              <ProjectRequestForm />
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.07]" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/50 text-primary bg-primary/5 backdrop-blur-sm">
              ✨ موثوق من 500+ عميل سعيد
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
              أطلق العنان لإبداعك مع <span className="text-gradient">BADII</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              صور احترافية ومحتوى استثنائي بالذكاء الاصطناعي.
              <br className="hidden md:block" />
              نحول رؤيتك الإبداعية إلى واقع مذهل.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                    احجز استشارة مجانية
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20">
                  <DialogHeader className="text-right space-y-4">
                    <DialogTitle className="text-2xl font-bold font-heading text-primary">احجز استشارة مجانية</DialogTitle>
                    <DialogDescription className="text-base">
                      املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                    </DialogDescription>
                  </DialogHeader>
                  <ProjectRequestForm />
                </DialogContent>
              </Dialog>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:bg-white/5">
                شاهد أعمالنا
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
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">المشكلة في الأدوات العادية</h2>
              <ul className="space-y-4">
                {[
                  "إضاءة سيئة وألوان باهتة",
                  "تفاصيل غير واقعية",
                  "تقلل من قيمة علامتك التجارية"
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
                  "إضاءة احترافية وألوان جذابة",
                  "تفاصيل دقيقة وواقعية",
                  "تعزز علامتك التجارية وترفع مبيعاتك"
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-10 h-10 text-purple-500" />,
                title: "توليد الصور الاحترافية",
                desc: "صور فائقة الجودة لمنتجاتك وخدماتك. من تصوير الأطعمة الشهية إلى صور المنتجات التجارية المثالية.",
                features: ["صور منتجات بخلفيات احترافية", "جودة 4K وصيغ متعددة"]
              },
              {
                icon: <PenTool className="w-10 h-10 text-blue-500" />,
                title: "كتابة المحتوى التسويقي",
                desc: "محتوى مقنع ومؤثر يتحدث بصوت علامتك التجارية ويجذب جمهورك المستهدف.",
                features: ["محتوى سوشال ميديا إبداعي", "أوصاف منتجات جذابة"]
              },
              {
                icon: <Palette className="w-10 h-10 text-pink-500" />,
                title: "التصاميم الإبداعية",
                desc: "تصاميم مبتكرة تجمع بين الجمال والفعالية لتحقيق أهدافك التسويقية.",
                features: ["بوسترات وإعلانات رقمية", "تصاميم قصص وريلز"]
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
              { step: "01", title: "شاركنا رؤيتك", desc: "تواصل معنا عبر واتساب وأخبرنا عن مشروعك." },
              { step: "02", title: "نصمم الحل", desc: "نقترح عليك الباقة المناسبة ونناقش التفاصيل." },
              { step: "03", title: "نبدع ونطور", desc: "فريقنا يبدأ العمل باستخدام أحدث التقنيات." },
              { step: "04", title: "نسلم ونتابع", desc: "تستلم مشروعك في الوقت المحدد مع الدعم." }
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

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">باقات مصممة لتناسب احتياجاتك</h2>
            <p className="text-xl text-muted-foreground">اختر الباقة المناسبة وابدأ رحلتك الإبداعية معنا</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="relative overflow-hidden border-muted">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">الباقة الأساسية</CardTitle>
                <CardDescription>مثالية للمشاريع الصغيرة</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">399</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["8 صور عالية الجودة (4K)", "مراجعة واحدة مجانية", "تسليم خلال 48 ساعة", "حقوق استخدام تجاري"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">احجز الآن</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader className="text-right space-y-4">
                      <DialogTitle className="text-2xl font-bold font-heading text-primary">طلب الباقة الأساسية</DialogTitle>
                      <DialogDescription className="text-base">
                        املأ النموذج التالي لتأكيد حجز الباقة.
                      </DialogDescription>
                    </DialogHeader>
                    <ProjectRequestForm />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card className="relative overflow-hidden border-primary shadow-2xl shadow-primary/10 scale-105 z-10 bg-primary/5">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">الأكثر طلباً</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary">الباقة الاحترافية</CardTitle>
                <CardDescription>للأعمال المتنامية</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">799</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "20 صورة عالية الجودة (4K)", 
                    "3 مراجعات مجانية", 
                    "تسليم سريع خلال 24 ساعة", 
                    "كتابة محتوى تسويقي (10 منشورات)",
                    "استشارة مجانية 30 دقيقة"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 size={18} className="text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">احجز الآن</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader className="text-right space-y-4">
                      <DialogTitle className="text-2xl font-bold font-heading text-primary">طلب الباقة الاحترافية</DialogTitle>
                      <DialogDescription className="text-base">
                        املأ النموذج التالي لتأكيد حجز الباقة.
                      </DialogDescription>
                    </DialogHeader>
                    <ProjectRequestForm />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Elite */}
            <Card className="relative overflow-hidden border-muted">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">الباقة الشاملة</CardTitle>
                <CardDescription>للشركات الكبيرة</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">1,499</span>
                  <span className="text-muted-foreground mr-1">ريال</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "40 صورة عالية الجودة (4K + 8K)", 
                    "مراجعات غير محدودة", 
                    "تسليم express خلال 12 ساعة", 
                    "خطة محتوى لمدة شهر",
                    "مدير حساب مخصص"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">احجز الآن</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20">
                    <DialogHeader className="text-right space-y-4">
                      <DialogTitle className="text-2xl font-bold font-heading text-primary">طلب الباقة الشاملة</DialogTitle>
                      <DialogDescription className="text-base">
                        املأ النموذج التالي لتأكيد حجز الباقة.
                      </DialogDescription>
                    </DialogHeader>
                    <ProjectRequestForm />
                  </DialogContent>
                </Dialog>
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
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-7 rounded-full shadow-2xl transition-transform hover:scale-105">
                <MessageCircle className="ml-2" />
                تحدث معنا وابدأ مشروعك
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20 text-foreground">
              <DialogHeader className="text-right space-y-4">
                <DialogTitle className="text-2xl font-bold font-heading text-primary">ابدأ مشروعك الآن</DialogTitle>
                <DialogDescription className="text-base">
                  املأ النموذج التالي لنفهم احتياجاتك بدقة ونقدم لك العرض الأنسب.
                </DialogDescription>
              </DialogHeader>
              <ProjectRequestForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">B</div>
            <span className="text-xl font-bold text-white font-heading">BADII</span>
          </div>
          <p>© 2025 BADII. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
