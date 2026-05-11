import {
  Building2, Users, Star, CreditCard, TrendingUp, ArrowUpRight,
  AlertTriangle, CheckCircle2, Clock, Zap, Eye, Globe
} from 'lucide-react';
import Link from 'next/link';

const overviewStats = [
  { label: 'کل کسب‌وکارها', value: '۵۲,۴۸۱', change: '+۱۲۴ امروز', icon: Building2, color: 'blue', href: '/admin/businesses' },
  { label: 'کاربران ثبت‌نام‌کرده', value: '۱,۲۴۱,۸۷۰', change: '+۸۹۰ هفته', icon: Users, color: 'green', href: '/admin/users' },
  { label: 'درآمد این ماه', value: '۲۴۸,۹۰۰,۰۰۰', change: '+۱۸٪ ماه قبل', icon: CreditCard, color: 'amber', href: '/admin/payments' },
  { label: 'بازدید امروز', value: '۱۸,۴۲۰', change: '+۲,۳۴۱ دیروز', icon: Eye, color: 'purple', href: '/admin/analytics' },
];

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50',
  green: 'bg-green-50 text-green-700 dark:bg-green-950/50',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50',
};

const pendingItems = [
  { type: 'business', label: 'موسسه حقوقی آرمان', subtext: 'در انتظار تأیید · ۲ ساعت پیش', status: 'pending', href: '/admin/businesses/1' },
  { type: 'review', label: 'نظر گزارش‌شده', subtext: 'پزشک رضایی · ۳ ساعت پیش', status: 'report', href: '/admin/reviews/1' },
  { type: 'business', label: 'رستوران پارسه', subtext: 'در انتظار تأیید · ۵ ساعت پیش', status: 'pending', href: '/admin/businesses/2' },
  { type: 'payment', label: 'پرداخت معلق', subtext: 'پلن ویژه · ۲,۹۹۸,۰۰۰ تومان', status: 'pending', href: '/admin/payments/1' },
  { type: 'business', label: 'کلینیک دندانپزشکی نور', subtext: 'در انتظار تأیید · ۱ روز پیش', status: 'pending', href: '/admin/businesses/3' },
];

const recentActivity = [
  { label: 'کسب‌وکار جدید تأیید شد', subtext: 'وکیل دادگستر احمدی', time: '۵ دقیقه پیش', icon: CheckCircle2, color: 'text-green-600' },
  { label: 'پلن ویژه فعال شد', subtext: 'رستوران شهرزاد', time: '۱۲ دقیقه پیش', icon: Zap, color: 'text-amber-500' },
  { label: 'نظر غیرمجاز شناسایی شد', subtext: 'هتل پارسیان', time: '۴۵ دقیقه پیش', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'صفحه SEO جدید ایجاد شد', subtext: 'وکیل-ملکی-تبریز', time: '۱ ساعت پیش', icon: Globe, color: 'text-blue-500' },
  { label: 'پرداخت موفق', subtext: 'کلینیک زیبایی آرمان', time: '۲ ساعت پیش', icon: CreditCard, color: 'text-green-600' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">داشبورد مدیریت</h1>
          <p className="text-muted-foreground text-sm mt-1">یکشنبه، ۱۹ آبان ۱۴۰۳</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/seo-pages/new" className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors">
            + صفحه SEO جدید
          </Link>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-700 transition-colors" />
            </div>
            <p className="text-xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            <p className="text-xs text-green-600 mt-1">{stat.change}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending items */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> نیاز به بررسی
            </h2>
            <span className="text-xs bg-red-100 dark:bg-red-950/30 text-red-600 px-2 py-0.5 rounded-full font-semibold">
              {pendingItems.length} مورد
            </span>
          </div>
          <div className="space-y-3">
            {pendingItems.map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.status === 'report' ? 'bg-red-100 dark:bg-red-950/30' : 'bg-amber-100 dark:bg-amber-950/30'
                  }`}>
                    {item.type === 'business' && <Building2 className="w-4 h-4 text-amber-600" />}
                    {item.type === 'review' && <Star className="w-4 h-4 text-red-600" />}
                    {item.type === 'payment' && <CreditCard className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-blue-700 transition-colors">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.subtext}</p>
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.status === 'report' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {item.status === 'report' ? 'گزارش' : 'در انتظار'}
                </div>
              </Link>
            ))}
          </div>
          <Link href="/admin/businesses?status=pending" className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-border text-sm text-blue-700 hover:underline">
            مشاهده همه <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" /> فعالیت اخیر
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900 flex-shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.subtext}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick admin stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'صفحات SEO', value: '۲,۴۸۱', icon: Globe, href: '/admin/seo-pages' },
          { label: 'پلن ویژه', value: '۳,۲۴۰', icon: Zap, href: '/admin/businesses?plan=premium' },
          { label: 'نظرات امروز', value: '۸۹', icon: Star, href: '/admin/reviews' },
          { label: 'شهرها', value: '۲۳۴', icon: Building2, href: '/admin/cities' },
          { label: 'دسته‌بندی', value: '۱۲۸', icon: AlertTriangle, href: '/admin/categories' },
          { label: 'پرداخت امروز', value: '۱۴', icon: CreditCard, href: '/admin/payments' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="bg-white dark:bg-gray-950 rounded-xl border border-border p-4 text-center hover:shadow-sm transition-shadow group">
            <item.icon className="w-5 h-5 text-muted-foreground mx-auto mb-2 group-hover:text-blue-600 transition-colors" />
            <p className="text-xl font-black text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
