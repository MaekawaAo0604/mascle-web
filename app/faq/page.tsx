'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { FAQ } from '@/lib/types';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const faqsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FAQ[];
        setFaqs(faqsData);
      } catch (error) {
        console.error('FAQ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">よくある質問</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">読み込み中...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              現在、登録されているFAQはありません
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-dark-card border border-dark-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-bg transition-colors"
                >
                  <span className="font-bold text-lg pr-4">{faq.question}</span>
                  <span
                    className={`text-primary text-2xl transition-transform ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openId === faq.id && (
                  <div className="px-6 py-4 border-t border-dark-border bg-dark-bg">
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
