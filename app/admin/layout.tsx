'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { signOut } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();

      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (user) {
        setAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return children;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <nav className="bg-dark-card border-b border-dark-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">管理画面</h1>
            <div className="flex items-center space-x-6">
              <Link
                href="/admin/dashboard"
                className="hover:text-primary transition-colors"
              >
                ダッシュボード
              </Link>
              <Link
                href="/admin/events"
                className="hover:text-primary transition-colors"
              >
                イベント管理
              </Link>
              <Link
                href="/admin/pages"
                className="hover:text-primary transition-colors"
              >
                ページ管理
              </Link>
              <Link
                href="/admin/faq"
                className="hover:text-primary transition-colors"
              >
                FAQ管理
              </Link>
              <Link
                href="/admin/contacts"
                className="hover:text-primary transition-colors"
              >
                お問い合わせ
              </Link>
              <button
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
