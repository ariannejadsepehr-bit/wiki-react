import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Phone, Globe, Mail, BadgeCheck, Star, Clock, ChevronLeft,
  Instagram, Send, Crown, ThumbsUp, Flag, Share2, MessageSquare, ExternalLink
} from 'lucide-react';
import { StarRating } from '@/components/shared/StarRating';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock data - in production this comes from Supabase
const mockBusiness = {
  id: '1',
  name: 'موسسه حقوقی عدالت',
  slug: 'moasese-edalat',
  description: 'موسسه حقوقی عدالت با بیش از ۱۸ سال تجربه در زمینه دعاوی ملکی، کیفری، خانوادگی و تجاری فعالیت می‌کند. تیم متخصص ما متشکل از وکلای پایه یک دادگستری با تخصص‌های مختلف آماده ارائه بهترین خدمات حقوقی به شما است.',
  short_description: 'تخصص در دعاوی ملکی، کیفری و خانوادگی با ۱۸ سال سابقه.',
  avg_rating: 4.9,
  review_count: 234,
  is_verified: true,
  is_featured: true,
  subscription_plan: 'enterprise' as const,
  city_name: 'تهران',
  category_name: 'وکیل',
  address: 'خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۰',
  phone: '02122345678',
  phone2: '09121234567',
  whatsapp: '09121234567',
  email: 'info@edalat-legal.ir',
  website: 'https://edalat-legal.ir',
  instagram: '@edalat.legal',
  telegram: '@edalatLegal',
  founded_year: 1385,
  working_hours: [
    { day: 'شنبه', open: '۸:۰۰', close: '۱۷:۰۰', closed: false },
    { day: 'یکشنبه', open: '۸:۰۰', close: '۱۷:۰۰', closed: false },
    { day: 'دوشنبه', open: '۸:۰۰', close: '۱۷:۰۰', closed: false },
    { day: 'سه‌شنبه', open: '۸:۰۰', close: '۱۷:۰۰', closed: false },
    { day: 'چهارشنبه', open: '۸:۰۰', close: '۱۷:۰۰', closed: false },
    { day: 'پنجشنبه', open: '۹:۰۰', close: '۱۳:۰۰', closed: false },
    { day: 'جمعه', open: '', close: '', closed: true },
  ],
  services: [
    { name: 'دعاوی ملکی', price: 'توافقی', description: 'خرید، فروش، اجاره و مشکلات ملکی' },
    { name: 'دعاوی کیفری', price: 'توافقی', description: 'دفاع و شکایت در پرونده‌های کیفری' },
    { name: 'حقوق خانواده', price: 'از ۵ میلیون', description: 'طلاق، حضانت، مهریه' },
    { name: 'مشاوره حقوقی', price: '۵۰۰ هزار تومان', description: 'مشاوره یک ساعته حضوری یا تلفنی' },
  ],
  gallery: [
    'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?w=600',
    'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?w=600',
    'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?w=600',
  ],
  faqs: [
    { q: 'آیا مشاوره اولیه رایگان است؟', a: 'بله، اولین جلسه مشاوره به مدت ۳۰ دقیقه کاملاً رایگان است.' },
    { q: 'چه مدارکی برای اولین جلسه لازم است؟', a: 'کارت ملی و هر سند مرتبط با پرونده‌تان را همراه بیاورید.' },
    { q: 'آیا امکان مشاوره آنلاین وجود دارد؟', a: 'بله، مشاوره از طریق تلفن و ویدئوکال نیز ارائه می‌شود.' },
  ],
  reviews: [
    { id: '1', user: 'علی رضایی', rating: 5, date: '۱۴۰۳/۰۸/۱۲', text: 'کاملاً حرفه‌ای و دلسوز. پرونده ملکی‌ام را با موفقیت حل کردند. توصیه می‌کنم.', helpful: 12 },
    { id: '2', user: 'مریم احمدی', rating: 5, date: '۱۴۰۳/۰۷/۰۵', text: 'خدمات بسیار عالی. وقت‌شناس، متخصص و کاملاً در دسترس. پیگیری پرونده تا آخر.', helpful: 8 },
    { id: '3', user: 'حسین موسوی', rating: 4, date: '۱۴۰۳/۰۶/۲۰', text: 'خوب بود، قیمت‌ها کمی بالا ولی کیفیت کار مناسب است.', helpful: 3 },
  ],
  cover_url: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?w=1200',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${mockBusiness.name} | وکیل تهران`,
    description: mockBusiness.short_description,
    openGraph: {
      title: mockBusiness.name,
      description: mockBusiness.short_description,
      images: [mockBusiness.cover_url],
      type: 'website',
    },
    alternates: { canonical: `https://wikibehtarin.com/business/${slug}` },
  };
}

export default async function BusinessProfilePage({ params }: PageProps) {
  await params;
  const biz = mockBusiness;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: biz.name,
    description: biz.description,
    address: { '@type': 'PostalAddress', streetAddress: biz.address, addressLocality: biz.city_name, addressCountry: 'IR' },
    telephone: biz.phone,
    url: `https://wikibehtarin.com/business/${biz.slug}`,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: biz.avg_rating, reviewCount: biz.review_count },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        {/* Cover */}
        <div className="relative h-56 sm:h-72 lg:h-80 bg-gray-200 overflow-hidden">
          <Image src={biz.cover_url} alt={biz.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container-wiki">
          {/* Header card */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border shadow-sm -mt-16 relative z-10 p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-md bg-blue-50 flex items-center justify-center text-3xl font-black text-blue-700 flex-shrink-0">
                {biz.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-2xl font-black text-foreground">{biz.name}</h1>
                      {biz.is_verified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                      {biz.subscription_plan === 'enterprise' && (
                        <span className="badge-premium"><Crown className="w-3 h-3" /> ویژه</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-blue-600 font-medium">{biz.category_name}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{biz.city_name}</span>
                      {biz.founded_year && <span>تأسیس {biz.founded_year}</span>}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <StarRating rating={biz.avg_rating} showCount count={biz.review_count} />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-2 min-w-fit">
                    <a href={`tel:${biz.phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-sm">
                      <Phone className="w-4 h-4" /> تماس
                    </a>
                    {biz.whatsapp && (
                      <a href={`https://wa.me/98${biz.whatsapp.replace('0', '')}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm">
                        واتساپ
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-700 transition-colors">
                <Share2 className="w-4 h-4" /> اشتراک‌گذاری
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-600 transition-colors">
                <Flag className="w-4 h-4" /> گزارش
              </button>
              {biz.website && (
                <a href={biz.website} target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-700 transition-colors mr-auto">
                  <ExternalLink className="w-4 h-4" /> وبسایت
                </a>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <section className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-3">درباره ما</h2>
                <p className="text-muted-foreground leading-7">{biz.description}</p>
              </section>

              {/* Services */}
              <section className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">خدمات</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {biz.services.map((s) => (
                    <div key={s.name} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                        <p className="text-xs text-blue-600 font-medium mt-1">{s.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">تصاویر</h2>
                <div className="grid grid-cols-3 gap-2">
                  {biz.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image src={img} alt={`تصویر ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-foreground">نظرات کاربران ({biz.review_count.toLocaleString('fa-IR')})</h2>
                  <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">ثبت نظر</button>
                </div>

                {/* Rating summary */}
                <div className="flex items-center gap-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl mb-5">
                  <div className="text-center">
                    <p className="text-5xl font-black text-foreground">{biz.avg_rating}</p>
                    <StarRating rating={biz.avg_rating} size="sm" className="justify-center mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{biz.review_count} نظر</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <div key={r} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-2">{r}</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : 2}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-4">
                  {biz.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-semibold text-blue-700">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{review.user}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-6">{review.text}</p>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-700 mt-2 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> مفید بود ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">سوالات متداول</h2>
                <div className="space-y-4">
                  {biz.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-sm text-foreground mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-6">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Contact info */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4">اطلاعات تماس</h3>
                <div className="space-y-3">
                  {biz.phone && (
                    <a href={`tel:${biz.phone}`} className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">تلفن</p>
                        <p className="font-semibold text-foreground group-hover:text-green-600 transition-colors">{biz.phone}</p>
                      </div>
                    </a>
                  )}
                  {biz.email && (
                    <a href={`mailto:${biz.email}`} className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">ایمیل</p>
                        <p className="font-semibold text-foreground group-hover:text-blue-600 transition-colors truncate">{biz.email}</p>
                      </div>
                    </a>
                  )}
                  {biz.website && (
                    <a href={biz.website} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">وبسایت</p>
                        <p className="font-semibold text-foreground group-hover:text-purple-600 transition-colors truncate">{biz.website.replace('https://', '')}</p>
                      </div>
                    </a>
                  )}
                  {biz.address && (
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">آدرس</p>
                        <p className="text-foreground text-sm leading-5">{biz.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social links */}
                {(biz.instagram || biz.telegram) && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    {biz.instagram && (
                      <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-pink-600 bg-pink-50 dark:bg-pink-950/40 rounded-xl hover:bg-pink-100 transition-colors">
                        <Instagram className="w-3.5 h-3.5" /> اینستاگرام
                      </a>
                    )}
                    {biz.telegram && (
                      <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-950/40 rounded-xl hover:bg-blue-100 transition-colors">
                        <Send className="w-3.5 h-3.5" /> تلگرام
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Working hours */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" /> ساعات کاری
                </h3>
                <div className="space-y-1.5">
                  {biz.working_hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{h.day}</span>
                      <span className={h.closed ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
                        {h.closed ? 'تعطیل' : `${h.open} - ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" /> ارسال پیام
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="نام شما" className="search-input h-11 text-sm" />
                  <input type="tel" placeholder="شماره تماس" className="search-input h-11 text-sm" />
                  <textarea placeholder="پیام شما..." rows={3} className="w-full border border-border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" style={{ fontFamily: "'Vazirmatn',Tahoma,sans-serif" }} />
                  <button className="w-full py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-sm">
                    ارسال پیام
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
