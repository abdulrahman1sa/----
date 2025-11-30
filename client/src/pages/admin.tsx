import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft,
  Calendar,
  Phone,
  User,
  Briefcase,
  Clock,
  Target,
  MessageSquare,
  Palette,
  RefreshCw,
  Inbox
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@assets/logo.png";
import type { Booking } from "@shared/schema";

const projectTypeLabels: Record<string, string> = {
  photography: "تصوير منتجات",
  content: "كتابة محتوى",
  video: "إنتاج فيديو",
  full: "باقة متكاملة"
};

const budgetLabels: Record<string, string> = {
  starter: "انطلاقة (299 ر.س)",
  growth: "نمو ذكي (999 ر.س)",
  premium: "قيادة استراتيجية (1,799 ر.س)"
};

export default function Admin() {
  const { data: bookings, isLoading, refetch, isRefetching } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" 
      />

      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src={logo} alt="BADII Logo" className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform" />
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-heading font-bold text-lg">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                الرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold font-heading mb-2">الحجوزات</h2>
                <p className="text-muted-foreground">
                  إجمالي الطلبات: {bookings?.length || 0}
                </p>
              </div>
              <Badge variant="outline" className="text-sm py-1.5 px-4">
                <Clock className="w-4 h-4 ml-2" />
                آخر تحديث: الآن
              </Badge>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-5 bg-muted rounded w-32" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all border-border/50 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-heading flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          {booking.name}
                        </CardTitle>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                          #{booking.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span dir="ltr">{booking.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <Badge variant="secondary" className="font-normal">
                          {projectTypeLabels[booking.projectType] || booking.projectType}
                        </Badge>
                      </div>

                      {booking.budget && (
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {budgetLabels[booking.budget] || booking.budget}
                          </span>
                        </div>
                      )}

                      {booking.goal && (
                        <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                          <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <p className="text-muted-foreground line-clamp-2">{booking.goal}</p>
                        </div>
                      )}

                      {booking.mood && (
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{booking.mood}</span>
                        </div>
                      )}

                      {booking.createdAt && (
                        <div className="flex items-center gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(booking.createdAt).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}

                      <Button 
                        size="sm" 
                        className="w-full mt-3 gap-2"
                        onClick={() => window.open(`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=مرحباً ${booking.name}، شكراً لتواصلك مع بديع!`, '_blank')}
                      >
                        <Phone className="w-4 h-4" />
                        تواصل عبر واتساب
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Inbox className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">لا توجد حجوزات بعد</h3>
              <p className="text-muted-foreground mb-6">
                ستظهر الحجوزات الجديدة هنا فور وصولها
              </p>
              <Link href="/#booking">
                <Button className="gap-2">
                  إنشاء حجز تجريبي
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
