'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewFAQ() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'faqs'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/faq');
    } catch (error) {
      console.error('FAQ作成エラー:', error);
      alert('作成に失敗しました');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新規FAQ作成</h1>

      <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
        <div>
          <label htmlFor="order" className="block text-sm font-medium mb-2">
            表示順序 *
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="question" className="block text-sm font-medium mb-2">
            質問 *
          </label>
          <input
            type="text"
            id="question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium mb-2">
            回答 *
          </label>
          <textarea
            id="answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? '作成中...' : '作成'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
