import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Sparkles, 
  Target, 
  Eye, 
  Heart,
  ArrowLeft,
  MessageCircle,
  Lightbulb,
  Rocket,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px] -z-10" 
      />

      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <img src={logo} alt="BADII Logo" className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform" />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6">من نحن</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              قصة <span className="text-primary">بديع</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نؤمن بأن كل منتج يستحق أن يُروى بطريقة استثنائية
            </p>
          </motion.div>

          <motion.section 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">البداية</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                بدأت فكرة بديع من ملاحظة بسيطة: أصحاب المشاريع الصغيرة والمتوسطة يملكون منتجات رائعة، 
                لكنهم يفتقرون للأدوات والخبرة اللازمة لتقديمها بشكل احترافي. التصوير الاحترافي مكلف، 
                وكتابة المحتوى التسويقي تحتاج خبرة، وإنتاج الفيديوهات يتطلب استوديوهات ومعدات.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                هنا جاءت فكرة بديع: استخدام الذكاء الاصطناعي لتحويل صور بسيطة إلى محتوى تسويقي احترافي 
                بتكلفة معقولة وسرعة استثنائية.
              </p>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">رؤيتنا</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                أن نكون الشريك الإبداعي الأول لكل صاحب مشروع يريد أن يروي قصة منتجه بطريقة تلمس القلوب وتحرك المبيعات.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading">مهمتنا</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                تمكين أصحاب المشاريع من المنافسة بمحتوى بصري عالي الجودة دون الحاجة لميزانيات ضخمة أو خبرة تقنية.
              </p>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">قيمنا</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "الإبداع",
                  description: "نبتكر حلولاً فريدة تميز عملاءنا عن منافسيهم"
                },
                {
                  icon: Rocket,
                  title: "السرعة",
                  description: "نسلّم المشاريع بسرعة دون التنازل عن الجودة"
                },
                {
                  icon: Heart,
                  title: "الشغف",
                  description: "نتعامل مع كل مشروع وكأنه مشروعنا الخاص"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold font-heading text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary/10 to-zinc-900/50 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              مستعد تبدأ رحلتك معنا؟
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              تواصل معنا اليوم ودعنا نحول صور منتجاتك إلى قصص نجاح
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
                  <Sparkles className="w-5 h-5" />
                  احجز استشارة مجانية
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl gap-2"
                onClick={() => window.open('https://wa.me/966509567267?text=مرحباً، أريد معرفة المزيد عن خدماتكم', '_blank')}
              >
                <MessageCircle className="w-5 h-5" />
                تواصل واتساب
              </Button>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 بديع. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full ${className}`}>
      {children}
    </span>
  );
}
