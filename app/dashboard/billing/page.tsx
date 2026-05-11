import { Crown, Check, Star, Zap, Shield, BarChart2 } from 'lucide-react';

const plans = [
  {
    name: 'رایگان',
    price: '۰',
    period: 'همیشه رایگان',
    color: 'border-border',
    badge: null,
    features: [
      'پروفایل پایه', 'حداکثر ۳ تصویر', 'اطلاعات تماس',
      'نمایش در نتایج جستجو', 'نظرات کاربران',
    ],
    notIncluded: ['نمایش ویژه', 'تحلیل پیشرفته', 'پشتیبانی اختصاصی'],
    cta: 'پلن فعلی',
    current: true,
  },
  {
    name: 'پایه',
    price: '۲۹۹,۰۰۰',
    period: 'ماهانه',
    color: 'border-blue-300 dark:border-blue-700',
    badge: null,
    features: [
      'همه امکانات رایگان', 'تا ۱۵ تصویر', 'فیلم‌ها',
      'خدمات و قیمت‌ها', 'آمار پایه', 'پاسخ به نظرات',
    ],
    notIncluded: ['نمایش ویژه در صفحه اول', 'پشتیبانی اختصاصی'],
    cta: 'انتخاب پلن پایه',
    current: false,
  },
  {
    name: 'ویژه',
    price: '۷۹۹,۰۰۰',
    period: 'ماهانه',
    color: 'border-amber-400',
    badge: 'محبوب‌ترین',
    features: [
      'همه امکانات پایه', 'تصاویر نامحدود', 'نمایش ویژه در صفحه اول',
      'آمار پیشرفته', 'مدیریت نظرات', 'پشتیبانی اختصاصی',
      'تولید محتوا با هوش مصنوعی',
    ],
    notIncluded: [],
    cta: 'شروع آزمایشی رایگان',
    current: false,
    recommended: true,
  },
  {
    name: 'سازمانی',
    price: 'تماس بگیرید',
    period: 'سفارشی',
    color: 'border-gray-300 dark:border-gray-700',
    badge: null,
    features: [
      'همه امکانات ویژه', 'چند شعبه', 'API اختصاصی',
      'داشبورد سفارشی', 'مدیر حساب اختصاصی', 'SLA تضمینی',
    ],
    notIncluded: [],
    cta: 'تماس با فروش',
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">پلن‌ها و اشتراک</h1>
        <p className="text-muted-foreground text-sm mt-1">کسب‌وکار خود را ارتقاء دهید و بیشتر دیده شوید</p>
      </div>

      {/* Current plan */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">پلن فعلی: رایگان</p>
              <p className="text-sm text-muted-foreground">بدون تاریخ انقضا</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-lg font-black text-foreground">۰ تومان</p>
              <p className="text-xs text-muted-foreground">ماهانه</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white dark:bg-gray-950 rounded-2xl border-2 p-5 flex flex-col ${plan.color} ${plan.recommended ? 'shadow-lg' : ''}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {plan.badge}
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {plan.name === 'ویژه' && <Crown className="w-5 h-5 text-amber-500" />}
                <h3 className="font-black text-foreground text-lg">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-foreground">{plan.price}</span>
                {plan.price !== 'تماس بگیرید' && <span className="text-sm text-muted-foreground">تومان</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{plan.period}</p>
            </div>

            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
              {plan.notIncluded.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="w-4 h-4 flex items-center justify-center text-muted-foreground flex-shrink-0">—</span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                plan.current
                  ? 'bg-secondary text-muted-foreground cursor-default'
                  : plan.recommended
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
              disabled={plan.current}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison note */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">چرا پلن ویژه؟</p>
            <p className="text-sm text-muted-foreground leading-6">
              کسب‌وکارهای با پلن ویژه به طور میانگین ۱۰ برابر بیشتر دیده می‌شوند. با قرارگرفتن در صفحه اول نتایج جستجو، تماس‌های بیشتری دریافت می‌کنید.
            </p>
          </div>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
        <h2 className="font-bold text-foreground mb-4">تاریخچه پرداخت‌ها</h2>
        <div className="text-center py-8 text-muted-foreground">
          <BarChart2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">هنوز پرداختی ثبت نشده است</p>
        </div>
      </div>
    </div>
  );
}
