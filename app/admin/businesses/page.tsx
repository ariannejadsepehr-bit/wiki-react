import { BadgeCheck, Crown, Eye, Filter, Search, CheckCircle, XCircle, Clock, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const businesses = [
  { id: '1', name: 'موسسه حقوقی دادگستر', category: 'وکیل', city: 'تهران', plan: 'enterprise', status: 'active', verified: true, rating: 4.8, reviews: 234, created: '۱۴۰۳/۰۸/۱۲' },
  { id: '2', name: 'رستوران سنتی کوثر', category: 'رستوران', city: 'تهران', plan: 'premium', status: 'active', verified: true, rating: 4.6, reviews: 312, created: '۱۴۰۳/۰۸/۱۰' },
  { id: '3', name: 'کلینیک زیبایی آرمان', category: 'کلینیک', city: 'تهران', plan: 'premium', status: 'pending', verified: false, rating: 0, reviews: 0, created: '۱۴۰۳/۰۸/۱۹' },
  { id: '4', name: 'آموزشگاه پارسه', category: 'آموزشگاه', city: 'اصفهان', plan: 'basic', status: 'active', verified: false, rating: 4.2, reviews: 45, created: '۱۴۰۳/۰۷/۲۸' },
  { id: '5', name: 'هتل پنج ستاره پارسیان', category: 'هتل', city: 'مشهد', plan: 'enterprise', status: 'active', verified: true, rating: 4.9, reviews: 823, created: '۱۴۰۳/۰۵/۱۴' },
  { id: '6', name: 'دکتر علیرضا محمدی', category: 'پزشک', city: 'تبریز', plan: 'free', status: 'pending', verified: false, rating: 0, reviews: 0, created: '۱۴۰۳/۰۸/۱۸' },
];

const statusBadge: Record<string, { label: string; className: string }> = {
  active: { label: 'فعال', className: 'bg-green-100 text-green-700 dark:bg-green-950/40' },
  pending: { label: 'در انتظار', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40' },
  suspended: { label: 'تعلیق', className: 'bg-red-100 text-red-700 dark:bg-red-950/40' },
  rejected: { label: 'رد شده', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800' },
};

const planBadge: Record<string, string> = {
  free: 'bg-gray-100 text-gray-600 dark:bg-gray-800',
  basic: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40',
  premium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40',
  enterprise: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40',
};

export default function AdminBusinessesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-black text-foreground">مدیریت کسب‌وکارها</h1>
        <Link href="/admin/businesses/new" className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors">
          + افزودن کسب‌وکار
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search" placeholder="جستجوی کسب‌وکار..."
              className="w-full h-10 border border-border rounded-xl pr-9 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
            />
          </div>
          <select className="h-10 border border-border rounded-xl px-3 text-sm bg-background focus:outline-none" style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}>
            <option>همه وضعیت‌ها</option>
            <option>فعال</option>
            <option>در انتظار</option>
            <option>تعلیق</option>
          </select>
          <select className="h-10 border border-border rounded-xl px-3 text-sm bg-background focus:outline-none" style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}>
            <option>همه پلن‌ها</option>
            <option>رایگان</option>
            <option>پایه</option>
            <option>ویژه</option>
          </select>
          <select className="h-10 border border-border rounded-xl px-3 text-sm bg-background focus:outline-none" style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}>
            <option>همه شهرها</option>
            <option>تهران</option>
            <option>مشهد</option>
            <option>اصفهان</option>
          </select>
        </div>

        {/* Status tabs */}
        <div className="flex gap-2 mt-3">
          {[
            { label: 'همه', count: 52481 },
            { label: 'فعال', count: 48210 },
            { label: 'در انتظار', count: 124 },
            { label: 'تعلیق', count: 47 },
          ].map((tab, i) => (
            <button key={tab.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-blue-700 text-white' : 'text-muted-foreground hover:bg-accent'}`}>
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-secondary'}`}>
                {tab.count.toLocaleString('fa-IR')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50 dark:bg-gray-900">
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">کسب‌وکار</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">دسته/شهر</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">پلن</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">وضعیت</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">امتیاز</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">تاریخ</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {businesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                        {biz.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Link href={`/admin/businesses/${biz.id}`} className="text-sm font-semibold text-foreground hover:text-blue-700 transition-colors">
                            {biz.name}
                          </Link>
                          {biz.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <p className="text-sm text-foreground">{biz.category}</p>
                    <p className="text-xs text-muted-foreground">{biz.city}</p>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${planBadge[biz.plan]}`}>
                      {biz.plan === 'enterprise' ? 'سازمانی' : biz.plan === 'premium' ? 'ویژه' : biz.plan === 'basic' ? 'پایه' : 'رایگان'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[biz.status].className}`}>
                      {statusBadge[biz.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden xl:table-cell">
                    {biz.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-sm font-medium">{biz.rating}</span>
                        <span className="text-xs text-muted-foreground">({biz.reviews})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground hidden xl:table-cell">{biz.created}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {biz.status === 'pending' && (
                        <>
                          <button className="w-7 h-7 rounded-lg hover:bg-green-50 text-green-600 flex items-center justify-center transition-colors" title="تأیید">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors" title="رد">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <Link href={`/business/${biz.id}`} target="_blank" className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors" title="مشاهده">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">نمایش ۱ تا ۶ از ۵۲,۴۸۱ کسب‌وکار</p>
          <div className="flex gap-1">
            {[1, 2, 3, '...', '۸۷۵۱'].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-sm transition-colors ${p === 1 ? 'bg-blue-700 text-white' : 'hover:bg-accent text-muted-foreground'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
