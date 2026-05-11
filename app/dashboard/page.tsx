import { Eye, Phone, Star, TrendingUp, MessageSquare, Crown, ArrowUpRight, Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'بازدید این ماه', value: '۱,۲۴۰', change: '+۱۸٪', icon: Eye, color: 'blue' },
  { label: 'تماس‌های دریافتی', value: '۸۴', change: '+۱۲٪', icon: Phone, color: 'green' },
  { label: 'میانگین امتیاز', value: '۴.۸', change: '+۰.۲', icon: Star, color: 'amber' },
  { label: 'نظرات جدید', value: '۱۲', change: '+۵', icon: MessageSquare, color: 'purple' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  green: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
};

const recentReviews = [
  { user: 'محمد احمدی', rating: 5, text: 'خدمات فوق‌العاده بود. کاملاً راضی هستم.', date: 'دیروز', read: false },
  { user: 'سارا کریمی', rating: 4, text: 'خوب بود ولی قیمت کمی بالا.', date: '۲ روز پیش', read: false },
  { user: 'علی رضایی', rating: 5, text: 'پیشنهاد می‌کنم. حرفه‌ای و متخصص.', date: '۱ هفته پیش', read: true },
];

const quickActions = [
  { label: 'ویرایش پروفایل', href: '/dashboard/business', icon: '✏️' },
  { label: 'افزودن خدمت', href: '/dashboard/business#services', icon: '➕' },
  { label: 'آپلود تصویر', href: '/dashboard/gallery', icon: '📷' },
  { label: 'ارتقاء پلن', href: '/dashboard/billing', icon: '⚡' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">داشبورد</h1>
          <p className="text-muted-foreground text-sm mt-1">خوش آمدید! اینجا خلاصه عملکرد کسب‌وکارتان را ببینید.</p>
        </div>
        <Link href="/dashboard/billing" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 text-sm font-semibold rounded-xl hover:bg-amber-100 transition-colors border border-amber-200">
          <Crown className="w-4 h-4" /> ارتقاء به ویژه
        </Link>
      </div>

      {/* Plan banner */}
      <div className="bg-gradient-to-l from-blue-700 to-blue-900 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-blue-200 text-sm mb-1">پلن فعلی شما</p>
            <p className="text-xl font-black">پلن رایگان</p>
            <p className="text-blue-200 text-sm mt-1">با ارتقاء به ویژه، دیده‌شدن خود را ۱۰ برابر کنید</p>
          </div>
          <Link href="/dashboard/billing" className="px-5 py-2.5 bg-white text-blue-800 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            ارتقاء اکنون
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
        <h2 className="font-bold text-foreground mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 transition-colors group"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-center text-foreground group-hover:text-blue-700 transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent reviews */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">آخرین نظرات</h2>
          <Link href="/dashboard/reviews" className="text-sm text-blue-700 hover:underline flex items-center gap-1">
            همه نظرات <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentReviews.map((review, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!review.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-semibold text-blue-700 flex-shrink-0">
                {review.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{review.user}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{review.date}</span>
                </div>
                <div className="flex gap-0.5 my-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={`text-xs ${j < review.rating ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{review.text}</p>
              </div>
              {!review.read && <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Performance chart placeholder */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">آمار ۳۰ روز اخیر</h2>
          <div className="flex gap-2">
            {['بازدید', 'تماس', 'پیام'].map((t) => (
              <button key={t} className="text-xs px-3 py-1 rounded-lg bg-secondary text-muted-foreground hover:bg-accent transition-colors first:bg-blue-700 first:text-white">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-40 flex items-end justify-between gap-1.5 px-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = Math.floor(Math.random() * 70) + 20;
            return (
              <div
                key={i}
                className="flex-1 bg-blue-100 dark:bg-blue-950 hover:bg-blue-500 transition-colors rounded-t cursor-pointer relative group"
                style={{ height: `${height}%` }}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-foreground bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                  {Math.floor(height / 5)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
          <span>۳۰ روز پیش</span>
          <span>امروز</span>
        </div>
      </div>
    </div>
  );
}
