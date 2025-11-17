'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Event } from '@/lib/types';

// メインイベント情報（固定）
const mainEvent: Event = {
  id: 'mr-muscle-2025',
  title: 'Mr.筋肉 クラブボディビルコンテスト 2025',
  date: '2025-11-23T17:30:00',
  location: 'T2 SHINJUKU（東京・新宿）',
  description: '世界初!フィジーク&ボディビルとナイトクラブが融合した革新的なイベント。東京六大学の学生を中心に合同開催される本格的なコンペティション。賞金総額30万円、豪華照明と音響による最高のエンターテインメント体験をお届けします。',
  imageUrl: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        // メインイベントと取得したイベントを結合
        const allEvents = [mainEvent, ...eventsData].sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setEvents(allEvents);
      } catch (error) {
        console.error('イベント取得エラー:', error);
        // エラーが発生してもメインイベントは表示
        setEvents([mainEvent]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
              イベント情報
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
              全国各地で開催される大会スケジュール
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl text-gray-400 mt-4">読み込み中...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 glass rounded-2xl p-12">
              <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-2xl text-gray-400">
                現在、開催予定のイベントはありません
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="group glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {event.imageUrl && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {event.title}
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">開催日時</p>
                          <p className="text-gray-300">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">会場</p>
                          <p className="text-gray-300">{event.location}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    {event.id === 'mr-muscle-2025' ? (
                      <a
                        href="https://livepocket.jp/e/z804d?utm_campaign=1000214&utm_content=evt&utm_medium=social&utm_source=COPY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 w-full py-3 px-6 bg-primary/20 hover:bg-primary text-white rounded-full transition-all duration-300 font-medium group-hover:glow block text-center"
                      >
                        チケット購入・詳細を見る →
                      </a>
                    ) : (
                      <button className="mt-6 w-full py-3 px-6 bg-primary/20 hover:bg-primary text-white rounded-full transition-all duration-300 font-medium group-hover:glow">
                        詳細を見る
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
