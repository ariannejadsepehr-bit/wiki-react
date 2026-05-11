import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Filter, SortAsc, Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { BusinessCard } from '@/components/shared/BusinessCard';
import { StarRating } from '@/components/shared/StarRating';

interface PageProps {
  params: { categorySlug: string };
  searchParams: { city?: string; page?: string; sort?: string };
}

const categoryMeta: Record<string, { name: string; description: string; cityVariant?: string }> = {
  'vakil': { name: 'وکیل', description: 'بهترین وکلای متخصص' },
  'vakil-tehran': { name: 'وکیل', description: 'بهترین وکلای تهران', cityVariant: 'تهران' },
  'pezeshk': { name: 'پزشک', description: 'بهترین پزشکان متخصص' },
  'restaurant': { name: 'رستوران', description: 'بهترین رستوران‌ها' },
  'klinik-zibai': { name: 'کلینیک زیبایی', description: 'بهترین کلینیک‌های زیبایی' },
  'kasht-mu': { name: 'کاشت مو', description: 'بهترین کلینیک‌های کاشت مو' },
  'dandanpezeshk': { name: 'دندانپزشک', description: 'بهترین دندانپزشکان' },
};

function getPageInfo(slug: string) {
  if (categoryMeta[slug]) return categoryMeta[slug];

  // Parse dynamic slugs like "vakil-tehran", "restaurant-mashhad"
  const parts = slug.split('-');
  const cityMap: Record<string, string> = {
    tehran: 'تهران', mashhad: 'مشهد', isfahan: 'اصفهان',
    shiraz: 'شیراز', tabriz: 'تبریز', karaj: 'کرج', ahvaz: 'اهواز',
  };

  const lastPart = parts[parts.length - 1];
  const city = cityMap[lastPart];
  const categorySlug = parts.slice(0, -1).join('-');
  const catInfo = categoryMeta[categorySlug];

  if (city && catInfo) {
    return { name: catInfo.name, description: catInfo.description, cityVariant: city };
  }

  return { name: slug, description: '' };
}

const mockBusinesses = [
  {
    id: '1', name: 'موسسه حقوقی عدالت', slug: 'moasese-edalat',
    short_description: 'تخصص در دعاوی ملکی، کیفری و خانوادگی با ۱۸ سال سابقه.',
    avg_rating: 4.9, review_count: 234, is_verified: true,
    subscription_plan: 'enterprise' as const, city_name: 'تهران', category_name: 'وکیل',
    status: 'active' as const, phone: '02112345678',
    cover_url: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?w=600',
  },
  {
    id: '2', name: 'وکیل دادگستر رحیمی', slug: 'vakil-rahimi',
    short_description: 'وکیل پایه یک دادگستری. مشاوره تلفنی رایگان.',
    avg_rating: 4.7, review_count: 156, is_verified: true,
    subscription_plan: 'premium' as const, city_name: 'تهران', category_name: 'وکیل',
    status: 'active' as const, phone: '02112345679',
    cover_url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?w=600',
  },
  {
    id: '3', name: 'دفتر حقوقی پارسه', slug: 'daftar-parshe',
    short_description: 'تیم متخصص وکلا. پرونده‌های بین‌المللی و داخلی.',
    avg_rating: 4.5, review_count: 89, is_verified: true,
    subscription_plan: 'premium' as const, city_name: 'تهران', category_name: 'وکیل',
    status: 'active' as const,
    cover_url: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?w=600',
  },
];

const faqItems = [
  { q: 'بهترین وکیل تهران را چطور پیدا کنم؟', a: 'با استفاده از ویکی بهترین می‌توانید وکلا را بر اساس تخصص، محل، امتیاز و نظرات کاربران فیلتر و مقایسه کنید.' },
  { q: 'آیا مشاوره اولیه رایگان است؟', a: 'بسیاری از وکلای ثبت‌شده در ویکی بهترین مشاوره اولیه رایگان ارائه می‌دهند. این اطلاعات در پروفایل هر وکیل موجود است.' },
  { q: 'چطور مطمئن شوم وکیل انتخابی معتبر است؟', a: 'وکلای دارای نشان "تأییدشده" در ویکی بهترین توسط تیم ما تأیید هویت و مدارک شده‌اند.' },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const info = getPageInfo(params.categorySlug);
  const title = info.cityVariant
    ? `بهترین ${info.name} ${info.cityVariant} | ویکی بهترین`
    : `بهترین ${info.name} ایران | ویکی بهترین`;
  const description = info.cityVariant
    ? `لیست بهترین ${info.name}های ${info.cityVariant} با امتیاز، نظرات و اطلاعات تماس. همین حالا پیدا کنید.`
    : `لیست بهترین ${info.name}های ایران با امتیاز، نظرات و اطلاعات تماس.`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: { canonical: `https://wikibehtarin.com/${params.categorySlug}` },
  };
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  const info = getPageInfo(params.categorySlug);
  const city = info.cityVariant;
  const pageTitle = city ? `بهترین ${info.name} ${city}` : `بهترین ${info.name} ایران`;
  const currentPage = parseInt(searchParams.page || '1');
  const totalPages = 8;

  const breadcrumbs = [
    { label: 'خانه', href: '/' },
    ...(city ? [{ label: city, href: `/${params.categorySlug.split('-').pop()}` }] : []),
    { label: info.name, href: `/${params.categorySlug}` },
  ];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: `لیست بهترین ${info.name}های ${city || 'ایران'}`,
    url: `https://wikibehtarin.com/${params.categorySlug}`,
    itemListElement: mockBusinesses.map((biz, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
        name: biz.name,
        url: `https://wikibehtarin.com/business/${biz.slug}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: biz.avg_rating,
          reviewCount: biz.review_count,
        },
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        {/* Hero */}
        <section className="bg-white dark:bg-gray-950 border-b border-border">
          <div className="container-wiki py-10">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronLeft className="w-3.5 h-3.5" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-blue-700 transition-colors">{crumb.label}</Link>
                  )}
                </span>
              ))}
            </nav>

            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">{pageTitle}</h1>
            <p className="text-muted-foreground text-base leading-7 max-w-2xl">
              با ویکی بهترین، بهترین {info.name}های {city || 'ایران'} را بر اساس امتیاز واقعی کاربران، تعداد نظرات و سابقه فعالیت پیدا کنید.
            </p>

            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-xl">
                <SortAsc className="w-4 h-4" /> بهترین امتیاز
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-sm font-medium rounded-xl hover:bg-accent transition-colors">
                <MapPin className="w-4 h-4" /> انتخاب شهر
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-sm font-medium rounded-xl hover:bg-accent transition-colors">
                <Filter className="w-4 h-4" /> فیلتر بیشتر
              </button>
              <div className="mr-auto text-sm text-muted-foreground">
                {(48).toLocaleString('fa-IR')} نتیجه یافت شد
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container-wiki py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5 sticky top-24">
                <h3 className="font-bold text-sm text-foreground mb-4">فیلتر نتایج</h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">شهر</p>
                    {['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز'].map((c) => (
                      <label key={c} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-foreground group-hover:text-blue-700">{c}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">حداقل امتیاز</p>
                    {[4.5, 4, 3.5, 3].map((r) => (
                      <label key={r} className="flex items-center gap-2 py-1.5 cursor-pointer">
                        <input type="radio" name="rating" />
                        <StarRating rating={r} size="sm" />
                        <span className="text-sm text-muted-foreground">و بیشتر</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">ویژگی‌ها</p>
                    {['تأییدشده', 'پلن ویژه', 'مشاوره رایگان', 'پاسخ سریع'].map((f) => (
                      <label key={f} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-foreground group-hover:text-blue-700">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main results */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {mockBusinesses.map((biz, i) => (
                  <BusinessCard key={biz.id} business={biz} rank={i + 1} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-10">
                <button disabled={currentPage === 1} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center disabled:opacity-40 hover:bg-accent transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
                {[1, 2, 3, '...', 8].map((p, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${p === currentPage ? 'bg-blue-700 text-white' : 'border border-border hover:bg-accent'}`}
                  >
                    {typeof p === 'number' ? p.toLocaleString('fa-IR') : p}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center disabled:opacity-40 hover:bg-accent transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 bg-white dark:bg-gray-950 rounded-2xl border border-border p-6 lg:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              راهنمای انتخاب {info.name} {city && `در ${city}`}
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-7 space-y-3">
              <p>
                یافتن یک {info.name} مطمئن و متخصص یکی از مهم‌ترین تصمیماتی است که می‌توانید بگیرید. ویکی بهترین با جمع‌آوری اطلاعات کامل، نظرات واقعی کاربران و امتیازدهی شفاف، این فرآیند را برای شما آسان‌تر کرده است.
              </p>
              <p>
                در هنگام انتخاب {info.name}، به سابقه کاری، تخصص، نظرات مشتریان قبلی و امتیاز کلی توجه کنید. نشان تأییدشده در ویکی بهترین نشان‌دهنده اعتبار و صحت اطلاعات است.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-6 bg-white dark:bg-gray-950 rounded-2xl border border-border p-6 lg:p-8">
            <h2 className="text-xl font-bold text-foreground mb-5">سوالات متداول</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm leading-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-6 bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">صفحات مرتبط</h3>
            <div className="flex flex-wrap gap-2">
              {['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'کرج', 'اهواز', 'رشت'].map((c) => (
                <Link
                  key={c}
                  href={`/${params.categorySlug.replace(/-[a-z]+$/, '')}-${c === 'تهران' ? 'tehran' : c === 'مشهد' ? 'mashhad' : 'isfahan'}`}
                  className="text-sm border border-border rounded-lg px-3 py-1.5 text-muted-foreground hover:text-blue-700 hover:border-blue-300 transition-colors"
                >
                  {info.name} {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
