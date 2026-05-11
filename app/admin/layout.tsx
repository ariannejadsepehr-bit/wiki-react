'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Building2, Star, FileText, MapPin,
  Tag, CreditCard, BarChart2, Settings, Menu, X, LogOut,
  Bell, AlertTriangle, Search, Globe, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { label: 'داشبورد', href: '/admin', icon: LayoutDashboard },
  {
    label: 'کسب‌وکارها', href: '/admin/businesses', icon: Building2,
    badge: '۱۲ در انتظار'
  },
  { label: 'کاربران', href: '/admin/users', icon: Users },
  { label: 'نظرات', href: '/admin/reviews', icon: Star, badge: '۳ گزارش' },
  { label: 'دسته‌بندی‌ها', href: '/admin/categories', icon: Tag },
  { label: 'شهرها', href: '/admin/cities', icon: MapPin },
  { label: 'صفحات SEO', href: '/admin/seo-pages', icon: Globe },
  { label: 'تراکنش‌ها', href: '/admin/payments', icon: CreditCard },
  { label: 'تحلیل و آمار', href: '/admin/analytics', icon: BarChart2 },
  { label: 'محتوای هوش مصنوعی', href: '/admin/ai-content', icon: Zap },
  { label: 'ریدایرکت‌ها', href: '/admin/redirects', icon: FileText },
  { label: 'تنظیمات', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex" dir="rtl">
      <aside className={cn(
        'fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 dark:bg-gray-950 flex flex-col transition-transform duration-300 text-white',
        'lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm">و</div>
            <div>
              <p className="font-black text-white text-sm">ویکی بهترین</p>
              <p className="text-xs text-gray-400">پنل مدیریت</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin user */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">م</div>
            <div>
              <p className="text-sm font-semibold text-white">مدیر سیستم</p>
              <p className="text-xs text-gray-400">super_admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-0.5">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                      isActive ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white dark:bg-gray-950 border-b border-border flex items-center justify-between px-5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="جستجوی سریع..."
                className="h-9 w-56 bg-secondary rounded-xl pr-9 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent">
              <AlertTriangle className="w-5 h-5" />
            </button>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors">
              مشاهده سایت
            </Link>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
