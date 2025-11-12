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
            <p className="text-gray-300 leading-relaxed">
              当大会は、年に一度開催される最高峰の競技大会です。
              各地域から選りすぐりの参加者が集まり、その技術と情熱を競い合います。
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text">大会の理念</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>技術の向上と競技の発展</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>フェアプレー精神の推進</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>参加者同士の交流と絆の形成</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>地域コミュニティへの貢献</span>
              </li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">開催地</h2>
            <p className="text-gray-300 leading-relaxed">
              全国各地で開催される地域大会と、それらの優勝者が集う全国大会を実施しています。
              詳しい開催スケジュールは「イベント情報」ページをご確認ください。
            </p>
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
