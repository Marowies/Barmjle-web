"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب (حرفين على الأقل)"),
    university: z.string().optional(),
    serviceNeeded: z.string().min(1, "الرجاء اختيار نوع الخدمة"),
    deadline: z.string().optional(),
    message: z.string().min(10, "الرسالة يجب أن تكون مفصلة (10 أحرف على الأقل)"),
    whatsapp: z.string().regex(/^\+?[0-9]*$/, "برجاء إدخال أرقام فقط").optional().or(z.literal("")),
    telegram: z.string().regex(/^@?[\w\d_]+$/, "اسم المستخدم غير صالح").optional().or(z.literal("")),
    email: z.string().email("البريد الإلكتروني غير صالح").optional().or(z.literal("")),
}).refine(data => {
    return !!data.whatsapp || !!data.telegram || !!data.email;
}, {
    message: "برجاء توفير وسيلة تواصل واحدة على الأقل.",
    path: ["contact_method"]
});


export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            university: "",
            serviceNeeded: "",
            deadline: "",
            message: "",
            whatsapp: "",
            telegram: "",
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        setStatus("idle");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setStatus("success");
            form.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card p-6 md:p-12 rounded-[2.5rem] border border-border shadow-premium relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />

            <h3 className="text-3xl font-extrabold mb-8 text-foreground relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                تواصل معنا
            </h3>

            {status === "success" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-green-500/10 text-green-600 rounded-2xl border border-green-500/20 flex items-center gap-4 relative z-10"
                >
                    <CheckCircle className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-lg">تم استلام طلبك بنجاح!</p>
                        <p className="text-sm opacity-90">سنتواصل معك في أسرع وقت ممكن عبر وسيلة التواصل المفضلة لديك.</p>
                    </div>
                </motion.div>
            )}

            {status === "error" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-red-500/10 text-red-600 rounded-2xl border border-red-500/20 flex items-center gap-4 relative z-10"
                >
                    <AlertCircle className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-lg">عذراً، حدث خطأ ما</p>
                        <p className="text-sm opacity-90">يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر الواتساب.</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 px-1">الاسم الكامل</label>
                        <input
                            {...form.register("name")}
                            className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg"
                            placeholder="أدخل اسمك هنا..."
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm font-bold px-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 px-1">الجامعة (اختياري)</label>
                        <input
                            {...form.register("university")}
                            className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg"
                            placeholder="اسم جامعتك"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 px-1">نوع الخدمة</label>
                        <div className="relative">
                            <select
                                {...form.register("serviceNeeded")}
                                className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg appearance-none cursor-pointer"
                            >
                                <option value="">اختر الخدمة المطلوبة</option>
                                <option value="cs-tutoring">شرح مواد CS</option>
                                <option value="graduation-project">مشروع تخرج</option>
                                <option value="software-project">مشروع برمجي</option>
                                <option value="consultation">استشارة تقنية</option>
                                <option value="training">تدريب</option>
                                <option value="other">أخرى</option>
                            </select>
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {form.formState.errors.serviceNeeded && (
                            <p className="text-red-500 text-sm font-bold px-1">{form.formState.errors.serviceNeeded.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 px-1">الموعد النهائي (اختياري)</label>
                        <input
                            {...form.register("deadline")}
                            type="date"
                            className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70 px-1">تفاصيل الطلب</label>
                    <textarea
                        {...form.register("message")}
                        rows={5}
                        className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg resize-none"
                        placeholder="اشرح لنا ما تحتاج إليه بالتفصيل لنتمكن من مساعدتك بأفضل شكل..."
                    />
                    {form.formState.errors.message && (
                        <p className="text-red-500 text-sm font-bold px-1">{form.formState.errors.message.message}</p>
                    )}
                </div>

                {/* معلومات التواصل Section */}
                <div className="pt-8 border-t border-border mt-8">
                    <h4 className="text-xl font-extrabold mb-2 text-foreground">معلومات التواصل</h4>
                    <p className="text-sm text-foreground/50 mb-6">يرجى إدخال وسيلة تواصل واحدة على الأقل لنتمكن من الرد عليك.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70 px-1">واتساب</label>
                            <input
                                {...form.register("whatsapp")}
                                type="tel"
                                className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg text-left"
                                placeholder="+1234567890"
                                dir="ltr"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70 px-1">تيليجرام</label>
                            <input
                                {...form.register("telegram")}
                                className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg text-left"
                                placeholder="@username"
                                dir="ltr"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70 px-1">بريد إلكتروني</label>
                            <input
                                {...form.register("email")}
                                type="email"
                                className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-lg text-left"
                                placeholder="name@email.com"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {(form.formState.errors as any).contact_method && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-sm font-bold mt-6 p-4 bg-red-500/5 rounded-2xl border border-red-500/20 flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5" />
                            {(form.formState.errors as any).contact_method.message}
                        </motion.p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white rounded-[2rem] font-extrabold text-xl shadow-premium hover:bg-primary-hover hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-10"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            جاري معالجة طلبك...
                        </>
                    ) : (
                        <>
                            <span>إرسال الطلب الآن</span>
                            <CheckCircle className="w-6 h-6" />
                        </>
                    )}
                </button>
            </form>
            );
}

