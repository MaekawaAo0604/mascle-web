'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'events'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/events');
    } catch (error) {
      console.error('イベント作成エラー:', error);
      alert('作成に失敗しました');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新規イベント作成</h1>

      <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            開催日時 *
          </label>
          <input
            type="datetime-local"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            場所 *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            説明 *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
            画像URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
            placeholder="https://example.com/image.jpg"
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
