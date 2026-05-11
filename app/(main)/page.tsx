import Link from 'next/link';
import { Search, BadgeCheck, TrendingUp, Shield, Star, ChevronLeft } from 'lucide-react';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { BusinessCard } from '@/components/shared/BusinessCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ویکی بهترین | دایرکتوری کسب‌وکارهای ایران',
  description: 'بهترین کسب‌وکارها، متخصصان و خدمات ایران را پیدا کنید. وکیل، پزشک، رستوران، کلینیک زیبایی و هزاران کسب‌وکار دیگر.',
};

const featuredBusinesses = [
  {
    id: '1', name: 'کلینیک حقوقی دادگستر', slug: 'clinic-dadgostar',
    short_description: 'بیش از ۱۵ سال تجربه در دعاوی ملکی، خانوادگی و کیفری.',
    avg_rating: 4.8, review_count: 124, is_verified: true, subscription_plan: 'premium' as const,
    city_name: 'تهران', category_name: 'وکیل', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?w=600',
  },
  {
    id: '2', name: 'رستوران سنتی کوثر', slug: 'restaurant-kosar',
    short_description: 'معروفترین رستوران سنتی تهران با ۲۰ سال سابقه. غذاهای اصیل ایرانی.',
    avg_rating: 4.6, review_count: 312, is_verified: true, subscription_plan: 'premium' as const,
    city_name: 'تهران', category_name: 'رستوران', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600',
  },
  {
    id: '3', name: 'کلینیک زیبایی آرمان', slug: 'clinic-arman',
    short_description: 'مجهزترین کلینیک زیبایی تهران. کاشت مو، لیزر، جوانسازی پوست.',
    avg_rating: 4.9, review_count: 89, is_verified: true, subscription_plan: 'enterprise' as const,
    city_name: 'تهران', category_name: 'کلینیک زیبایی', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?w=600',
  },
  {
    id: '4', name: 'دکتر محمدی متخصص قلب', slug: 'dr-mohammadi',
    short_description: 'متخصص قلب و عروق با ۲۰ سال تجربه. نوبت‌دهی آنلاین.',
    avg_rating: 4.7, review_count: 201, is_verified: true, subscription_plan: 'premium' as const,
    city_name: 'مشهد', category_name: 'پزشک', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=600',
  },
  {
    id: '5', name: 'آموزشگاه زبان پارسه', slug: 'parshe-language',
    short_description: 'آموزش زبان‌های انگلیسی، آلمانی و فرانسوی.',
    avg_rating: 4.5, review_count: 67, is_verified: false, subscription_plan: 'basic' as const,
    city_name: 'اصفهان', category_name: 'آموزشگاه', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=600',
  },
  {
    id: '6', name: 'هتل پنج ستاره پرشین', slug: 'hotel-persian',
    short_description: 'لوکس‌ترین هتل مشهد با استخر، سونا و رستوران‌های متنوع.',
    avg_rating: 4.3, review_count: 445, is_verified: true, subscription_plan: 'enterprise' as const,
    city_name: 'مشهد', category_name: 'هتل', status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=600',
  },
];

const categories = [
  { name: 'وکیل', slug: 'vakil', icon: 'scale', color: '#1a4a8a', count: 3420 },
  { name: 'پزشک', slug: 'pezeshk', icon: 'stethoscope', color: '#16a34a', count: 8910 },
  { name: 'رستوران', slug: 'restaurant', icon: 'utensils', color: '#dc2626', count: 12340 },
  { name: 'کلینیک زیبایی', slug: 'klinik-zibai', icon: 'sparkles', color: '#db2777', count: 4560 },
  { name: 'دندانپزشک', slug: 'dandanpezeshk', icon: 'smile', color: '#0369a1', count: 6780 },
  { name: 'کاشت مو', slug: 'kasht-mu', icon: 'scissors', color: '#7c3aed', count: 890 },
  { name: 'آموزشگاه', slug: 'amuzeshgah', icon: 'book', color: '#7c3aed', count: 5230 },
  { name: 'هتل', slug: 'hotel', icon: 'hotel', color: '#1e40af', count: 2100 },
  { name: 'خودرو', slug: 'khodro', icon: 'car', color: '#374151', count: 9870 },
  { name: 'داروخانه', slug: 'darukhaneh', icon: 'pill', color: '#047857', count: 3450 },
];

const popularCities = [
  { name: 'تهران', slug: 'tehran', image: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?w=400', count: 24000 },
  { name: 'مشهد', slug: 'mashhad', image: 'https://images.pexels.com/photos/5442010/pexels-photo-5442010.jpeg?w=400', count: 8900 },
  { name: 'اصفهان', slug: 'isfahan', image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=400', count: 6700 },
  { name: 'شیراز', slug: 'shiraz', image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?w=400', count: 5200 },
];

const stats = [
  { value: '+۵۰,۰۰۰', label: 'کسب‌وکار ثبت‌شده', icon: <BadgeCheck className="w-6 h-6" /> },
  { value: '+۵۰۰,۰۰۰', label: 'نظر و امتیاز', icon: <Star className="w-6 h-6" /> },
  { value: '+۲۰۰', label: 'شهر پوشش‌داده‌شده', icon: <TrendingUp className="w-6 h-6" /> },
  { value: '+۱,۰۰۰,۰۰۰', label: 'کاربر فعال', icon: <Shield className="w-6 h-6" /> },
];

const popularSearches = [
  'بهترین وکیل تهران', 'کلینیک کاشت مو مشهد', 'رستوران ایرانی اصفهان',
  'دندانپزشک شیراز', 'کلینیک زیبایی تهران', 'متخصص قلب تبریز',
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
        </div>
        <div className="container-wiki relative pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            بزرگترین دایرکتوری کسب‌وکارهای ایران
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            بهترین کسب‌وکارها را
            <br />
            <span className="text-blue-200">سریع‌تر پیدا کنید</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            از وکیل و پزشک تا رستوران و کلینیک زیبایی — هر چیزی که نیاز دارید
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="جستجو در وکیل، پزشک، رستوران..."
                  className="w-full h-12 bg-transparent border-0 outline-none pr-12 pl-4 text-gray-800 placeholder:text-gray-400 text-base"
                  style={{ fontFamily: "'Vazirmatn', Tahoma, sans-serif" }}
                />
              </div>
              <button className="h-12 px-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap">
                جستجو
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-blue-200 text-sm">جستجوهای محبوب:</span>
            {popularSearches.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full border border-white/20 transition-colors">
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="white" className="dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-950 py-12">
        <div className="container-wiki">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-wiki">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">دسته‌بندی‌ها</h2>
              <p className="text-muted-foreground mt-1">بیش از ۵۰۰ دسته خدمات و کسب‌وکار</p>
            </div>
            <Link href="/categories" className="flex items-center gap-1 text-blue-700 text-sm font-semibold hover:gap-2 transition-all">
              همه دسته‌ها <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured businesses */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-wiki">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">کسب‌وکارهای برتر</h2>
              <p className="text-muted-foreground mt-1">بهترین‌ها بر اساس امتیاز و رضایت کاربران</p>
            </div>
            <Link href="/search" className="flex items-center gap-1 text-blue-700 text-sm font-semibold hover:gap-2 transition-all">
              همه کسب‌وکارها <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((biz, i) => (
              <BusinessCard key={biz.id} business={biz} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-wiki">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">شهرهای برتر</h2>
              <p className="text-muted-foreground mt-1">کسب‌وکارها در سراسر ایران</p>
            </div>
            <Link href="/cities" className="flex items-center gap-1 text-blue-700 text-sm font-semibold hover:gap-2 transition-all">
              همه شهرها <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <Link key={city.slug} href={`/${city.slug}`} className="relative overflow-hidden rounded-2xl aspect-video group">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 p-4">
                  <p className="text-white font-bold text-lg">{city.name}</p>
                  <p className="text-white/80 text-sm">{city.count.toLocaleString('fa-IR')} کسب‌وکار</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-wiki">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">چطور کار می‌کند؟</h2>
            <p className="text-muted-foreground">در چند مرحله ساده کسب‌وکار مورد نظرتان را پیدا کنید</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '۱', title: 'جستجو کنید', desc: 'نام یا دسته‌بندی مورد نظر را جستجو کنید', icon: '🔍' },
              { step: '۲', title: 'مقایسه کنید', desc: 'امتیازها، نظرات و خدمات را مقایسه کنید', icon: '⚖️' },
              { step: '۳', title: 'تماس بگیرید', desc: 'مستقیم با کسب‌وکار مورد نظر ارتباط برقرار کنید', icon: '📞' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-3xl mx-auto mb-4">{s.icon}</div>
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-sm font-black flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-6">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient text-white">
        <div className="container-wiki text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">کسب‌وکار خود را ثبت کنید</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            به بیش از ۵۰۰،۰۰۰ مشتری بالقوه دسترسی پیدا کنید. ثبت رایگان.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register-business" className="px-8 py-4 bg-white text-blue-800 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg text-base">
              ثبت رایگان کسب‌وکار
            </Link>
            <Link href="/pricing" className="px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-2xl hover:border-white transition-colors text-base">
              مشاهده پلن‌ها
            </Link>
          </div>
        </div>
      </section>

      {/* Popular SEO links */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-wiki">
          <h2 className="text-lg font-bold text-foreground mb-6">جستجوهای محبوب</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'وکیل ملکی تهران', 'بهترین وکیل تهران', 'کلینیک کاشت مو مشهد',
              'رستوران سنتی اصفهان', 'متخصص زیبایی شیراز', 'دکتر متخصص کرج',
              'آموزشگاه زبان تهران', 'هتل مشهد', 'دندانپزشک اطفال تهران',
            ].map((link) => (
              <Link key={link} href={`/search?q=${encodeURIComponent(link)}`} className="text-sm bg-white dark:bg-gray-800 border border-border text-muted-foreground hover:text-blue-700 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
