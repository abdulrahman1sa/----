export async function getGeminiResponse(userMessage: string) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
        return "خطأ: لم يتم ضبط مفتاح الـ API. يرجى إضافة VITE_GEMINI_API_KEY إلى إعدادات Vercel أو ملف الـ .env";
    }

    try {
        const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gemini-1.5-flash",
                messages: [
                    {
                        role: "system",
                        content: `أنت مساعد ذكي لموقع "بديع" (BADII). موقع بديع متخصص في تحويل صور المنتجات العادية المصورة بالجوال إلى صور إعلانية احترافية باستخدام الذكاء الاصطناعي. 
            خدماتنا: تصوير منتجات، كتابة محتوى، ومونتاج فيديو. 
            باقاتنا تبدأ من 99 ريال. 
            شعارنا: "صور منتجك بجوالك ونحولها لإعلان".
            أجب على العميل بلهجة سعودية بيضاء، ودودة واحترافية. حاول دائماً تشجيعه على تجربة الخدمة المجانية أو التواصل عبر الواتساب (رقم الواتساب: 966507553404).`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("AIML API Error:", errorData);
            throw new Error(errorData.message || "Failed to get response");
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Chat Error:", error);
        return "أعتذر منك، واجهت مشكلة بسيطة في الاتصال. ممكن تحاول مرة ثانية؟";
    }
}
