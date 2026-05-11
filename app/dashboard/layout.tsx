'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, Star, BarChart2, Settings,
  CreditCard, MessageSquare, Image, Menu, X, LogOut, Bell, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const navItems = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  { label: 'کسب‌وکارم', href: '/dashboard/business', icon: Building2 },
  { label: 'نظرات', href: '/dashboard/reviews', icon: Star },
  { label: 'پیام‌ها', href: '/dashboard/messages', icon: MessageSquare },
  { label: 'آمار و تحلیل', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'گالری', href: '/dashboard/gallery', icon: Image },
  { label: 'پرداخت‌ها', href: '/dashboard/billing', icon: CreditCard },
  { label: 'تنظیمات', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-950 border-l border-border flex flex-col transition-transform duration-300',
        'lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm">و</div>
            <span className="font-black text-foreground">ویکی<span className="text-blue-600">بهترین</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">ع</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">علی رضایی</p>
              <p className="text-xs text-muted-foreground truncate">ali@example.com</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive && 'text-blue-600')} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-gray-950 border-b border-border flex items-center justify-between px-5 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mr-auto">
            <button className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <span>بازگشت به سایت</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
