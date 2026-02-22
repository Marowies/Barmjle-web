"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب (حرفين على الأقل)"),
    university: z.string().optional(),
    serviceNeeded: z.string().min(1, "الرجاء اختيار نوع الخدمة"),
    deadline: z.string().optional(),
    message: z.string().min(10, "الرسالة يجب أن تكون مفصلة (10 أحرف على الأقل)"),
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
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">تواصل معنا</h3>

            {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    تم استلام طلبك بنجاح! سنتواصل معك قريباً.
                </div>
            )}

            {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">الاسم</label>
                        <input
                            {...form.register("name")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="اسمك الكامل"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">الجامعة (اختياري)</label>
                        <input
                            {...form.register("university")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="اسم الجامعة"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">نوع الخدمة</label>
                    <select
                        {...form.register("serviceNeeded")}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                        <option value="">اختر الخدمة المطلوبة</option>
                        <option value="cs-tutoring">شرح مواد CS</option>
                        <option value="graduation-project">مشروع تخرج</option>
                        <option value="software-project">مشروع برمجي</option>
                        <option value="consultation">استشارة تقنية</option>
                        <option value="training">تدريب</option>
                        <option value="other">أخرى</option>
                    </select>
                    {form.formState.errors.serviceNeeded && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.serviceNeeded.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">الموعد النهائي (اختياري)</label>
                    <input
                        {...form.register("deadline")}
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">تفاصيل الطلب</label>
                    <textarea
                        {...form.register("message")}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="اشرح لنا ما تحتاج إليه بالتفصيل..."
                    />
                    {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            جاري الإرسال...
                        </>
                    ) : (
                        "إرسال الطلب"
                    )}
                </button>
            </form>
        </div>
    );
}
