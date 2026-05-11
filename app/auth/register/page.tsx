'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, BadgeCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند');
      return;
    }
    if (formData.password.length < 8) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.fullName, phone: formData.phone },
      },
    });

    if (error) {
      setError(error.message === 'User already registered' ? 'این ایمیل قبلاً ثبت شده است' : error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">ثبت‌نام موفق!</h2>
          <p className="text-muted-foreground mb-6">
            لینک تأیید به ایمیل شما ارسال شد. لطفاً ایمیل‌تان را چک کنید.
          </p>
          <Link href="/auth/login" className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors">
            رفتن به صفحه ورود
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black">و</div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">ویکی<span className="text-blue-600">بهترین</span></span>
          </Link>
          <h1 className="text-2xl font-black text-foreground">ایجاد حساب کاربری</h1>
          <p className="text-muted-foreground text-sm mt-1">رایگان ثبت‌نام کنید</p>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border shadow-sm p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">نام و نام‌خانوادگی</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                  placeholder="علی رضایی" required
                  className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="example@email.com" required
                  className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif', direction: 'ltr', textAlign: 'right' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">شماره موبایل <span className="text-muted-foreground">(اختیاری)</span></label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  placeholder="09121234567"
                  className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif', direction: 'ltr', textAlign: 'right' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="password" type={showPass ? 'text' : 'password'} value={formData.password} onChange={handleChange}
                  placeholder="حداقل ۸ کاراکتر" required
                  className="w-full h-11 border border-border rounded-xl pr-10 pl-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">تکرار رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                  placeholder="تکرار رمز عبور" required
                  className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Vazirmatn,Tahoma,sans-serif' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full h-11 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              ثبت‌نام رایگان
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              حساب دارید؟{' '}
              <Link href="/auth/login" className="text-blue-700 font-semibold hover:underline">وارد شوید</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          با ثبت‌نام، <Link href="/terms" className="hover:underline">شرایط استفاده</Link> را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
