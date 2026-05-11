import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

const footerCategories = [
  { label: 'وکیل', href: '/vakil' },
  { label: 'پزشک', href: '/pezeshk' },
  { label: 'دندانپزشک', href: '/dandanpezeshk' },
  { label: 'رستوران', href: '/restaurant' },
  { label: 'کلینیک زیبایی', href: '/klinik-zibai' },
  { label: 'کاشت مو', href: '/kasht-mu' },
  { label: 'هتل', href: '/hotel' },
  { label: 'آموزشگاه', href: '/amuzeshgah' },
];

const footerCities = [
  { label: 'تهران', href: '/tehran' },
  { label: 'مشهد', href: '/mashhad' },
  { label: 'اصفهان', href: '/isfahan' },
  { label: 'شیراز', href: '/shiraz' },
  { label: 'تبریز', href: '/tabriz' },
  { label: 'کرج', href: '/karaj' },
  { label: 'اهواز', href: '/ahvaz' },
  { label: 'رشت', href: '/rasht' },
];

const popularPages = [
  { label: 'بهترین وکیل تهران', href: '/vakil-tehran' },
  { label: 'بهترین پزشک مشهد', href: '/pezeshk-mashhad' },
  { label: 'کلینیک زیبایی اصفهان', href: '/klinik-zibai-isfahan' },
  { label: 'کاشت مو تهران', href: '/kasht-mu-tehran' },
  { label: 'رستوران شیراز', href: '/restaurant-shiraz' },
  { label: 'دندانپزشک تبریز', href: '/dandanpezeshk-tabriz' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" dir="rtl">
      {/* Main footer */}
      <div className="container-wiki py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm">
                و
              </div>
              <span className="text-xl font-black text-white">
                ویکی<span className="text-blue-400">بهترین</span>
              </span>
            </div>
            <p className="text-sm leading-7 text-gray-400 mb-5">
              بزرگترین دایرکتوری کسب‌وکارهای ایران. بیش از ۵۰،۰۰۰ کسب‌وکار در سراسر کشور.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="اینستاگرام" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="تلگرام" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">دسته‌بندی‌های محبوب</h3>
            <ul className="space-y-2.5">
              {footerCategories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">شهرهای برتر</h3>
            <ul className="space-y-2.5">
              {footerCities.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular pages */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">صفحات پربازدید</h3>
            <ul className="space-y-2.5">
              {popularPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">نماد اعتماد الکترونیکی</p>
                  <p className="text-gray-500 text-xs">وزارت صنعت، معدن و تجارت</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🔒</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">اتحادیه کسب‌وکارهای مجازی</p>
                  <p className="text-gray-500 text-xs">عضو رسمی</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>+۵۰,۰۰۰ کسب‌وکار</span>
              <span>·</span>
              <span>+۲۰۰ شهر</span>
              <span>·</span>
              <span>+۵۰۰,۰۰۰ کاربر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-wiki py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © ۱۴۰۳ ویکی بهترین. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300">حریم خصوصی</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300">شرایط استفاده</Link>
            <Link href="/sitemap.xml" className="text-xs text-gray-500 hover:text-gray-300">نقشه سایت</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
