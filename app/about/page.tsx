import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">大会について</h1>

        <div className="max-w-3xl mx-auto space-y-8">
          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">大会概要</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Mr.筋肉クラブボディビルコンテストは、世界初となるフィジーク&ボディビルとナイトクラブが融合した革新的なイベントです。
              従来のボディビル大会の枠を超え、クラブミュージックと照明演出の中で繰り広げられる、
              これまでにないエンターテインメント性の高い大会を目指しています。
            </p>
            <p className="text-gray-300 leading-relaxed">
              今年は東京六大学の学生を中心に合同開催し、若い世代のボディビル文化の発展と、
              新しい形のスポーツエンターテインメントの創造を目指します。
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text">開催情報</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="font-bold text-white">開催日時：</span>
                  <span>2025年11月23日(日) 17:30〜21:30</span>
                </div>
              </div>
              <div className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="font-bold text-white">会場：</span>
                  <span>T2 SHINJUKU（東京・新宿）</span>
                </div>
              </div>
              <div className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-bold text-white">賞金総額：</span>
                  <span>300,000円</span>
                </div>
              </div>
            </div>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text">大会の特徴</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>世界初のフィジーク&ボディビル×ナイトクラブの融合イベント</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>東京六大学の学生を中心とした合同開催</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>豪華照明と音響によるエンターテインメント性の高い演出</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>賞金総額30万円の本格的なコンペティション</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>観客も一体となって楽しめるナイトクラブスタイル</span>
              </li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">参加方法・チケット購入</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              大会への参加、チケット購入は、LivePocketのイベントページより受け付けております。
              観客チケットから出場者エントリーまで、各種チケットをご用意しています。
            </p>
            <a
              href="https://livepocket.jp/e/z804d?utm_campaign=1000214&utm_content=evt&utm_medium=social&utm_source=COPY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 glow-hover"
            >
              チケット購入・出場エントリー →
            </a>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">お問い合わせ</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              大会に関するご質問やご不明な点がございましたら、
              お気軽にお問い合わせください。
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 glow-hover"
            >
              お問い合わせフォーム →
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
