import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const QUICK_OPTIONS = [
    "وش خدماتكم؟",
    "بكم الأسعار؟",
    "أبي الصورة المجانية",
    "كيف أطلب؟"
];

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "مرحباً بك في بديع! ✨ أنا مساعدك الذكي، كيف أقدر أساعدك اليوم في تصوير منتجاتك أو صناعة محتواك؟" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async (customMessage?: string) => {
        const textToSend = customMessage || input;
        if (!textToSend.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const { getGeminiResponse } = await import("@/lib/gemini");
            const aiResponse = await getGeminiResponse(textToSend);

            const assistantMessage: Message = {
                role: "assistant",
                content: aiResponse
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage: Message = {
                role: "assistant",
                content: "أعتذر منك، حصل خطأ بسيط. جرب مرة ثانية؟"
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans" dir="rtl">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4"
                    >
                        <Card className="w-[350px] sm:w-[400px] h-[550px] flex flex-col border-white/20 bg-black/90 backdrop-blur-2xl shadow-2xl shadow-primary/20 overflow-hidden">
                            <CardHeader className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-transparent">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-inner">
                                            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-bold text-white">مساعد بديع الذكي</CardTitle>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] text-zinc-400">متصل الآن</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white hover:bg-white/10 h-8 w-8 rounded-full">
                                        <X size={18} />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-hidden p-0 relative flex flex-col">
                                <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
                                    <div className="space-y-4">
                                        {messages.map((m, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: m.role === "user" ? -20 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                                            : "bg-white/10 text-zinc-200 border border-white/10 rounded-bl-none"
                                                        }`}
                                                >
                                                    {m.content}
                                                </div>
                                            </motion.div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 rounded-bl-none">
                                                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Options Area */}
                                {!isLoading && (
                                    <div className="p-3 border-t border-white/5 flex gap-2 flex-wrap bg-white/[0.02]">
                                        {QUICK_OPTIONS.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleSend(option)}
                                                className="text-[11px] bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 rounded-full px-3 py-1.5 transition-all text-zinc-400"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="p-4 border-t border-white/10 bg-black/40">
                                <div className="flex w-full items-center gap-2">
                                    <Input
                                        placeholder="اكتب استفسارك هنا..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-primary/50 text-xs sm:text-sm"
                                    />
                                    <Button size="icon" onClick={() => handleSend()} disabled={isLoading} className="bg-primary hover:bg-primary/90 rounded-xl shrink-0">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative group ${isOpen ? "bg-zinc-800" : "bg-primary"
                    }`}
            >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:blur-xl transition-all duration-300 animate-pulse" />
                {isOpen ? (
                    <X className="w-6 h-6 text-white relative z-10" />
                ) : (
                    <div className="relative z-10">
                        <Bot className="w-7 h-7 text-white" />
                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"
                        />
                    </div>
                )}
            </motion.button>
        </div>
    );
}
