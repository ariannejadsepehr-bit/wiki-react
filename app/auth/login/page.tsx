'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Phone, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = '/dashboard';
    setLoading(false);
  };

  const handlePhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!otpStep) {
      const { error } = await supabase.auth.signInWithOtp({ phone: `+98${phone.replace(/^0/, '')}` });
      if (error) setError(error.message);
      else setOtpStep(true);
    } else {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+98${phone.replace(/^0/, '')}`,
        token: otp,
        type: 'sms',
      });
      if (error) setError(error.message);
      else window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black">
              و
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              ویکی<span className="text-blue-600">بهترین</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-foreground mt-2">ورود به حساب</h1>
          <p className="text-muted-foreground text-sm mt-1">به دایرکتوری کسب‌وکارهای ایران خوش آمدید</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-border shadow-sm p-6">
          {/* Tabs */}
          <div className="flex bg-secondary rounded-xl p-1 mb-5">
            <button
              onClick={() => { setMode('email'); setOtpStep(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'email' ? 'bg-white dark:bg-gray-800 shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Mail className="w-4 h-4" /> ایمیل
            </button>
            <button
              onClick={() => { setMode('phone'); setOtpStep(false); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'phone' ? 'bg-white dark:bg-gray-800 shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Phone className="w-4 h-4" /> شماره موبایل
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm rounded-xl">
              {error === 'Invalid login credentials' ? 'ایمیل یا رمز عبور اشتباه است' : error}
            </div>
          )}

          {mode === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">ایمیل</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required
                    className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    style={{ fontFamily: 'Vazirmatn, Tahoma, sans-serif', direction: 'ltr', textAlign: 'right' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">رمز عبور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور"
                    required
                    className="w-full h-11 border border-border rounded-xl pr-10 pl-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    style={{ fontFamily: 'Vazirmatn, Tahoma, sans-serif' }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  مرا به خاطر بسپار
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-700 hover:underline">
                  فراموشی رمز
                </Link>
              </div>

              <button type="submit" disabled={loading} className="w-full h-11 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                ورود
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneOtp} className="space-y-4">
              {!otpStep ? (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">شماره موبایل</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09121234567"
                      required
                      className="w-full h-11 border border-border rounded-xl pr-10 pl-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      style={{ fontFamily: 'Vazirmatn, Tahoma, sans-serif', direction: 'ltr', textAlign: 'right' }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">کد تأیید به شماره {phone} ارسال شد</p>
                  <label className="block text-sm font-medium text-foreground mb-1.5">کد تأیید</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="کد ۶ رقمی"
                    maxLength={6}
                    required
                    className="w-full h-11 border border-border rounded-xl px-4 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest"
                    style={{ fontFamily: 'Vazirmatn, Tahoma, sans-serif' }}
                  />
                </div>
              )}
              <button type="submit" disabled={loading} className="w-full h-11 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {otpStep ? 'تأیید کد' : 'دریافت کد تأیید'}
              </button>
            </form>
          )}

          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              حساب ندارید؟{' '}
              <Link href="/auth/register" className="text-blue-700 font-semibold hover:underline">
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          با ورود، <Link href="/terms" className="hover:underline">شرایط استفاده</Link> و{' '}
          <Link href="/privacy" className="hover:underline">حریم خصوصی</Link> را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
