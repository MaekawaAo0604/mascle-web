import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="gradient-text">大会名</span>
                <br />
                <span className="text-white">公式サイト</span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto animate-slide-up">
                年に一度の最高峰の大会
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link
                  href="/events"
                  className="group relative bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 glow-hover overflow-hidden"
                >
                  <span className="relative z-10">イベント情報</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  href="/about"
                  className="glass hover:bg-white/10 border border-white/20 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  大会について
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400">Scroll</span>
                <svg className="w-6 h-6 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
              大会の特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '最高峰の競技',
                  desc: '各地域のトップ選手が集結する年に一度の大会',
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )
                },
                {
                  title: '全国各地で開催',
                  desc: '複数の地域で開催される大規模イベント',
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  title: 'プロフェッショナル',
                  desc: '経験豊富な審査員による公正な審査',
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              まずはイベント情報をチェック
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              開催スケジュールや詳細情報をご確認ください
            </p>
            <Link
              href="/events"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 glow-hover text-lg"
            >
              イベント情報を見る →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
