'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">お問い合わせ</h1>

        <div className="max-w-2xl mx-auto">
          {submitted && (
            <div className="glass border border-green-500 text-green-400 px-6 py-4 rounded-2xl mb-6 animate-scale-in flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>お問い合わせを受け付けました。ご連絡ありがとうございます。</span>
            </div>
          )}

          <div className="glass p-8 rounded-2xl">
            <p className="text-gray-300 mb-8 text-lg">
              大会に関するご質問やご意見がございましたら、
              以下のフォームからお気軽にお問い合わせください。
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  お名前 *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  件名 *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  お問い合わせ内容 *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed glow-hover"
              >
                {loading ? '送信中...' : '送信する →'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
