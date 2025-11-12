'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditEvent() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
          const data = eventDoc.data();
          setFormData({
            title: data.title || '',
            description: data.description || '',
            date: data.date || '',
            location: data.location || '',
            imageUrl: data.imageUrl || '',
          });
        }
      } catch (error) {
        console.error('イベント取得エラー:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, 'events', eventId), {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/events');
    } catch (error) {
      console.error('イベント更新エラー:', error);
      alert('更新に失敗しました');
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">イベント編集</h1>

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
            {loading ? '更新中...' : '更新'}
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
