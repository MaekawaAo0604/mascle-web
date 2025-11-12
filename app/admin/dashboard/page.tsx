'use client';

import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    faqs: 0,
    contacts: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsSnap = await getDocs(collection(db, 'events'));
        const faqsSnap = await getDocs(collection(db, 'faqs'));
        const contactsSnap = await getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc')));
        const pagesSnap = await getDocs(collection(db, 'pages'));

        setStats({
          events: eventsSnap.size,
          faqs: faqsSnap.size,
          contacts: contactsSnap.size,
          pages: pagesSnap.size,
        });
      } catch (error) {
        console.error('統計情報の取得に失敗しました:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-gray-400 text-sm mb-2">イベント数</h3>
          <p className="text-3xl font-bold text-primary">{stats.events}</p>
          <Link href="/admin/events" className="text-sm text-gray-400 hover:text-primary mt-2 inline-block">
            管理画面へ →
          </Link>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-gray-400 text-sm mb-2">FAQ数</h3>
          <p className="text-3xl font-bold text-primary">{stats.faqs}</p>
          <Link href="/admin/faq" className="text-sm text-gray-400 hover:text-primary mt-2 inline-block">
            管理画面へ →
          </Link>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-gray-400 text-sm mb-2">お問い合わせ</h3>
          <p className="text-3xl font-bold text-primary">{stats.contacts}</p>
          <Link href="/admin/contacts" className="text-sm text-gray-400 hover:text-primary mt-2 inline-block">
            管理画面へ →
          </Link>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-gray-400 text-sm mb-2">ページ数</h3>
          <p className="text-3xl font-bold text-primary">{stats.pages}</p>
          <Link href="/admin/pages" className="text-sm text-gray-400 hover:text-primary mt-2 inline-block">
            管理画面へ →
          </Link>
        </div>
      </div>

      <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <h2 className="text-xl font-bold mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/events/new"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            新規イベント作成
          </Link>
          <Link
            href="/admin/pages/new"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            新規ページ作成
          </Link>
          <Link
            href="/admin/faq/new"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            新規FAQ作成
          </Link>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            サイトを表示
          </Link>
        </div>
      </div>
    </div>
  );
}
