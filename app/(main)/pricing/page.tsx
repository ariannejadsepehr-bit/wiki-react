import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Crown, Shield, Zap, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'پلن‌ها و قیمت‌گذاری | ویکی بهترین',
  description: 'پلن مناسب کسب‌وکارتان را انتخاب کنید. شروع رایگان، ارتقاء در هر زمان.',
};

const plans = [
  {
    name: 'رایگان', nameEn: 'Free', price: '۰', period: 'همیشه',
    color: 'border-border', btnClass: 'border-2 border-border text-foreground hover:bg-secondary',
    icon: Shield, iconColor: 'text-gray-500',
    features: ['پروفایل پایه', 'حداکثر ۳ تصویر', 'اطلاعات تماس', 'نظرات کاربران', 'نقشه مکان'],
  },
  {
    name: 'پایه', nameEn: 'Basic', price: '۲۹۹,۰۰۰', period: 'ماهانه',
    color: 'border-blue-400', btnClass: 'bg-blue-700 text-white hover:bg-blue-800',
    icon: Zap, iconColor: 'text-blue-600',
    features: [
      'همه امکانات رایگان', 'تا ۱۵ تصویر', 'ویدیو', 'خدمات و قیمت‌ها',
      'ساعات کاری', 'آمار پایه', 'پاسخ به نظرات', 'لینک وبسایت',
    ],
  },
  {
    name: 'ویژه', nameEn: 'Premium', price: '۷۹۹,۰۰۰', period: 'ماهانه',
    color: 'border-amber-400 shadow-xl scale-105', btnClass: 'bg-amber-500 text-white hover:bg-amber-600',
    icon: Crown, iconColor: 'text-amber-500',
    badge: 'محبوب‌ترین',
    features: [
      'همه امکانات پایه', 'تصاویر نامحدود', 'نمایش ویژه صفحه اول',
      'آمار و تحلیل پیشرفته', 'نمایش در تبلیغات', 'مدیریت نظرات',
      'پشتیبانی اختصاصی', 'تولید محتوا با هوش مصنوعی', 'لوگو در نتایج جستجو',
    ],
  },
  {
    name: 'سازمانی', nameEn: 'Enterprise', price: 'تماس', period: 'سفارشی',
    color: 'border-border', btnClass: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-50',
    icon: Phone, iconColor: 'text-gray-700',
    features: [
      'همه امکانات ویژه', 'چند شعبه', 'API اختصاصی',
      'داشبورد سفارشی', 'مدیر حساب اختصاصی', 'SLA تضمینی',
      'آموزش تیم', 'قرارداد سفارشی',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="container-wiki text-center">
          <h1 className="text-4xl font-black mb-3">پلن‌ها و قیمت‌گذاری</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            شروع رایگان، ارتقاء در هر زمان. بدون نیاز به کارت بانکی.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="text-blue-200 text-sm">پرداخت ماهانه</span>
            <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
            </div>
            <span className="text-white text-sm font-semibold">پرداخت سالانه <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">۲۰٪ تخفیف</span></span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container-wiki py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white dark:bg-gray-950 rounded-2xl border-2 p-6 flex flex-col ${plan.color}`}>
              {plan.badge && (
                <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="mb-5">
                <plan.icon className={`w-8 h-8 mb-3 ${plan.iconColor}`} />
                <h2 className="text-xl font-black text-foreground">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">{plan.nameEn}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  {plan.price !== 'تماس' && <span className="text-muted-foreground text-sm">تومان / {plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.price === 'تماس' ? '/contact' : '/register-business'} className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-colors block ${plan.btnClass}`}>
                {plan.price === 'تماس' ? 'تماس با فروش' : plan.price === '۰' ? 'شروع رایگان' : 'انتخاب پلن'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wiki pb-16">
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-black text-foreground mb-6 text-center">سوالات متداول</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { q: 'آیا پرداخت ماهانه انجام می‌شود؟', a: 'بله، شما می‌توانید ماهانه یا سالانه پرداخت کنید. پرداخت سالانه ۲۰٪ تخفیف دارد.' },
              { q: 'آیا می‌توانم پلن را تغییر دهم؟', a: 'بله، در هر زمان می‌توانید پلن خود را ارتقاء یا کاهش دهید.' },
              { q: 'درگاه‌های پرداخت چیست؟', a: 'از درگاه‌های زرین‌پال، آیدی‌پی و نکست‌پی پشتیبانی می‌کنیم.' },
              { q: 'آیا بازپرداخت امکان‌پذیر است؟', a: 'در صورت عدم رضایت، تا ۷ روز امکان استرداد وجه دارید.' },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-foreground mb-1.5">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
