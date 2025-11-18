'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function EventDetail() {
  const params = useParams();
  const id = params.id as string;

  // Mr.筋肉2025の詳細情報
  if (id === 'mr-muscle-2025') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          {/* Hero Section with Image */}
          <section className="relative h-[60vh] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/IMG_2397.jpeg"
                alt="Mr.筋肉 クラブボディビルコンテスト 2025"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg"></div>
            </div>
            <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
                  Mr.筋肉 クラブボディビルコンテスト 2025
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-6">
                  世界初!フィジーク&ボディビル×ナイトクラブ
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>2025年11月23日(日) 17:30〜21:30</span>
                  </div>
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>T2 SHINJUKU</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* イベント概要 */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">イベント概要</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Mr.筋肉クラブボディビルコンテストは、世界初となるフィジーク&ボディビルとナイトクラブが融合した革新的なイベントです。
                  従来のボディビル大会の枠を超え、クラブミュージックと照明演出の中で繰り広げられる、これまでにないエンターテインメント性の高い大会です。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  今年は東京六大学の学生を中心に合同開催し、若い世代のボディビル文化の発展と、新しい形のスポーツエンターテインメントの創造を目指します。
                </p>
              </div>

              {/* 開催情報 */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">開催情報</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-1">開催日時</h3>
                        <p className="text-gray-300">2025年11月23日(日)</p>
                        <p className="text-gray-300">17:30 開場 / 18:00 開始</p>
                        <p className="text-gray-300">21:30 終了予定</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-1">会場</h3>
                        <p className="text-gray-300">T2 SHINJUKU</p>
                        <p className="text-gray-400 text-sm">東京都新宿区</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-1">賞金総額</h3>
                        <p className="text-gray-300 text-2xl font-bold text-primary">300,000円</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-1">参加対象</h3>
                        <p className="text-gray-300">東京六大学の学生を中心に</p>
                        <p className="text-gray-300">一般参加も可能</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 大会の特徴 */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">大会の特徴</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🪩',
                      title: '世界初の融合イベント',
                      desc: 'フィジーク&ボディビルとナイトクラブが融合した、これまでにない革新的なイベント形式'
                    },
                    {
                      icon: '🎵',
                      title: 'クラブミュージック×照明演出',
                      desc: '豪華な音響と照明で、観客も一体となって楽しめるエンターテインメント空間'
                    },
                    {
                      icon: '🏆',
                      title: '本格的なコンペティション',
                      desc: '賞金総額30万円。真剣勝負の中にもエンターテインメント性を追求'
                    },
                    {
                      icon: '🎓',
                      title: '六大学合同開催',
                      desc: '東京六大学の学生を中心に、若い世代のボディビル文化を盛り上げる'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* タイムスケジュール */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">タイムスケジュール</h2>
                <div className="space-y-4">
                  {[
                    { time: '17:30', event: '開場' },
                    { time: '19:00', event: '開演' },
                    { time: '21:30', event: '終了' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <div className="text-primary font-bold text-2xl min-w-[100px]">{item.time}</div>
                      <div className="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                      <div className="text-gray-300 text-lg">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 出場カテゴリー */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">出場カテゴリー</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-3 text-primary">フィジークノービス</h3>
                    <p className="text-gray-400">初心者向けフィジーク部門</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-3 text-primary">フィジークオープン</h3>
                    <p className="text-gray-400">経験者向けフィジーク部門</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-3 text-primary">ボディビル</h3>
                    <p className="text-gray-400">本格ボディビル部門</p>
                  </div>
                </div>
              </div>

              {/* チケット購入 */}
              <div className="glass p-8 rounded-2xl text-center">
                <h2 className="text-3xl font-bold mb-4 gradient-text">チケット購入・出場エントリー</h2>
                <p className="text-gray-300 mb-8">
                  観客チケットから出場者エントリーまで、LivePocketのイベントページより受け付けております
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://livepocket.jp/e/z804d?utm_campaign=1000214&utm_content=evt&utm_medium=social&utm_source=COPY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 glow-hover text-lg"
                  >
                    チケット購入はこちら →
                  </a>
                  <a
                    href="https://www.instagram.com/mr.muscle2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 glass hover:bg-white/10 border border-white/20 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>

              {/* Back to Events */}
              <div className="text-center">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  イベント一覧に戻る
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // その他のイベントID（将来の拡張用）
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">イベントが見つかりません</h1>
          <Link href="/events" className="text-primary hover:underline">
            イベント一覧に戻る
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
