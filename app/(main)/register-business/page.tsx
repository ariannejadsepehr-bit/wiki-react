'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Check, ArrowLeft, MapPin, Phone, Tag, Image, Loader2 } from 'lucide-react';

const steps = [
  { id: 1, label: 'اطلاعات پایه', icon: Building2 },
  { id: 2, label: 'دسته و موقعیت', icon: MapPin },
  { id: 3, label: 'تماس و شبکه', icon: Phone },
  { id: 4, label: 'تأیید و انتشار', icon: Check },
];

const categories = [
  'وکیل', 'پزشک', 'دندانپزشک', 'رستوران', 'کلینیک زیبایی',
  'کاشت مو', 'هتل', 'آموزشگاه', 'خودرو', 'ساختمان',
  'داروخانه', 'روانپزشک',
];

export default function RegisterBusinessPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: '', city: '', address: '',
    phone: '', website: '', description: '',
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setStep(4);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container-wiki py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2">ثبت کسب‌وکار</h1>
            <p className="text-muted-foreground">به بیش از ۵۰۰,۰۰۰ کاربر دسترسی پیدا کنید</p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.id ? 'bg-green-600 text-white' :
                  step === s.id ? 'bg-blue-700 text-white' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-medium ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step > s.id ? 'bg-green-500' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6 lg:p-8">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">اطلاعات پایه</h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">نام کسب‌وکار *</label>
                  <input
                    type="text" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: کلینیک زیبایی آرمان"
                    className="w-full h-11 border border-border rounded-xl px-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">توضیح کوتاه *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="یک تا دو جمله درباره کسب‌وکارتان بنویسید..."
                    rows={3}
                    className="w-full border border-border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">دسته و موقعیت</h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">دسته‌بندی *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors text-right ${
                          formData.category === cat
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700'
                            : 'border-border hover:bg-accent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">شهر *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 border border-border rounded-xl px-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                  >
                    <option value="">انتخاب شهر</option>
                    <option>تهران</option><option>مشهد</option><option>اصفهان</option>
                    <option>شیراز</option><option>تبریز</option><option>کرج</option>
                    <option>اهواز</option><option>رشت</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">آدرس دقیق</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="خیابان، کوچه، پلاک..."
                    rows={2}
                    className="w-full border border-border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground">تماس و شبکه‌های اجتماعی</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">شماره تماس *</label>
                    <input type="tel" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="021 - xxxxxxxx"
                      className="w-full h-11 border border-border rounded-xl px-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif', direction: 'ltr', textAlign: 'right' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">وبسایت</label>
                    <input type="url" value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full h-11 border border-border rounded-xl px-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif', direction: 'ltr', textAlign: 'right' }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                  <p className="text-sm font-semibold text-blue-700 mb-2">اطلاعات بیشتر = دیده شدن بیشتر</p>
                  <p className="text-xs text-blue-600">کسب‌وکارهایی که اطلاعات کامل‌تری دارند، در نتایج جستجو بالاتر قرار می‌گیرند.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-foreground mb-2">کسب‌وکار شما ثبت شد!</h2>
                <p className="text-muted-foreground mb-6 leading-6">
                  درخواست ثبت کسب‌وکار شما دریافت شد. پس از بررسی توسط تیم ما (معمولاً ظرف ۲۴ ساعت)، پروفایل شما فعال می‌شود.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/dashboard" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors">
                    رفتن به داشبورد
                  </Link>
                  <Link href="/dashboard/billing" className="px-6 py-3 border-2 border-border font-semibold rounded-xl hover:bg-accent transition-colors">
                    ارتقاء به پلن ویژه
                  </Link>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="flex justify-between mt-6 pt-5 border-t border-border">
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" /> قبلی
                </button>
                <button
                  onClick={step === 3 ? handleSubmit : handleNext}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 disabled:opacity-60 transition-colors"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {step === 3 ? 'ثبت کسب‌وکار' : 'بعدی'}
                  {step < 3 && <ArrowLeft className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
